import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import contract from "../Blockchain/contract";
import { useNavigate } from "react-router-dom";

export const BlockchainContext = createContext();

// INFURA ID
const INFURA_ID = process.env.REACT_APP_INFURA_ID;

// PROVIDER OPTIONS
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Tiki Island", // Required
      infuraId: INFURA_ID, // Required
      chainId: 1, // Optional. It defaults to 1 if not provided
    },
  },
};

// Web3 Modal Config
const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: "dark",
});

export const BlockchainContextProvider = (props) => {
  let navigate = useNavigate();

  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenData, setTokenData] = useState("");

  useEffect(() => {
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    let provider;
    try {
      await disconnectWallet();
      provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      let balance = await signer.getBalance();
      balance = ethers.utils.formatEther(balance).substring(0, 5);

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);
      setBalance(balance);

      //   Contract
      const connectedContract = new ethers.Contract(
        contract.address,
        contract.abi,
        web3Provider
      );

      const _tokenIds = await connectedContract.walletOfOwner(address);

      let tokenIds = [];

      if (_tokenIds.length > 0) {
        _tokenIds.forEach((element) => {
          tokenIds.push(element.toString());
        });
        setTokenData({ tokenIds });
        console.log(tokenIds);

        navigate("/collection");
      } else {
        navigate("/opps");
      }
    } catch (error) {
      //   alert(error.data.message);
      console.log(error);
      throw new Error("No Ethereum Object");
    }

    provider.on("accountsChanged", async function () {
      window.location.reload();
    });

    provider.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const connectWallet = async () => {
    try {
      await disconnectWallet();
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      let balance = await signer.getBalance();
      balance = ethers.utils.formatEther(balance).substring(0, 5);

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);
      setBalance(balance);

      //   Contract
      const connectedContract = new ethers.Contract(
        contract.address,
        contract.abi,
        web3Provider
      );

      const _tokenIds = await connectedContract.walletOfOwner(address);

      let tokenIds = [];

      if (_tokenIds.length > 0) {
        _tokenIds.forEach((element) => {
          tokenIds.push(element.toString());
        });
        setTokenData({ tokenIds });
        console.log(tokenIds);

        navigate("/collection");
      } else {
        navigate("/opps");
      }
    } catch (error) {
      //   alert(error.data.message);
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setCurrentSigner(null);
    setCurrentSignerAddress(null);
  };

  const transferMoney = async () => {
    const treasuryWallet = process.env.REACT_APP_TREASURY_WALLET;
    const storyPrice = process.env.REACT_APP_STORY_PRICE;

    return currentSigner.sendTransaction({
      to: treasuryWallet,
      value: ethers.utils.parseEther(storyPrice),
    });
  };

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentSignerAddress,
        balance,
        tokenData,
        transferMoney,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
