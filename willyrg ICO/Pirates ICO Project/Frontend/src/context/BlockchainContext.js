import { createContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import Vofo_Data from "../blockchain/PiratesToken";
import Vofo_Crowdsale_Data from "../blockchain/PiratesTokenCrowdsale";
import { isMobile } from "react-device-detect";
import Swal from "sweetalert2";

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
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [vofoData, setVofoData] = useState();
  const [vofoCrowdsaleData, setVofoCrowdsaleData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    ethereum.on("accountsChanged", async function () {
      window.location.reload();
    });

    ethereum.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (isMobile) {
        if (!window.ethereum) {
          window.open(
            "https://metamask.app.link/dapp/elegant-starlight-536201.netlify.app/"
          );
        }
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      // Check Network
      // const chainId = await getNetworkChainId();
      // if (chainId !== 4690) {
      //   alert("Please Change Network to Iotex Mainnet!");
      //   return;
      // }

      if (accounts.length) {
        // Set Current Signer
        const signer = getSigner();
        setCurrentSigner(signer);

        // Set Current Signer Address
        const signerAddress = await getSignerAddress();
        setCurrentSignerAddress(signerAddress);

        // Fetch Vofo
        vofoTokenInfo(signerAddress);

        // Crowdsale Info
        crowdsaleTokenInfo(signerAddress);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      // Check for Mobile

      if (isMobile) {
        if (!window.ethereum) {
          window.open(
            "https://metamask.app.link/dapp/elegant-starlight-536201.netlify.app/"
          );
        }
      }

      if (!ethereum) return alert("Please install Metamask");
      // Request Metamask for accounts
      await ethereum.request({ method: "eth_requestAccounts" });

      // Check Network
      // const chainId = await getNetworkChainId();
      // if (chainId !== 4690) {
      //   alert("Please Change Network to Iotex Mainnet");
      //   return;
      // }

      // Set Current Signer
      const signer = getSigner();
      setCurrentSigner(signer);

      // Set Current Signer Address
      const signerAddress = await getSignerAddress();
      setCurrentSignerAddress(signerAddress);

      // Fetch Vofo
      vofoTokenInfo(signerAddress);
      // Crowdsale Info
      crowdsaleTokenInfo(signerAddress);
    } catch (error) {
      alert(error.data.message);

      throw new Error("No Ethereum Object");
    }
  };

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  // Get VofoToken Info
  const vofoTokenInfo = async (signerAddress) => {
    const provider = getProvider();
    const vofo = new ethers.Contract(
      Vofo_Data.address,
      Vofo_Data.abi,
      provider
    );

    const name = await vofo.name();
    const symbol = await vofo.symbol();
    const decimals = await vofo.decimals();
    const totalSupply = await vofo.totalSupply();

    setVofoData({ name, symbol, decimals, totalSupply });
  };

  // Get Crowdsale TokenInfo
  const crowdsaleTokenInfo = async (signerAddress) => {
    const provider = getProvider();
    const vofoCrowdsale = new ethers.Contract(
      Vofo_Crowdsale_Data.address,
      Vofo_Crowdsale_Data.abi,
      provider
    );

    const token = await vofoCrowdsale.token();
    const remainingTokens = await vofoCrowdsale.remainingTokens();
    const rate = await vofoCrowdsale.rate();

    setVofoCrowdsaleData({
      tokenAddress: token,
      availableForSale: BigNumber.from(remainingTokens).toString(),
      price: BigNumber.from(rate).toString(),
    });
  };

  // Buy Tokens
  const buyToken = async (props) => {
    if (!currentSignerAddress) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please Connect Wallet First",
      });
      return;
    }

    const vofoCrowdsale = new ethers.Contract(
      Vofo_Crowdsale_Data.address,
      Vofo_Crowdsale_Data.abi,
      currentSigner
    );

    let tx;
    try {
      setLoading(true);
      tx = await vofoCrowdsale.buyTokens(props.amount, {
        value: ethers.utils.parseEther(
          String(
            props.amount * ethers.utils.formatEther(props.price.toString())
          )
        ),
      });

      await tx.wait();
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "Tokens Purchased Susscessfully",
      });
      await crowdsaleTokenInfo(currentSignerAddress);
    } catch (error) {
      setLoading(false);
      if (
        error.data.message.toString().includes("insufficient funds for gas")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Insufficient Funds in Wallet",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: error.data.message.toString(),
        });
        console.log(error);
      }
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        currentSignerAddress,
        vofoData,
        vofoCrowdsaleData,
        buyToken,
        loading,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
