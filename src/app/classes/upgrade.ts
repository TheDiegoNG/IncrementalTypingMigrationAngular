export class Upgrade {
  name: string;
  description: string;
  amountBought: number = 0;
  cost: number;
  id: eIdUpgrade;

  constructor(
    upgradeName: string,
    upgradeDesc: string,
    upgradeCost: number,
    upgradeId: eIdUpgrade
  ) {
    this.name = upgradeName;
    this.description = upgradeDesc;
    this.cost = upgradeCost;
    this.id = upgradeId;
  }
}

export type eIdUpgrade =
  | 'FirstUpgradePoints'
  | 'WordsValueBitMore'
  | 'ImSpeed'
  | 'WordPassiveEnhancer'
  | 'SecondUpgradePoints'
  | 'EveryGoalReward'
  | 'WordsValueBitMoreMore'
  | 'ScrabbleModule'
  | 'Gacha'
  | 'WordLengthMultiOne'
  | 'ChallengeYourself'
  | 'LastBasic'
  | 'UnlockModules'
  | 'SameLetterBonus'
  | 'IntermediateBasicsOne'
  | 'WordLengthBonus'
  | 'DifferentLetterBonus'
  | 'IntermediateBasicsTwo'
  | 'CardsAmountBonus'
  | 'UnlockMastery'
  | 'TaxEvasion'
  | 'PrecisionKey'
  | 'QualityCardsBonus'
  | 'UnlockMarket'
  | 'SecondCardPack'
  | 'MergeModule'
  | 'BullMarket'
  | 'UnlockMinigames'
	| 'PassiveEnhancerEnhancerer'
	| 'PassiveLittleBonus'
	| 'PassiveDontKnow'
	| 'PassiveScrabbleModule'
	| 'PassiveHorizontalScaling'
	| 'PassiveMoreModules'
	| 'PassiveMarket'
	| 'PrestigeFreeMultiplier'
	| 'PrestigeGachaGods'
	| 'PrestigeBetterScaling'
	| 'PrestigeBringEnhancer'
	| 'MultiUpgradePoints'
	| 'MultiUpgradeWords'
	| 'MultiUpgradePointsMult';
