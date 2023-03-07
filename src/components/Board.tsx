import { useState, useEffect } from "react";
import "./Board.css";
import Abyssinian from "../assets/abyssinian.jpg";
import Aegean from "../assets/aegean.jpg";
import UsBobtail from "../assets/american_bobtail.jpg";
import UsShortHair from "../assets/american_shorthair.jpg";
import UsWireHair from "../assets/american_wirehair.jpg";
import Aphrodite from "../assets/aphrodite_giant.jpg";
import UkLongHair from "../assets/british_longhair.jpg";
import UkShortHair from "../assets/british_shorthair.jpg";
import Burmese from "../assets/burmese.jpg";
import Arabian from "../assets/arabian.jpg";
import Card from "./Card";

type Card = {
  revealed: boolean;
  img: string;
};

interface BoardProps {
  blur: React.RefObject<HTMLDivElement>;
  pairsNumber: number;
}

const Board = ({ blur, pairsNumber }: BoardProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [visibleCard, setVisibleCard] = useState<number>(-1);
  const [isOneVisible, setIsOneVisible] = useState<boolean>(false);
  const [guessedCards, setGuessedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [pairsLeft, setPairsLeft] = useState<number>(6);
  const [isLoading, setIsLoading] = useState(false);

  const coverTwoCards = (cardIndex: number) => {
    setCards((prevState) =>
      prevState.map((card, idx) =>
        idx === cardIndex || idx === visibleCard
          ? { ...card, revealed: false }
          : card
      )
    );
  };

  const restoreTwoCards = (cardIndex: number) => {
    coverTwoCards(cardIndex);
    setVisibleCard(-1);
    setIsOneVisible(false);
    setIsLocked(false);
  };

  const hideTwoCards = (cardIndex: number) => {
    coverTwoCards(cardIndex);
    setVisibleCard(-1);
    setIsOneVisible(false);
    setIsLocked(false);
    setGuessedCards([...guessedCards, cardIndex, visibleCard]);
    setPairsLeft((pairsLeft) => pairsLeft - 1);
  };

  const showCard = (cardIndex: number) => {
    setCards((prevState) =>
      prevState.map((card, idx) =>
        idx === cardIndex ? { ...card, revealed: true } : card
      )
    );
  };

  const handleCardClick = (cardIndex: number) => {
    if (isLocked) return;
    if (isOneVisible) {
      setIsLocked(true);
      showCard(cardIndex);
      if (cards[visibleCard].img === cards[cardIndex].img) {
        setTimeout(() => {
          hideTwoCards(cardIndex);
        }, 1100);
      } else {
        setTimeout(() => {
          restoreTwoCards(cardIndex);
        }, 1100);
      }
    } else {
      showCard(cardIndex);
      setVisibleCard(cardIndex);
      setIsOneVisible(true);
    }
  };

  useEffect(() => {
    let catsImg = [
      Abyssinian,
      Aegean,
      UsBobtail,
      UsShortHair,
      UsWireHair,
      Aphrodite,
      UkLongHair,
      UkShortHair,
      Burmese,
      Arabian,
    ]
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, pairsNumber)
      .reduce((acc: string[], value: string) => [...acc, value, value], [])
      .sort((a, b) => 0.5 - Math.random());
    setCards(
      catsImg.reduce(
        (acc: Card[], value: string) => [
          ...acc,
          { revealed: false, img: value },
        ],
        []
      )
    );
    setGuessedCards([]);
    setPairsLeft(pairsNumber);
    setIsLoading(false);
  }, [pairsNumber]);

  return (
    <>
      {!isLoading && (
        <div ref={blur}>
          <h1>Memory Game</h1>
          {pairsLeft === 0 ? (
            <div className="win-info">
              <p>You win!!!</p>
              <button onClick={() => location.reload()}>Play again</button>
            </div>
          ) : (
            <div className="board">
              {cards.map((card, idx) => (
                <div className="scene" key={idx}>
                  <Card
                    isRevealed={cards[idx].revealed}
                    isGuessed={guessedCards.includes(idx)}
                    bgImg={cards[idx].img}
                    handleCardClick={() => handleCardClick(idx)}
                  ></Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Board;
