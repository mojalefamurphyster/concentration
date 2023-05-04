import "./styles.css";
import MemoryCard from "./MemoryCard.js";
import { ICONS } from "./consts.js";
import { useEffect, useState, useReducer } from "react";

const NUMBER_CARDS = 8;
const TIMEOUT_MS = 500;

const shuffleCards = (numCards) => {
  const initialCards = [];
  for (let i = 0; i < numCards / 2; i += 1) {
    initialCards.push({ icon: ICONS[i], visibility: "hidden" });
    initialCards.push({ icon: ICONS[i], visibility: "hidden" });
  }
  /* Randomize array in-place using Durstenfeld shuffle algorithm (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) */
  for (var i = initialCards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = initialCards[i];
    initialCards[i] = initialCards[j];
    initialCards[j] = temp;
  }
  return initialCards;
};

export default function Concentration() {
  const [gameWon, setGameWon] = useState(false);

  const cardsReducer = (cards, action) => {
    const toUpdatedCards = (visibility) => {
      const card = cards[action.index];
      return cards.toSpliced(action.index, 1, {
        ...card,
        visibility
      });
    };

    switch (action.type) {
      case "showCard":
        return toUpdatedCards("revealed");
      case "hideCard":
        return toUpdatedCards("hidden");
      case "removeCard":
        return toUpdatedCards("removed");
      default:
        return cards;
    }
  };

  const [cards, dispatch] = useReducer(
    cardsReducer,
    shuffleCards(NUMBER_CARDS)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      cards.forEach((card1, index1) =>
        cards.forEach((card2, index2) => {
          if (
            card1.visibility === "revealed" &&
            card2.visibility === "revealed" &&
            index1 !== index2
          ) {
            if (card1.icon === card2.icon) {
              dispatch({ type: "removeCard", index: index1 });
              dispatch({ type: "removeCard", index: index2 });
            } else {
              dispatch({ type: "hideCard", index: index1 });
              dispatch({ type: "hideCard", index: index2 });
            }
          }
        })
      );
    }, TIMEOUT_MS);

    if (cards.every((card) => card.visibility === "removed")) {
      setGameWon(true);
    }

    return () => clearTimeout(timeout);
  }, [cards]);

  const cardsRevealed = cards.filter((card) => card.visibility === "revealed");

  return (
    <div className="Concentration">
      <h1> Concentration </h1>
      <h2> Click cards to reveal an image, then find matching pairs! </h2>
      {gameWon ? (
        <h3> You win! </h3>
      ) : (
        <div className="Grid">
          {cards.map((card, index) => (
            <MemoryCard
              card={card}
              index={index}
              key={index}
              dispatch={dispatch}
              cardsRevealed={cardsRevealed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
