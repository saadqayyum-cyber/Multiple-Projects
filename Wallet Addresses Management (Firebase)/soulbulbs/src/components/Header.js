import { useContext, useState } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { BlockchainContext } from "../context/BlockchainContext";

export const Header = () => {
  const { connectWallet, currentSignerAddress } = useContext(BlockchainContext);

  return (
    <header className="flex justify-between items-start px-16 md:px-32 pt-4">
      <div>
        <Logo className="invert" strokeWidth={10} width={50} height={50}></Logo>
      </div>

      {/* Button */}
      <div className="flex justify-center items-center space-x-2">
        {!currentSignerAddress ? (
          <button className="mintBtn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="mintBtn mt-5">
            Connected{" "}
            {currentSignerAddress.toString().slice(0, 9) +
              "......" +
              currentSignerAddress.toString().slice(-4)}
          </div>
        )}
      </div>
    </header>
  );
};
