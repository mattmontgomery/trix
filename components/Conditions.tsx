import { css } from "emotion";
import { useRef } from "react";
import Button from "./Button";

export default function Conditions({
  text = "",
  onChange,
}: {
  text: string;
  onChange: (text: string) => void;
}) {
  const content = useRef(null);
  return (
    <div>
      <h3>Round conditions</h3>
      <div
        contentEditable
        className={css`
          font-family: monospace;
          background-color: black;
          padding: 1rem;
          margin: 1rem;
          color: white;
          white-space: pre;
          max-width: 100%;
          overflow: auto;
        `}
        onChange={console.log}
        ref={content}
      ></div>
      <Button onClick={() => onChange(content?.current.innerText)}>
        {"commit"}
      </Button>
    </div>
  );
}
