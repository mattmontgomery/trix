export enum SUITS {
  Green = "GREEN",
  Blue = "BLUE",
  Yellow = "YELLOW",
  Pink = "PINK",
  Rocket = "ROCKET",
}

export const TRUMP_SUIT = SUITS.Rocket;

export const DECK: (Card & SuitedCard & ValuedCard)[] = [
  { card: "ROCKET_1", suit: SUITS.Rocket, value: 1 },
  { card: "ROCKET_2", suit: SUITS.Rocket, value: 2 },
  { card: "ROCKET_3", suit: SUITS.Rocket, value: 3 },
  { card: "ROCKET_4", suit: SUITS.Rocket, value: 4 },
  { card: "BLUE_1", suit: SUITS.Blue, value: 1 },
  { card: "BLUE_2", suit: SUITS.Blue, value: 2 },
  { card: "BLUE_3", suit: SUITS.Blue, value: 3 },
  { card: "BLUE_4", suit: SUITS.Blue, value: 4 },
  { card: "BLUE_5", suit: SUITS.Blue, value: 5 },
  { card: "BLUE_6", suit: SUITS.Blue, value: 6 },
  { card: "BLUE_7", suit: SUITS.Blue, value: 7 },
  { card: "BLUE_8", suit: SUITS.Blue, value: 8 },
  { card: "BLUE_9", suit: SUITS.Blue, value: 9 },
  { card: "GREEN_1", suit: SUITS.Green, value: 1 },
  { card: "GREEN_2", suit: SUITS.Green, value: 2 },
  { card: "GREEN_3", suit: SUITS.Green, value: 3 },
  { card: "GREEN_4", suit: SUITS.Green, value: 4 },
  { card: "GREEN_5", suit: SUITS.Green, value: 5 },
  { card: "GREEN_6", suit: SUITS.Green, value: 6 },
  { card: "GREEN_7", suit: SUITS.Green, value: 7 },
  { card: "GREEN_8", suit: SUITS.Green, value: 8 },
  { card: "GREEN_9", suit: SUITS.Green, value: 9 },
  { card: "YELLOW_1", suit: SUITS.Yellow, value: 1 },
  { card: "YELLOW_2", suit: SUITS.Yellow, value: 2 },
  { card: "YELLOW_3", suit: SUITS.Yellow, value: 3 },
  { card: "YELLOW_4", suit: SUITS.Yellow, value: 4 },
  { card: "YELLOW_5", suit: SUITS.Yellow, value: 5 },
  { card: "YELLOW_6", suit: SUITS.Yellow, value: 6 },
  { card: "YELLOW_7", suit: SUITS.Yellow, value: 7 },
  { card: "YELLOW_8", suit: SUITS.Yellow, value: 8 },
  { card: "YELLOW_9", suit: SUITS.Yellow, value: 9 },
  { card: "PINK_1", suit: SUITS.Pink, value: 1 },
  { card: "PINK_2", suit: SUITS.Pink, value: 2 },
  { card: "PINK_3", suit: SUITS.Pink, value: 3 },
  { card: "PINK_4", suit: SUITS.Pink, value: 4 },
  { card: "PINK_5", suit: SUITS.Pink, value: 5 },
  { card: "PINK_6", suit: SUITS.Pink, value: 6 },
  { card: "PINK_7", suit: SUITS.Pink, value: 7 },
  { card: "PINK_8", suit: SUITS.Pink, value: 8 },
  { card: "PINK_9", suit: SUITS.Pink, value: 9 },
];

export const NAME: string = "The Crew";

export const STARTING_CARD = "ROCKET_4";

export const DETERMINE_FIRST_PLAYER = (
  playersCards: PlayersCards
): Player["name"] => {
  const result = Object.entries(playersCards).find(
    ([_, value]: [string, Card[]]) => {
      return value.some((c) => c.card === STARTING_CARD);
    }
  );
  return result[0];
};

type SuitedCard = {
  suit: SUITS;
};

type ValuedCard = {
  value: number;
};
