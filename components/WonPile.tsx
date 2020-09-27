import { css } from "emotion";

export default function WonPile({ cards }: { cards: Card[] }) {
  return (
    <div
      className={css`
        font-size: 10pt;
        background: var(--color-grey);
        padding: 1rem;
        margin: 1rem 0.5rem;
      `}
    >
      {"Won: "}
      {cards.map((c) => `${c.suit} ${c.value}`).join(", ")}
    </div>
  );
}
