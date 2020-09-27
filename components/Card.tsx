import { ReactElement } from "react";
import { css } from "emotion";

export default function Card({
  card,
  onPlayCard,
  eligible = true,
}: { card: Card } & PlayableCard): ReactElement {
  return (
    <div
      className={css(
        cardStyles,
        eligible ? `cursor: pointer; pointer-events: all;` : null,
        eligible ? `background-color: var(--color-eligible); ` : null
      )}
      onClick={() => onPlayCard(card)}
    >
      {card.card}
    </div>
  );
}

export function CardNonPlayable({
  card,
}: {
  card: Card & PlayedCard;
}): ReactElement {
  return (
    <div className={css(cardStyles)}>
      {card.card} {card.playedBy && `[${card.playedBy.name}]`}
    </div>
  );
}

const cardStyles = `
padding: 1rem;
border: 1px solid #ddd;
display: inline-block;
cursor: "not-allowed";
pointer-events: none;
`;
