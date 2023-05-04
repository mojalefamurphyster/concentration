import "./styles.css";

export default function MemoryCard({ card, index, dispatch, cardsRevealed }) {
  const { icon, visibility } = card;
  const memoryCardClasses = ["MemoryCard", visibility];
  const iconClasses = ["material-icons large-icon", visibility];

  const allowPlay = cardsRevealed.length < 2 && card.visibility !== "removed";
  const playType = card.visibility === "hidden" ? "showCard" : "hideCard";

  const play = () => {
    if (allowPlay) {
      dispatch({ type: playType, index });
    }
  };

  return (
    <div className={memoryCardClasses.join(" ")} role="button" onClick={play}>
      <span className={iconClasses.join(" ")}>{icon}</span>
    </div>
  );
}
