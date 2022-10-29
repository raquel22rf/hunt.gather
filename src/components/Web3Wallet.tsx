import React from "react";
import { useAccount, Web3Button } from "@web3modal/react";
const Web3Wallet = () => {
  const { account } = useAccount();
  return (
    <div className=" ">
      {account.address && (
        <h5 className="px-1">
          Hello <span>{account.address}</span>
        </h5>
      )}
      <div className="flex flex-col justify-center py-2">
        <p>Click somewhere in the map to select the location</p>
        <Web3Button />
      </div>
    </div>
  );
};

export default Web3Wallet;
