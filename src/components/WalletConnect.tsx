import React from "react";
import { Web3Modal } from "@web3modal/react";
import type { ConfigOptions } from "@web3modal/core";

const config: ConfigOptions = {
  projectId: "9fa9db4de9d0fab82e5405f9a891d192",
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "web3Modal",
  },
};
const WalletConnect = () => {
  return (
    <>
      <Web3Modal config={config} />
    </>
  );
};

export default WalletConnect;
