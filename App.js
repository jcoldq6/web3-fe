import "./App.css";
import { useState } from "react";
// import { ethers } from 'ethers';
import Web3 from "web3";

export default function App() {
  // khởi tạo object web3 (lib of web3 include: Web3.utils,  Web3.version, Web3.givenProvider, Web3.providers...)
  const web3 = new Web3(
    Web3.givenProvider ||
      "https://goerli.infura.io/v3/79687f15952340e9b3d5601a12e3bbaf"
  );

  // Hold current wallet address by using "useState" in react Hook
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState("");
  const [isBalance, setBalance] = useState("");

  // Requests access to the user's META MASK WALLET
  async function requestAcc() {
    console.log("requesting account !");
    // Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");
      // if meta is exists then request all account in metamask i have (by: window.ethereum. request)
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
        setIsConnecting(accounts[0]);
        requestBalance(accounts[0]);

        // await connectWallet ()
      } catch (error) {
        console.log("error connect wallet");
      }
    } else {
      console.log("not detected");
    }
  }

  // contract array ABI
  // check đầu vào entry
  const checkEntry = async () => {
    const ABIcontract = [
      {
        inputs: [],
        name: "entry",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "getEntryAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    // before using function they have in contract i have, must load contract then using function inside them
    const loadContract = async (ABIcontract, contractAddress) => {
      window.web3 = new Web3(window.web3.currentProvider);
      const web3 = window.web3;
      const contract = new web3.eth.Contract(ABIcontract, contractAddress);

      return contract;
    };

    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    // check contract address
    const contractAddress = web3.utils.toChecksumAddress(
      "0xB72388734F00d89E14BD958Ca095Cb60cD2383aa"
    );

    const contract = await loadContract(ABIcontract, contractAddress);
    console.log(contract);
    const addressUse = web3.utils.toChecksumAddress(
      "0x13Da38000C7dC9D05ce1754Bd75D74558A396511"
    );
    contract.methods
      // .getEntryAmount(web3.utils.toChecksumAddress("0x13Da38000C7dC9D05ce1754Bd75D74558A396511"))
      .getEntryAmount(addressUse)
      .call()
      .then((result) => {
        console.log(result);
      });
  };

  // entry
  const entry = async () => {
    const ABIcontract = [
      {
        inputs: [],
        name: "entry",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "getEntryAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    // before using function they have in contract i have, must load contract then using function inside them
    const loadContract = async (ABIcontract, contractAddress) => {
      window.web3 = new Web3(window.web3.currentProvider);
      const web3 = window.web3;
      const contract = new web3.eth.Contract(ABIcontract, contractAddress);
      return contract;
    };

    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    // check contract address
    const contractAddress = web3.utils.toChecksumAddress(
      "0xB72388734F00d89E14BD958Ca095Cb60cD2383aa"
    );
    console.log("a");
    const contract = await loadContract(ABIcontract, contractAddress);
    console.log(contract);
    console.log("1");
    const signedTxn = await contract.methods.entry().send({
      from: walletAddress,
      gas: 1000000,
    });
    console.log(signedTxn);
  };
  // call balance
  const requestBalance = async (accounts) => {
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const balance = await web3.eth.getBalance(accounts);
    const balanceHaved = await web3.utils.fromWei(balance);
    setBalance(balanceHaved);
    console.log(balanceHaved);
    return balance;
  };

  // do multisend
  const multisend = async () => {
    const ABImultisend = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "recipients",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bool",
            name: "revertOnfail",
            type: "bool",
          },
        ],
        name: "scatterEthers", //array address, array ethers
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "recipients",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bool",
            name: "revertOnfail",
            type: "bool",
          },
        ],
        name: "scatterTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value", //value
            type: "uint256",
          },
        ],
        name: "TransferFailed",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    const loadContract = async (ABIcontract, contractAddress) => {
      window.web3 = new Web3(window.web3.currentProvider);
      const web3 = window.web3;
      const contract = new web3.eth.Contract(ABIcontract, contractAddress);
      return contract;
    };

    //khoi tao web3
    const { ethereum } = window;
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    // contract Address have token to send other 
    const contractAddress = web3.utils.toChecksumAddress(
      "0x13da38000c7dc9d05ce1754bd75d74558a396511"
    );
    // contract will recieve token for any addressWallet in array walletRecieved
    const walletRecieved = [];
    // amount token to send in arry amountSend
    const amountSend = [];
    //  Nhận arress sẽ được gửi token
    const arrayWalletRecievedValue = document.getElementById("amount-value").value;
    // amount sẽ send cho arrayWalletRecievedValue
    const recipientsNumber = document.getElementById("amount-value").value.split("\n").length;
    console.log(recipientsNumber)
    const arrayWalletRecievedAddresses = arrayWalletRecievedValue.split("\n");
    let totalValue = 0;
    // phân biệt dãy giữa wallet address sẽ nhận token và amount 
    for (let i = 0; i < recipientsNumber; i++) {
      const arrayWalletRecievedAddress = arrayWalletRecievedAddresses[i].split("=")[0];
      walletRecieved.push(arrayWalletRecievedAddress);
      const amountWalletReceive = arrayWalletRecievedAddresses[i].split("=")[1];
      amountSend.push(amountWalletReceive);
      totalValue += parseInt(amountWalletReceive);
    }
    console.log(totalValue);
    const contract = await loadContract(ABImultisend, contractAddress);
    const multisenTxn = contract.methods.scatterEthers(walletRecieved, amountSend, true);
    console.log(multisenTxn)
    // console.log(multisenTxn.transactionHash);
    const multiSend = await multisenTxn.send({
      from: walletAddress,
      gas: 1000000,
      value: totalValue,
    }).on("confirmation", function(confirmation, receipt, latestBlockHash) {
      console.log("confirmation",confirmation, receipt, latestBlockHash)
    });
    console.log(multiSend);
    console.log("done send")
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <button
          // create an onClick function to called async when button is clicked !
          onClick={requestAcc}
        >
          {""}
          {!isConnecting && "Connect Metamask"}
          {isConnecting && "Welcome to react-web3"}
        </button>
        <h3>
          Wallet Address: <hr /> {walletAddress}
        </h3>
        <h3>
          Balance: {isBalance}
          {!isConnecting && "loading..."}
          {isConnecting && "ETH"}
        </h3>
        <button onClick={checkEntry}>{""} check Entry</button>
        <hr />
        <button onClick={entry}> Entry</button>
        <hr/>
        <textarea
          className="multisend-value"
          id="amount-value"
          placeholder="0x... = amount"
        ></textarea>
        <hr/>
        <button
        className="connect-wallet-button"
        type="input"
        onClick={multisend}>Multi Send</button>
      </header>
    </div>
  );
}