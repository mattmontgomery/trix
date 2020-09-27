import { ReactElement } from "react";
import { css } from "emotion";
import Card, { CardNonPlayable } from "./Card";

export default function Hand({
  active,
  eligibleSuits,
  cards,
  onPlayCard,
}: Hand & PlaysCards & HasActive & HasSuitEligibility): ReactElement {
  const hasEligibleCards = cards.some((c) =>
    eligibleSuits.some((s) => s === c.suit)
  );
  return (
    <div
      className={css`
        padding: 2rem;
        border: 1px solid #ddd;
        display: inline-block;
        margin: 0 0.5rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0.5rem;
      `}
    >
      {cards.map((c, idx) =>
        active ? (
          <Card
            eligible={
              hasEligibleCards && eligibleSuits.length
                ? eligibleSuits.some((s) => c.suit === s)
                : true
            }
            card={c}
            onPlayCard={(card) => onPlayCard(card)}
            key={idx}
          />
        ) : (
          <CardNonPlayable card={c} key={idx} />
        )
      )}
    </div>
  );
}
