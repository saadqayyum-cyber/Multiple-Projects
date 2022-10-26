import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../Context/BlockchainContext";

export default function Index() {
  const { connectWallet, currentSignerAddress, balance } =
    useContext(BlockchainContext);

  return (
    <section className="intro">
      <div className="auto__container">
        <div className="intro__inner">
          <div className="intro__inner-content">
            <h1
              className=" wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".2s"
            >
              Carve your story in to the history books
            </h1>
            <div
              className="button connect wow animate__fadeIn cursor"
              data-wow-duration=".6s"
              data-wow-delay=".4s"
              onClick={connectWallet}
            >
              <span>
                <img
                  src={process.env.PUBLIC_URL + "/images/icons/metamask.png"}
                  alt="metamask"
                />
              </span>
              Connect wallet
            </div>
          </div>
          <div
            className="intro__inner-image  wow animate__fadeIn"
            data-wow-duration=".6s"
            data-wow-delay=".6s"
          >
            <img
              src={process.env.PUBLIC_URL + "/images/chisel-tools.png"}
              alt="chisel"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
