import { useAccount, Web3Button } from "@web3modal/react";

const Web3Wallet = () => {
  const { account } = useAccount();
  return (
    <div>
      {account.address && (
        <h5 className="px-1">
          Hello <span>{account.address}</span>
        </h5>
      )}
      <div className="flex flex-col justify-center py-2">
        <Web3Button label={"Connect your wallet"} />
      </div>
    </div>
  );
};

export default Web3Wallet;
