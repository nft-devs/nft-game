import Web3 from 'web3';

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error(error);
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('Non-ethereum browser detected.')
  }
}