import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeTimerComponent } from './challenge-timer/challenge-timer.component';
import { WordboxComponent } from './wordbox/wordbox.component';
import { WordsToGuessComponent } from './words-to-guess/words-to-guess.component';
import { PointsCounterComponent } from './points-counter/points-counter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChallengeTimerComponent,
    WordboxComponent,
    WordsToGuessComponent,
    PointsCounterComponent
  ],
  imports: [CommonModule, FormsModule, HttpClientModule, SharedModule],
  exports: [
    ChallengeTimerComponent,
    WordboxComponent,
    WordsToGuessComponent,
    PointsCounterComponent
  ],
})
export class HeaderModuleModule {}
