import { useEffect, useState } from "react";
import "./App.css";
import ChangeTheme from "./components/ChangeTheme";
import FoodSourceForm from "./components/FoodSourceForm";
import GeoMap from "./components/GeoMap";
import UploadImage from "./components/UploadImage";
import Web3Wallet from "./components/Web3Wallet";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

  function createFoodSource() {
    setIsWalletConnected(true);
  }

  return (
    <div className="px-2">
      <article className="prose flex flex-col justify-center ">
        <div className="flex justify-between">
          <h1>harvest.today</h1>
          <ChangeTheme />
        </div>
        <div className="flex flex-col justify-around">
          <GeoMap isWalletConnected={isWalletConnected} />
          {!isWalletConnected ? (
            <button
              className="btn btn-outline btn-secondary my-3"
              onClick={() => setIsWalletConnected(true)}
            >
              Add food source
            </button>
          ) : (
            <Web3Wallet />
          )}
        </div>
      </article>
    </div>
  );
};

export default App;
