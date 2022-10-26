import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contract from '../blockchain/contract';

export const BlockchainContext = createContext();

const { ethereum } = window;

const getProvider = () => {
  return new ethers.providers.Web3Provider(ethereum);
};

const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};

// returns promise
const getSignerAddress = () => {
  const provider = getProvider();
  return provider.getSigner().getAddress();
};

const getCurrentNetwork = () => {
  const provider = getProvider();
  return provider.getNetwork();
};

// returns Promise
const getNetworkChainId = async () => {
  const network = await getCurrentNetwork();
  return network.chainId;
};

export const BlockchainContextProvider = (props) => {
  const [currentSigner, setCurrentSigner] = useState('');
  const [currentSignerAddress, setCurrentSignerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    ethereum.on('accountsChanged', async function () {
      window.location.reload();
    });

    ethereum.on('chainChanged', (currentChainId) => {
      window.location.reload();
    });
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      // Check Network
      const chainId = await getNetworkChainId();
      if (chainId !== 1) {
        alert('Please Change Network to Ethereum Mainnet!');
        return;
      }

      if (accounts.length) {
        // Set Current Signer
        const signer = getSigner();
        setCurrentSigner(signer);

        // Set Current Signer Address
        const signerAddress = await getSignerAddress();
        setCurrentSignerAddress(signerAddress);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      alert(error.data.message);

      throw new Error('No Ethereum Object');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask');
      // Request Metamask for accounts
      await ethereum.request({ method: 'eth_requestAccounts' });

      // Check Network
      const chainId = await getNetworkChainId();
      if (chainId !== 1) {
        alert('Please Change Network to Ethereum Mainnet!');
        return;
      }

      // Set Current Signer
      const signer = getSigner();
      setCurrentSigner(signer);

      // Set Current Signer Address
      const signerAddress = await getSignerAddress();
      setCurrentSignerAddress(signerAddress);
    } catch (error) {
      alert(error.data.message);

      throw new Error('No Ethereum Object');
    }
  };

  const getEthereumContract = async () => {
    if (!currentSigner) {
      alert('Please Connect Wallet First!');
      setIsLoading(false);
      return;
    }

    const provider = getProvider();
    const nftContract = new ethers.Contract(contract.address, contract.abi, provider);
    return nftContract;
  };

  const mint = async (props) => {
    if (props.amount < 1) {
      alert('Mint Amount should be at least 1');
      return;
    }
    // Loader True
    setIsLoading(true);

    // Get Ethereum Contract
    const nftContract = await getEthereumContract();
    const nftContractWithSigner = nftContract.connect(currentSigner);

    // Check if Signer is Owner
    const owner = await nftContract.owner();
    // Get Cost
    const cost = await nftContract.cost();
    const Single_Mint_Cost = cost.toString();
    const Total_Cost = Single_Mint_Cost * props.amount;
    let tx;

    try {
      if (owner === currentSignerAddress) {
        tx = await nftContractWithSigner.mint(currentSignerAddress, props.amount);
      } else {
        tx = await nftContractWithSigner.mint(currentSignerAddress, props.amount, {
          value: Total_Cost.toString()
        });
      }

      await tx.wait();
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      if (error.toString().includes('insufficient funds')) {
        alert('Insufficient Funds!');
      } else if (error.toString().includes('Minting is Paused')) {
        alert('Minting is Paused!');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        currentSigner,
        currentSignerAddress,
        connectWallet,
        mint,
        isLoading
      }}>
      {props.children}
    </BlockchainContext.Provider>
  );
};
