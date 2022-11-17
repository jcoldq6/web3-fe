 const Web3 = require('web3')
// const rpcURL = 'https://goerli.infura.io/v3/79687f15952340e9b3d5601a12e3bbaf' // Your RPC URL goes here

// const web3 = new Web3(rpcURL) 
// const address = '0xDe4075340eDD710D625Ce850ad9ed77BB9EA40E4' // Your account address goes here
// // eth obj use ethereum lib, function check and show balance
// web3.eth.getBalance(address, (err, wei) => {
//   balance = web3.utils.fromWei(wei, 'ether')
//   console.log(balance)
// })

// function show ether block (need to find out what is eth block)
const web3Provider = new Web3.providers.HttpProvider(rpcURL);
const web3 = new Web3(web3Provider);
web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ",result);
});
