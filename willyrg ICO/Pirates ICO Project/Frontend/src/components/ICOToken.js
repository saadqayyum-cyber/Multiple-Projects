import React, { useContext, useState } from "react";
import { formatUnits } from "@ethersproject/units";

import { BlockchainContext } from "../context/BlockchainContext";
import { ethers } from "ethers";
import Loader from "./Loader";

const TokenInfo = ({ data }) => {
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

const ICOToken = ({ crowdsaleAddress }) => {
  const { vofoData, vofoCrowdsaleData, buyToken, loading } =
    useContext(BlockchainContext);

  const [amount, setAmount] = useState(1);

  let totalCost = Number(vofoCrowdsaleData?.price) * amount;

  async function buyTokens() {
    buyToken({ amount: amount, price: vofoCrowdsaleData.price });
  }

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

            <label>Please connect to the Bsc Testnet.</label>
          </div>
        </div>
        <div className="divider"></div>
      </>

      <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200">
        <TokenInfo data={vofoData} />

        <div className="text-center shadow-2xl card">
          <div className="card-body">
            <h2 className="card-title">Pirates Token</h2>

            <div className="shadow stats flex flex-col md:flex-row justify-center items-center ">
              <div className="stat">
                <div className="stat-title">Available for sale</div>
                <div className="stat-value">
                  {vofoCrowdsaleData &&
                    formatUnits(vofoCrowdsaleData.availableForSale, "ether")}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Price</div>
                <div className="stat-value">
                  {vofoCrowdsaleData &&
                    Number(
                      ethers.utils.formatEther(vofoCrowdsaleData.price)
                    ).toFixed(5)}{" "}
                  {""}
                  ETHW
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Order Quantity</div>
                <div className="stat-value">{amount}</div>
              </div>
            </div>

            <input
              type="range"
              max="500"
              value={amount}
              onChange={(evt) => setAmount(evt.target.valueAsNumber)}
              className="range range-accent"
            />
            <div>
              {!loading ? (
                <div>
                  {" "}
                  <div className="justify-center card-actions">
                    <button
                      onClick={() => {
                        buyTokens();
                      }}
                      type="button"
                      className="btn btn-outline btn-accent"
                    >
                      Buy Now
                    </button>
                  </div>
                  <div className="badge badge-md">
                    Total: {totalCost / 10 ** 18} ETHW
                  </div>{" "}
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="items-center justify-center max-w-2xl px-4 py-4 mx-auto text-xl border-orange-500 lg:flex md:flex">
          <div className="p-2 font-semibold">
            <a
              href={`https://testnet.bscscan.com/address/${vofoCrowdsaleData?.tokenAddress}`}
              target="_blank"
              className="px-4 py-1 ml-2 text-white bg-orange-500 rounded-full shadow focus:outline-none"
              rel="noreferrer"
            >
              View Token on Explorer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOToken;
