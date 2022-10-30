const connectWallet = () => {
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      console.log(res);
    });
  } else {
    alert("install metamask extension!!");
  }
};

const Web3Wallet = () => {
  return (
    <div className="flex flex-col justify-center py-2">
      <button
        className="btn btn-outline btn-secondary my-3"
        onClick={connectWallet}
      >
        Connect your wallet
      </button>
    </div>
  );
};

export default Web3Wallet;
