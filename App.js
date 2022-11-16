import "./App.css";
import {useState} from "react";
import { ethers } from 'ethers';
import Web3 from "web3";
export default function App () {

  const ABI = [
    {
      "inputs": [],
      "name": "entry",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "getEntryAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  
  // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545"); // khởi tạo object web3
  // var balance;
  // const balanced = web3.eth.getBalance("0xB58e492f976630d526f2C1c46661dB6DB768D7fB").then(bal => balance = bal);
  // console.log(balanced)

  // function times
  function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }

 const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545"); // khởi tạo object web3
 
 
  // Hold current wallet address by using "useState" in react Hook 
  const[walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState("");
  // const [isBalance, setBalance] = useState("");

  // Helper Functions
  // Requests access to the user's META MASK WALLET
  async function requestAcc () {
    console.log("requesting account !")
    // Check if Meta Mask Extension exists
    if (window.ethereum){
      console.log("detected")
      // if meta is exists then request all account in metamask i have (by: window.ethereum. request)
      try{

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts)
        setWalletAddress(accounts[0]);
        setIsConnecting(accounts[0]);
        await requestBalance()
      }
      //catch any errors
      catch(error){
        console.log("error connect wallet")
      }
    } 
    else{
      console.log("not detected")
    }
  }
  async function requestBalance () {
    var balance;
    const amountBalance = await web3.eth.getBalance("0xB58e492f976630d526f2C1c46661dB6DB768D7fB").then(bal => balance = bal);
    sleep(5000);
    console.log(amountBalance);
    // setBalance(amountBalance)
  }
   





  // Create a provider to interact with a smart contract
  //  use this provider for smart contract interactions
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAcc();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  
  
  return(
    <div className="App">
      <header className="App-header">
        <button
        // create an onClick function to called async when button is clicked !
        onClick = {requestAcc}
        > {!isConnecting && "Connect Metamask"}
          {isConnecting && "Welcome to react-web3"}</button>
        <h3>Wallet Address: <hr/> {walletAddress}</h3>
        <h3>Balance: </h3>
      </header>
    </div>
  );
}

