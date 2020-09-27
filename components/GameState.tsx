import { ReactElement, ReactNode } from "react";

import { css } from "emotion";

export default function GameState({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <div
      className={css`
        padding: 1rem;
        display: flex;
        justify-content: space-between;
      `}
    >
      {children}
    </div>
  );
}
