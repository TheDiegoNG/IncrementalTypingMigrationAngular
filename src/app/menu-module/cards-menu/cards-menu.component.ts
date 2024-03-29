import { AfterViewInit, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Card } from 'src/app/classes/card';
import { Pack, PackTier } from 'src/app/classes/pack';
import { CardsService } from 'src/app/services/cards.service';
import { GameService } from 'src/app/services/game.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PackService } from 'src/app/services/pack.service';
import { TimerService } from 'src/app/services/timer.service';
import { GameUtils } from 'src/app/utils/utils';

@Component({
  selector: 'app-cards-menu',
  templateUrl: './cards-menu.component.html',
  styleUrls: ['./cards-menu.component.scss'],
})
export class CardsMenuComponent {
  cards: Card[] = [];
  cardsCost$: Observable<number>;
  cardsDisplayed$: Observable<Card[]>;
  packs: Pack[] = [];

  constructor(
    private cardService: CardsService,
    private gameService: GameService,
    private overlayService: OverlayService,
    private timerService: TimerService,
    private packService: PackService
  ) {
    this.cardsCost$ = this.gameService
      .getGame()
      .pipe(map((game) => game.cardCost));

    this.cards = this.cardService.getCards();
    this.cardsDisplayed$ = this.gameService
      .getGame()
      .pipe(map((game) => game.cards));

    this.packService.getPacks().subscribe((packs) => (this.packs = packs));
  }

  gameUtils = new GameUtils(this.gameService);

  getCardType(card: Card): string {
    return this.gameUtils.getCardType(card);
  }

  getPack(packTier: PackTier) {
    const pack = this.packs.find((x) => x.type === packTier)!;
    if (this.gameService.game.value.points >= pack.cost) {
      this.gameService.updatePoints(-pack.cost);
      var cards = this.cardService.getPack(packTier);
      this.timerService.logGameTimer('Purchased Cards');
      this.gameService.updateCardsCost();
      this.overlayService.appendCards(cards);
    }
  }

  getBonus(): string {
    return this.cardService.getBonus();
  }

  isCardPackUnlocked(pack: Pack) {
    switch (pack.type) {
      case 'Explorer':
        return this.gameUtils.IsPurchasedUpgrade('SecondCardPack');
        break;
      case 'Master':
        return false;
        break;
      case 'Grandmaster':
        return false;
        break;
      case 'Mighty':
        return false;
        break;
      case 'Ethereal':
        return false;
        break;

      default:
        return true;
        break;
    }
  }
}
