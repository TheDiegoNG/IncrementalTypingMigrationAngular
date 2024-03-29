import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { WordsService } from 'src/app/services/words.service';
import { HttpClient } from '@angular/common/http';
import { ChallengesService, language } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-words-to-guess',
  templateUrl: './words-to-guess.component.html',
  styleUrls: ['./words-to-guess.component.scss'],
})
export class WordsToGuessComponent implements OnInit, AfterViewInit {
  @ViewChild('WordToGuess', { static: true }) wordToGuessElement!: ElementRef;
  private wordListUrl: string =
    'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';
  wordLeft: string = '';
  wordLeft2: string = '';
  wordToGuess: string = '';
  wordRight: string = '';
  wordRight2: string = '';
  private critical: boolean = false;
  language: language = "English";

  constructor(
    private wordService: WordsService,
    private http: HttpClient,
    private renderer: Renderer2,
    private challengeService: ChallengesService
  ) {
    this.http
      .get(this.wordListUrl, { responseType: 'text' })
      .subscribe((response) => {
        const wordList = response.split('\n');
        this.wordService.wordList = wordList;
        this.setWords();
      });

    this.wordService.getCritical().subscribe((value) => {
      this.critical = value;
    });

    this.challengeService.getLanguage().subscribe(language => {
      this.language = language
      this.shiftWords();
      this.shiftWords();
      this.shiftWords();
    } )

  }

  ngOnInit(): void {
    this.wordService.wordShifted.subscribe(() => {
      this.shiftWords();
    });

    this.wordService.getCurrentWord().subscribe((word) => {
      this.wordToGuess = word;
    });
  }

  ngAfterViewInit(): void {
    this.wordService.getCritical().subscribe((value) => {
      if (this.critical) {
        const nativeElement = this.wordToGuessElement.nativeElement;
        this.renderer.setStyle(nativeElement, 'text-shadow', '0 0 0.1em red');
        this.renderer.setStyle(nativeElement, 'color', 'red');
      } else {
        const nativeElement = this.wordToGuessElement.nativeElement;
        this.renderer.setStyle(
          nativeElement,
          'text-shadow',
          '0 0 0.25em white'
        );
        this.renderer.setStyle(
          nativeElement,
          'color',
          'white'
        );
      }
    });
  }

  setWords() {
    this.wordLeft = this.wordService.generateWord();
    this.wordLeft2 = this.wordService.generateWord();
    this.wordService.setCurrentWord(this.wordService.generateWord());
    this.wordRight = this.wordService.generateWord();
    this.wordRight2 = this.wordService.generateWord();
  }

  shiftWords() {
    this.wordLeft = this.wordLeft2;
    this.wordLeft2 = this.wordToGuess;
    this.wordService.setCurrentWord(this.wordRight);
    this.wordRight = this.wordRight2;
    this.wordRight2 = this.wordService.generateWord();
  }

  getWordBonus(): string {
    return this.wordService.getWordBonus();
  }

  countWordsByFirstLetter(wordList: string[]): Map<string, number> {
    const letterCountMap = new Map<string, number>();

    // Iterate through each word and count the words for each first letter
    for (const word of wordList) {
      if (word.length > 0) {
        const firstLetter = word[0].toLowerCase();
        const currentCount = letterCountMap.get(firstLetter) || 0;
        letterCountMap.set(firstLetter, currentCount + 1);
      }
    }
    return letterCountMap;
  }
}
