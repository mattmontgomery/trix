import Card, { CardNonPlayable } from "@/components/Card";
import PlayerName from "@/components/PlayerName";
import TurnMarker from "@/components/TurnMarker";
import { css } from "emotion";
import { useEffect, useState } from "react";
import Hand from "../components/Hand";

import { DECK, NAME, DETERMINE_FIRST_PLAYER, SUITS } from "@/games/the-crew";
import GameHeader from "@/components/GameHeader";
import Button from "@/components/Button";
import GameState from "@/components/GameState";
import { TRUMP_SUIT } from "games/the-crew";
import Themed from "@/components/Themed";
import Conditions from "@/components/Conditions";
import WonPile from "@/components/WonPile";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: any[]): any[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function IndexPage() {
  const [deck, setDeck] = useState<Card[]>(DECK);
  const [players, setPlayers] = useState<Player["name"][]>([
    "matt",
    "ginny",
    "michael",
    "heather",
  ]);
  const [playedCards, setPlayedCards] = useState<PlayedCard[]>([]);
  const [playersCards, setPlayerCards] = useState<PlayersCards>({
    ...players.reduce((prev, curr) => {
      return { ...prev, [curr]: [] };
    }, {}),
  });
  const [activePlayer, setActivePlayer] = useState<Player>(null);
  const [roundLeader, setRoundLeader] = useState<Player>(null);
  const [round, setRound] = useState<number>(null);
  const [leadingSuit, setLeadingSuit] = useState<SUITS>(null);
  const [lastTrickWinner, setLastTrickWinner] = useState<Player>(null);
  const [playersWon, setPlayersWon] = useState<PlayersCards>({
    ...players.reduce((prev, curr) => {
      return { ...prev, [curr]: [] };
    }, {}),
  });
  const [eligibleSuits, setEligibleSuits] = useState<SUITS>(SUITS);
  const [gameConditions, setGameConditions] = useState<string>("");
  useEffect(() => {
    if (round === 0 || round === -1) {
      const cardsPerPlayer = Math.floor(deck.length / players.length);
      const newPlayersCards = {
        ...players.reduce((prev, curr, index) => {
          return {
            ...prev,
            [curr]: deck.slice(
              index * cardsPerPlayer,
              index * cardsPerPlayer + cardsPerPlayer
            ),
          };
        }, {}),
      };
      setPlayerCards(newPlayersCards);
      const firstPlayer = DETERMINE_FIRST_PLAYER(newPlayersCards);
      setRoundLeader({ name: firstPlayer });
      setActivePlayer({ name: firstPlayer });
      setRound(0);
    } else {
      setPlayedCards([]);
    }
    // if round has changed
  }, [round]);
  useEffect(() => {
    if (playedCards.length === players.length) {
      // start a new round
      setRound(round + 1);
      setRoundLeader(null);
      setLeadingSuit(null);

      // distribute cards from previous round
      const hasTrumpSuit = playedCards.some((card) => card.suit === TRUMP_SUIT);
      const winningCards = playedCards
        .filter((card) =>
          hasTrumpSuit ? card.suit === TRUMP_SUIT : card.suit === leadingSuit
        )
        .sort((cardA, cardB) => {
          return cardA.value - cardB.value;
        })
        .reverse();
      const trickWinner = winningCards[0] ? winningCards[0].playedBy : null;
      setLastTrickWinner(trickWinner);
      setRoundLeader(trickWinner);
      setActivePlayer(trickWinner);
      setPlayersWon({
        ...playersWon,
        [trickWinner.name]: [...playersWon[trickWinner.name], ...playedCards],
      });
      return;
    } else if (playedCards.length === 1) {
      setLeadingSuit(playedCards[0].suit);
      setLastTrickWinner(null);
    }
    if (playedCards.length > 0) {
      const PICK_NEXT_PLAYER = "PICK_NEXT";
      const nextPlayer = players.reduce((prev, curr) => {
        if (curr === activePlayer.name) {
          return PICK_NEXT_PLAYER;
        }
        if (prev === PICK_NEXT_PLAYER) {
          return curr;
        }
        return prev;
      }, null);
      setActivePlayer(
        nextPlayer === PICK_NEXT_PLAYER
          ? { name: players[0] }
          : { name: nextPlayer }
      );
    }
  }, [playedCards]);
  useEffect(() => {
    if (leadingSuit) {
      setEligibleSuits([leadingSuit, TRUMP_SUIT]);
    } else {
      setEligibleSuits([]);
    }
  }, [leadingSuit]);
  return (
    <Themed>
      <div
        className={css`
          font-family: "Helvetica Neue";
        `}
      >
        <GameHeader name={NAME}>
          <Button
            onClick={() => {
              setDeck(shuffle([...deck]));
              setRound(-1);
              setPlayedCards([]);
            }}
          >
            Shuffle &amp; Deal
          </Button>
          <label>Round: {round}</label>
          <TurnMarker activePlayer={activePlayer} leader={roundLeader} />
        </GameHeader>
        <GameState>
          <div>
            <strong>Leading Suit</strong>:{" "}
            {leadingSuit ? leadingSuit : "no card played"}
          </div>
          {lastTrickWinner && (
            <div>
              <strong>Trick won by </strong> {lastTrickWinner.name}
            </div>
          )}
          <div
            className={css`
              display: grid;
              grid-template-columns: repeat(4, auto);
              grid-gap: 0.5rem;
            `}
          >
            {players.map((p) => (
              <PlayerName
                active={activePlayer?.name === p}
                key={p}
                name={p}
                onClick={() => {
                  setActivePlayer({ name: p });
                  setRoundLeader({ name: p });
                }}
              />
            ))}
          </div>
        </GameState>
        <GameState>{gameConditions}</GameState>
        {players.map((p, idx) => (
          <div key={idx}>
            <h3>{p}</h3>
            <WonPile cards={playersWon[p]} />
            <Hand
              active={activePlayer ? p === activePlayer.name : false}
              eligibleSuits={eligibleSuits}
              cards={playersCards[p] || []}
              onPlayCard={(c) => {
                setPlayerCards({
                  ...playersCards,
                  [p]: playersCards[p].filter((pC) => pC.card !== c.card),
                });
                setPlayedCards([
                  ...playedCards,
                  { ...c, playedBy: activePlayer },
                ]);
              }}
            />
          </div>
        ))}
        <div
          className={css`
            padding: 2rem;
            background: var(--color-table);
            margin: 2rem;
          `}
        >
          {playedCards.map((c, idx) => (
            <CardNonPlayable card={c} key={idx} />
          ))}
        </div>
        <Conditions text={gameConditions} onChange={setGameConditions} />
      </div>
    </Themed>
  );
}
