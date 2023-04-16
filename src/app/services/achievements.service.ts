import { Injectable, OnDestroy } from '@angular/core';
import { Achievement, ExternalProperty } from '../classes/achievement';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { MessageService } from 'primeng/api';
import { Game } from '../classes/game';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService implements OnDestroy {
  private achievements: Achievement[] = [];
  private intervalId;

  constructor(
    private gameService: GameService,
    private messageService: MessageService
  ) {
    this.createAchievement(
      new Achievement(
        'First Word',
        'Write your first word. Congratulations! You know how to write!',
        1,
        1,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Ten Words',
        'Write 10 words. Pay attention, it seems that you are close to your first upgrade.',
        2,
        10,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement('Fifty Words', 'Write 50 words.', 3, 50, 'wordsAmount')
    );
    this.createAchievement(
      new Achievement(
        'One Hundred Words',
        'Write 100 words.',
        4,
        100,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement('250 Words', 'Write 250 words.', 5, 250, 'wordsAmount')
    );
    this.createAchievement(
      new Achievement('500 Words', 'Write 500 words.', 6, 500, 'wordsAmount')
    );
    this.createAchievement(
      new Achievement('1000 Words', 'Write 1000 words.', 7, 1000, 'wordsAmount')
    );
    this.createAchievement(
      new Achievement('100 Points', 'Save 100 points', 8, 100, 'points')
    );
    this.createAchievement(
      new Achievement('500 Points', 'Save 500 points', 9, 500, 'points')
    );
    this.createAchievement(
      new Achievement('1000 Points', 'Save 1000 points', 10, 1000, 'points')
    );
    this.createAchievement(
      new Achievement('5000 Points', 'Save 5000 points', 11, 5000, 'points')
    );
    this.createAchievement(
      new Achievement('10000 Points', 'Save 10000 points', 12, 10000, 'points')
    );
    this.createAchievement(
      new Achievement('50000 Points', 'Save 50000 points', 13, 50000, 'points')
    );
    this.createAchievement(
      new Achievement(
        '100000 Points',
        'Save 100000 points',
        14,
        100000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        '200000 Points',
        'Save 200000 points',
        15,
        200000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        '10000 Passive Points',
        'Reach 10000 Passive Points',
        16,
        10000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '200000 Passive Points',
        'Reach 200000 Passive Points',
        17,
        200000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '5000000 Passive Points',
        'Reach 5000000 Passive Points',
        18,
        5000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '100000000 Passive Points',
        'Reach 100000000 Passive Points',
        19,
        100000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '10 Cards',
        'You bought your first pack!',
        20,
        10,
        'cardsAmount'
      )
    );
    this.createAchievement(
      new Achievement('50 Cards', 'Have 50 Cards', 21, 50, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement('100 Cards', 'Have 100 Cards', 22, 100, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement(
        '1 Challenge',
        'Complete your first challenge',
        23,
        1,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        '5 Challenges',
        'Complete 5 challenges',
        24,
        5,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Reach Prestige!',
        'Prestige for the first time',
        25,
        1,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        '100 Prestige Points',
        'Have 100 Prestige Points',
        26,
        100,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '250 Prestige Points',
        'Have 250 Prestige Points',
        27,
        250,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '500 Prestige Points',
        'Have 500 Prestige Points',
        28,
        500,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '10-letter Word',
        'Write a 10-letter word',
        29,
        1,
        ExternalProperty.Other
      )
    );
    this.createAchievement(
      new Achievement(
        'Best Word',
        'Write the best word possible',
        30,
        1,
        ExternalProperty.Other
      )
    );

    this.intervalId = setInterval(() => {
      this.checkAchievements();
    }, 100);
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  createAchievement(achievement: Achievement) {
    this.achievements.push(achievement);
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  unlockAchievement(achievementName: string) {
    this.gameService.addAchievement(
      this.achievements.find((x) => x.name == achievementName)!
    );
  }

  compareProgress(achievement: Achievement) {
    const target =
      this.gameService.game.value[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return;
    }

    if (target >= achievement.target) {
      this.unlockAchievement(achievement.name);
      this.showAchievement(achievement.name);
    }
  }

  getAchievementProgress(achievement: Achievement): number {
    const target =
    this.gameService.game.value[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return 0;
    }
    const progress = target * 100 / achievement.target;
    return progress <= 100 ? progress : 100;
  }

  checkAchievements() {
    this.achievements.forEach((achievement) => {
      if (this.gameUtils.IsUnlockedAchievement(achievement.name)) {
        return;
      }
      this.compareProgress(achievement);
    });
  }

  showAchievement(achievementName: string) {
    this.messageService.add({
      severity: 'info',
      summary: `New Achievement! ${achievementName}`,
      life: 3000,
      contentStyleClass: 'my-toast',
    });
  }
}