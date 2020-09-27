declare type Player = {
  name: string;
};

declare type PlayersCards = {
  [player: Player[name]]: Card[];
};
