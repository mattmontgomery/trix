import { css } from "emotion";
import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (any) => unknown;
}) {
  return (
    <button
      onClick={onClick}
      className={css`
        cursor: pointer;
      `}
    >
      {children}
    </button>
  );
}
