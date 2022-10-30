const connectWallet = () => {
  if(window.ethereum){
    window.ethereum.request({method:'eth_requestAccounts'})
    .then(res=>{
      console.log(res);
    })
  }else{
    alert("install metamask extension!!")
  }
}

const Web3Wallet = () => {
  return (
    <div>
      <div className="flex flex-col justify-center py-2">
        <p>Click somewhere in the map to select the location</p>
        <button
          onClick={connectWallet}>Connect your wallet</button>
      </div>
    </div>
  );
};

export default Web3Wallet;
