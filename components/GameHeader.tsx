import { ReactElement, ReactNode } from "react";

import { css } from "emotion";

export default function GameHeader({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div
      className={css`
        background: #333;
        color: white;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>{name}</div>
      {children}
    </div>
  );
}
