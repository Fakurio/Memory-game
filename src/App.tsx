import "./App.css";
import Board from "./components/Board";
import Menu from "./components/Menu";
import { useRef, useState } from "react";

function App() {
  const [pairAmount, setPairAmount] = useState<number>(6);
  const blurLayer = useRef<HTMLDivElement>(null);

  const handleChangePairAmount = (amount: number) => {
    setPairAmount(amount);
  };

  return (
    <div className="App">
      <Board blur={blurLayer} pairsNumber={pairAmount} />
      <Menu blur={blurLayer} handleChangePairAmount={handleChangePairAmount} />
    </div>
  );
}

export default App;
