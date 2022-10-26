import { createContext, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isMobile } from "react-device-detect";
import contract from "../Blockchain/contract";
import { INFURA_ID } from "../Config/config";

export const BlockchainContext = createContext();

// PROVIDER OPTIONS
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

// Web3 Modal Config
const web3Modal = new Web3Modal({
  // network: "rinkeby", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: "dark",
});

export const BlockchainContextProvider = (props) => {
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);

  const connectWallet = async () => {
    try {
      if (isMobile) {
        if (!window.ethereum) {
          // window.open(
          //   "https://metamask.app.link/dapp/superb-sopapillas-fe6a25.netlify.app/"
          // );
        }
      }

      await disconnectWallet();
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const chainId = await signer.getChainId();

      if (chainId !== 5) {
        await web3Provider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
        window.location.reload();
      }

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);

      const nftContract = new ethers.Contract(
        contract.address,
        contract.abi,
        web3Provider
      );

      const totalMinted = await nftContract.totalSupply();
      setTotalSupply(totalMinted);
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

  // Mint Function
  const mint = async (props) => {
    // Get Ethereum Contract

    if (!currentSignerAddress) {
      alert("Please Connect Wallet!");
    }

    const nftContract = new ethers.Contract(
      contract.address,
      contract.abi,
      currentProvider
    );
    const nftContractWithSigner = nftContract.connect(currentSigner);

    // Get Cost
    const cost = await nftContract.mintPrice();
    const Single_Mint_Cost = cost.toString();
    const Total_Cost = Single_Mint_Cost * props.amount;
    let tx;

    try {
      tx = await nftContractWithSigner.publicMint(props.amount, {
        value: Total_Cost.toString(),
      });
      await tx.wait();
      const tokens = await nftContract.walletOfOwner(currentSignerAddress);

      return {
        tx: tx.hash,
        status: "OK",
        message: "Successfull",
        tokenNumber: tokens[tokens.length - 1].toString(),
      };
    } catch (error) {
      if (error.toString().includes("Sale must be active to mint tokens")) {
        return {
          tx: null,
          status: "FAIL",
          message: "Sale must be active to mint tokens",
        };
      } else if (error.toString().includes("Exceeds max supply")) {
        return {
          tx: null,
          status: "FAIL",
          message: "Sorry, Max Supply Exceeded!",
        };
      } else if (error.toString().includes("Exceeds mint limit per address")) {
        return {
          tx: null,
          status: "FAIL",
          message: "Sorry, Exceeds mint limit per address",
        };
      } else if (
        error.toString().includes("Value doesnot match with mint price")
      ) {
        return {
          tx: null,
          status: "FAIL",
          message: "Insufficient Funds Provided For Minting",
        };
      } else if (error.toString().includes("insufficient funds")) {
        return {
          tx: null,
          status: "FAIL",
          message: "Insufficient Funds Provided For Minting",
        };
      } else {
        console.log(error);
        return { tx: null, status: "FAIL", message: error.toString() };
      }
    }
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
        mint,
        totalSupply,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
