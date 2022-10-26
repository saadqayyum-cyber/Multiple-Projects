import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const BlockchainContext = createContext();

// INFURA ID
const INFURA_ID = "27e484dcd9e3efcfd25a83a78777cdf1";

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
      appName: "Soul Bulbs", // Required
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
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");
  const [found, setFound] = useState(false);

  useEffect(() => {
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    const provider = await web3Modal.connect();
    provider.on("accountsChanged", async function () {
      window.location.reload();
    });

    provider.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const connectWallet = async () => {
    try {
      await web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);
    } catch (error) {
      //   alert(error.data.message);
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const addUser = () => {};

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        currentSignerAddress,
        addUser,
        found,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
