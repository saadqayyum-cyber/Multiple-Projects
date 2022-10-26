import React, { useContext } from "react";
import { BlockchainContext } from "../../Context/BlockchainContext";
import TikiItem from "./TikiItem";
import { TikiModul } from "./TikiModul";

export default function Tiki() {
  const { tokenData } = useContext(BlockchainContext);
  return (
    <>
      <div className="bg"></div>

      <section className="collection wrapper">
        <div className="auto__container">
          <div className="collection__inner">
            <h1
              className="general wow animate__fadeInUp"
              data-wow-duration=".6s"
              data-wow-delay=".2s"
            >
              Select Your Tiki Below To Carve Your Story In To The History Books
            </h1>
            <div
              className="collection__inner-row wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".4s"
            >
              {tokenData &&
                tokenData.tokenIds &&
                tokenData.tokenIds.map((tokenId, i) => {
                  return <TikiItem key={tokenId} id={tokenId} />;
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
