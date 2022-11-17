import "./App.css";
import {useState} from "react";
import { ethers } from 'ethers';
import Web3 from "web3";

export default function App () {
  
  // contract array ABI
  var ABI = [
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


 const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545"); // khởi tạo object web3
 var contractAddress = "0xB72388734F00d89E14BD958Ca095Cb60cD2383aa";
 
 const daiToken = new web3.eth.Contract(ABI, contractAddress)
 console.log(daiToken)
  // Hold current wallet address by using "useState" in react Hook 
  const[walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState("");
  const [isBalance, setBalance] = useState("");


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
  
        // await connectWallet ()
        
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
    var amountBalance = await web3.eth.getBalance("0xB58e492f976630d526f2C1c46661dB6DB768D7fB").then(bal => balance = bal);

    setBalance(amountBalance)
    setIsConnecting(amountBalance);
  }

        // Create a provider to interact with a smart contract
        //    
    async function connectWallet() {
      if(typeof window.ethereum !== 'undefined') {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var myContract = new web3.eth.Contract(ABI,contractAddress, {
          from: walletAddress, 
        });
        console.log(myContract)
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
        <h3>Balance: {isBalance} 
        {!isConnecting && "loading..."}
        {isConnecting && "ETH"}</h3>
      </header>
    </div>
  );
}

