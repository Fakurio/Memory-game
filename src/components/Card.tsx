import "./Card.css";

interface CardProps {
  isRevealed: boolean;
  isGuessed: boolean;
  bgImg: string;
  handleCardClick: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({ isRevealed, isGuessed, bgImg, handleCardClick }: CardProps) => {
  return (
    <>
      <div
        className={`card ${isRevealed ? "is-flipped" : ""} ${
          isGuessed ? "cardH" : ""
        }`}
        onClick={handleCardClick}
      >
        <div className="card-face  card-face-front"></div>
        <div
          className={`card-face card-face-back ${isRevealed ? "cardA" : ""}`}
          style={
            isRevealed ? { backgroundImage: `url("${bgImg}")` } : undefined
          }
        ></div>
      </div>
    </>
  );
};

export default Card;
