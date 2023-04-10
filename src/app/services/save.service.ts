import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { environment } from 'src/environments/environment';
import { GameUtils } from '../utils/utils';
import { Game } from '../classes/game';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  private readonly algorithm = 'AES-GCM';
  private readonly key = environment.saveKey;
  private readonly iv = environment.saveIv;

  constructor(private gameService: GameService) {}

  gameUtils = new GameUtils(this.gameService);

  async saveGame() {
    const json = JSON.stringify(this.gameService.game.value);
    const encoded = await this.encode(json);
    this.downloadFile(encoded);
  }

  async loadGame(game: string) {
    const gameData = JSON.parse(game) as Game;
    this.gameService.loadGame(gameData);
  }

  private async encode(str: string): Promise<string> {
    const key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(environment.saveKey),
      this.algorithm,
      false,
      ['encrypt']
    );
    const iv = new TextEncoder().encode(environment.saveIv);
    const encoded = await window.crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      new TextEncoder().encode(str)
    );
    const encodedArray = Array.from(new Uint8Array(encoded));
    return encodedArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }

  async decode(encodedStr: string): Promise<string> {
    const key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(environment.saveKey),
      this.algorithm,
      false,
      ['decrypt']
    );
    const iv = new TextEncoder().encode(environment.saveIv);
    const encodedArray = new Uint8Array(encodedStr.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const decoded = await window.crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      encodedArray
    );
    return new TextDecoder().decode(decoded);
  }
  private downloadFile(encodedString: string) {
    const blob = new Blob([encodedString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `IncrementalTyping-${Date.now()}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }
}
