const ethereumButton = document.querySelector('.enableEthereumButton');
const ethereumButton2 = document.querySelector('.enableEthereumButton2');
const ethereumButton3 = document.querySelector('.enableEthereumButton3');
const ethereumButton4 = document.querySelector('.enableEthereumButton4');
const ethereumButton5 = document.querySelector('.enableEthereumButton5');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});
ethereumButton2.addEventListener('click', () => {
  getAccount2();
});
ethereumButton3.addEventListener('click', () => {
  sign();
});
ethereumButton4.addEventListener('click', () => {
  getAccount4();
});
ethereumButton5.addEventListener('click', () => {
  getAccount5();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}


async function getAccount2() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}

function sign(){
    var from = ethereum.selectedAddress;
    console.log(from);
    var params = ['test',from];
    var method = 'personal_sign';

    web3.currentProvider.sendAsync(
    {
      method,
      params,
      from,
    },
    function (err, result) {

      $.get( 'http://localhost:3000/sign/'+JSON.stringify(result.result) );

    });
 }
