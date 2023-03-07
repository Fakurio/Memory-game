import "./Menu.css";
import closeIcon from "../assets/close.svg";
import settingsIcon from "../assets/settings.svg";
import { useState } from "react";

interface MenuProps {
  blur: React.RefObject<HTMLDivElement>;
  handleChangePairAmount: (amount: number) => void;
}

const Menu = ({ blur, handleChangePairAmount }: MenuProps) => {
  const [isClosed, setIsClosed] = useState(true);

  const handleMenuToggle = (state: boolean) => {
    setIsClosed(!state);
    if (!blur.current) return;
    blur.current.classList.toggle("blur");
  };

  return (
    <>
      <img
        className="icon"
        src={settingsIcon}
        onClick={() => handleMenuToggle(isClosed)}
      ></img>
      <div className={`menu ${!isClosed && "active"}`}>
        <img
          className="icon"
          src={closeIcon}
          onClick={() => handleMenuToggle(isClosed)}
        ></img>
        <div className="menu-content">
          <h1 className="content-heading">How many pairs?</h1>
          <div className="content-buttons">
            <button onClick={() => handleChangePairAmount(6)}>6 pair</button>
            <button onClick={() => handleChangePairAmount(8)}>8 pair</button>
            <button onClick={() => handleChangePairAmount(10)}>10 pair</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
