import { ReactElement } from "react";

import { css } from "emotion";

export default function TurnMarker({
  leader,
  activePlayer,
}: {
  leader: Player;
  activePlayer: Player;
}): ReactElement {
  return (
    <div className={css``}>
      <>Leader: {leader ? leader.name : "no leader"},</>
      <> </>
      <>Active: {activePlayer ? activePlayer.name : "no player"}</>
    </div>
  );
}
