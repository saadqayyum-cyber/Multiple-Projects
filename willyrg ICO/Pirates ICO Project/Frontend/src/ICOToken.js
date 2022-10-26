import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { formatUnits, formatEther, parseEther } from "@ethersproject/units";

import ITManTokenArtifacts from "./Blockchain/VofoToken.json";
import ITManTokenCrowdsaleArtifacts from "./Blockchain/VofoTokenCrowdsale.json";
import { BigNumber, ethers } from "ethers";
const providerUrl = "";
const data = "";
const TokenInfo = ({ tokenAddress }) => {
  const fetchTokenInfo = async () => {
    // const provider = library || new ethers.providers.Web3Provider(window.ethereum || providerUrl);
    // const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, provider) as ITManToken;
    // const name = await tokenContract.name();
    // const symbol = await tokenContract.symbol();
    // const decimals = await tokenContract.decimals();
    // const totalSupply = await tokenContract.totalSupply();
    // logger.warn("token info", { name, symbol, decimals });

    const name = "Vofo";
    const symbol = "V";
    const decimals = 18;
    const totalSupply = 15;
    return {
      name,
      symbol,
      decimals,
      totalSupply,
    };
  };

  return (
    <div className="flex flex-col">
      <button className="btn">
        {data?.name}
        <div className="ml-2 badge">{data?.symbol}</div>
        <div className="ml-2 badge badge-info">{data?.decimals}</div>
      </button>

      <div className="shadow stats">
        <div className="stat">
          <div className="stat-title">Total Supply</div>
          <div className="stat-value">
            {formatUnits(data?.totalSupply ?? 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

async function requestAccount() {
  if (window.ethereum?.request)
    return window.ethereum.request({ method: "eth_requestAccounts" });

  throw new Error(
    "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
  );
}

const ICOToken = ({ crowdsaleAddress }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [availableForSale, setAvailableForSale] = useState("0");
  const [price, setPrice] = useState("0");
  const [closingTime, setClosingTime] = useState("0");
  const [amount, setAmount] = useState(1);

  const account = "";
  // fetch crowdsale token info
  const fetchCrowdsaleTokenInfo = () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum || providerUrl
    );
    const contract = new ethers.Contract(
      crowdsaleAddress,
      ITManTokenCrowdsaleArtifacts.abi,
      provider
    );
    contract.token().then(setTokenAddress).catch();
    contract
      .remainingTokens()
      .then((total) => setAvailableForSale(BigNumber.from(total).toString()))
      .catch();
    contract
      .rate()
      .then((rate) => setPrice(BigNumber.from(rate).toString()))
      .catch();
    contract
      .closingTime()
      .then((time) => setClosingTime(BigNumber.from(time).toString()))
      .catch();
  };
  useEffect(() => {
    try {
      fetchCrowdsaleTokenInfo();
    } catch (error) {}
  });

  // buy token base on quantity
  const buyTokens = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum || providerUrl
    );
    const signer = provider.getSigner();
    try {
      if (!account) {
        await requestAccount();
        return;
      }
      const txPrams = {
        to: crowdsaleAddress,
        value: ethers.BigNumber.from(parseEther(String(1 / Number(price)))).mul(
          amount
        ),
        gasLimit: 5000000,
      };

      const transaction = await signer.sendTransaction(txPrams);
      toast.promise(transaction.wait(), {
        loading: `Transaction submitted. Wait for confirmation...`,
        success: <b>Transaction confirmed!</b>,
        error: <b>Transaction failed!.</b>,
      });

      // refetch total token after processing
      transaction
        .wait()
        .then(() => fetchCrowdsaleTokenInfo())
        .catch();
    } catch (error) {}
  };

  const totalCost = (1 / Number(price)) * amount;
  return (
    <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
      <>
        <div className="alert">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff5722"
              className="w-6 h-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <label>Please connect to the Ropsten testnet for testing.</label>
          </div>
        </div>
        <div className="divider"></div>
      </>

      <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200">
        <TokenInfo tokenAddress={tokenAddress} />

        <div className="text-center shadow-2xl card">
          <div className="card-body">
            <h2 className="card-title">ITMan Token</h2>
            {Number(closingTime) > 0 && (
              <div className="alert">
                <div className="flex-1">
                  Closing time
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#2196f3"
                    className="w-6 h-6 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <label>
                    {new Date(Number(closingTime) * 1000).toLocaleString()}
                  </label>
                </div>
              </div>
            )}
            <div className="shadow stats">
              <div className="stat">
                <div className="stat-title">Available for sale</div>
                <div className="stat-value">
                  {formatUnits(availableForSale, "ether")}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Price</div>
                <div className="stat-value">
                  {formatUnits(price, "wei")} Wei
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Order Quantity</div>
                <div className="stat-value">{amount}</div>
              </div>
            </div>

            <input
              type="range"
              max="1000"
              value={amount}
              onChange={(evt) => setAmount(evt.target.valueAsNumber)}
              className="range range-accent"
            />
            <div>
              <div className="justify-center card-actions">
                <button
                  onClick={buyTokens}
                  type="button"
                  className="btn btn-outline btn-accent"
                >
                  Buy Now
                </button>
              </div>
              <div className="badge badge-md">Total: {totalCost} ETH</div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="items-center justify-center max-w-2xl px-4 py-4 mx-auto text-xl border-orange-500 lg:flex md:flex">
          <div className="p-2 font-semibold">
            <a
              href={`https://ropsten.etherscan.io/address/${tokenAddress}`}
              target="_blank"
              className="px-4 py-1 ml-2 text-white bg-orange-500 rounded-full shadow focus:outline-none"
              rel="noreferrer"
            >
              View Token on Etherscan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOToken;
