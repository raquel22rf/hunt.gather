import { useState } from "react";
import "./App.css";
import GeoMap from "./components/GeoMap";
import Web3Wallet from "./components/Web3Wallet";

const App = () => {
  const [connectWallet, setConnectWallet] = useState<boolean>(false);

  return (
    <div className="px-2">
      <article className="prose flex flex-col justify-center ">
        <h1 className="pt-6">hunt.gather</h1>
        <GeoMap />
        {!connectWallet ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4  py-2 px-4 rounded-full"
            onClick={() => setConnectWallet(true)}
          >
            Add food source
          </button>
        ) : (
          <Web3Wallet />
        )}
      </article>
    </div>
  );
};

export default App;
