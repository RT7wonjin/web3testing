const ethereumButton = document.querySelector('.enableEthereumButton');
const ethereumButton2 = document.querySelector('.enableEthereumButton2');
const ethereumButton3 = document.querySelector('.enableEthereumButton3');
const ethereumButton4 = document.querySelector('.enableEthereumButton4');
const ethereumButton5 = document.querySelector('.enableEthereumButton5');
const ethereumButton6 = document.querySelector('.enableEthereumButton6');



ethereumButton.addEventListener('click', () => {
  getBlockNumber();
});
ethereumButton2.addEventListener('click', () => {
  getAccount();
});
ethereumButton3.addEventListener('click', () => {
  sign();
});
ethereumButton4.addEventListener('click', () => {
  addtoken();
});
ethereumButton5.addEventListener('click', () => {
  send_tx();
});
ethereumButton6.addEventListener('click', () => {
  switch_chain();
});

//web3추가
if (typeof web3 !== 'undefined') {
        web3 = new Web3(window.ethereum);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }

async function getBlockNumber() {

  web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
  })
}


async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log( account);
}

async function sign(){
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

    var method = 'personal_sign';

    const sig=ethereum.request(
    {
      method:'personal_sign',
      params:['test1',ethereum.selectedAddress],
    })
    .then(result => console.log(result))
 }


async function addtoken(){
 const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
 const tokenSymbol = 'TUT';
 const tokenDecimals = 18;
 const tokenImage = 'http://placekitten.com/200/300';

 try {
   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
   const wasAdded = await ethereum.request({
     method: 'wallet_watchAsset',
     params: {
       type: 'ERC20', // Initially only supports ERC20, but eventually more!
       options: {
         address: tokenAddress, // The address that the token is at.
         symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
         decimals: tokenDecimals, // The number of decimals in the token
         image: tokenImage, // A string url of the token logo
       },
     },
   });

   if (wasAdded) {
     console.log('Thanks for your interest!');
   } else {
     console.log('Your loss!');
   }
 } catch (error) {
   console.log(error);
 }
}

function send_tx(){

   var params= [
    {
      from: ethereum.selectedAddress,
      to: '0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654',
      gas: '868141', // 30400
      gasPrice: '25', // 10000000000000
      value: web3.utils.toWei('0.01','ether'), // 2441406250
      data:
        '0x1b2ba114000000000000000000000000c6a2ad8cc6e4a7e08fc37cc5954be07d499e7654000000000000000000000000000000000000000000000000002369e618c9d7d70000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000037d46c6813b121d6a27ed263aef782081ae95434',
    },
  ];

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result) => {
      // The result varies by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
    })
    .catch((error) => {
      // If the request fails, the Promise will reject with an error.
    });
}

async function switch_chain(){

    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
              chainId:web3.utils.toHex(42262),
              chainName: 'Emerald Mainnet',
              rpcUrls: ['https://emerald.oasis.dev'],
              CurrencySymbol:"ROSE"
            },
          ],
        });
}
