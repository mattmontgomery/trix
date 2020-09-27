import { css } from "emotion";

export default function Themed({ children }) {
  return (
    <div
      className={css`
        --active: #aa9;
        --color-table: #aad;
        --color-transition: color 0.1s;
        --color-eligible: #ddf;
        --color-grey: #e0e0e0;
      `}
    >
      {children}
    </div>
  );
}
