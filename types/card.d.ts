declare type Card = {
  card: string;
  suit?: string;
  value?: any;
};

declare type PlaysCards = {
  onPlayCard: (card: Card) => void;
};

declare type PlayableCard = {
  eligible: boolean;
  onPlayCard: (card: Card) => void;
};

declare type PlayedCard = {
  playedBy: Player;
} & Card;
