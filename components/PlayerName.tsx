import { css } from "emotion";
import { ReactEventHandler } from "react";

export default function PlayerName({
  active,
  name,
  onClick,
}: {
  active: boolean;
  name: Player["name"];
  onClick: ReactEventHandler;
}) {
  return (
    <span
      onClick={onClick}
      className={css`
        cursor: pointer;
        transition: var(--color-transition);
        &:hover {
          color: var(--active);
        }
        font-weight: ${active ? "bold" : "normal"};
      `}
    >
      {name}
    </span>
  );
}
