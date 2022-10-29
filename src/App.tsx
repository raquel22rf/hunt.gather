import { useState } from "react";
import "./App.css";
import ChangeTheme from "./components/ChangeTheme";
import GeoMap from "./components/GeoMap";
import Web3Wallet from "./components/Web3Wallet";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [validMonths, setValidMonths] = useState<number[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  function createFoodSource() {
    setIsWalletConnected(true);
  }

  return (
    <div className="px-2">
      <article className="prose flex flex-col justify-center ">
        <div className="flex justify-between">
          <div className="flex items-center mt-3 mb-0">
            <img src="/logo.png" className="logo mx-1 " />
            <h1 className="m-0">harvest.today</h1>
          </div>
          <ChangeTheme />
        </div>
        <div className="flex flex-col justify-around">
          <GeoMap isWalletConnected={isWalletConnected} setLatitude={setLatitude} setLongitude={setLongitude} />
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
