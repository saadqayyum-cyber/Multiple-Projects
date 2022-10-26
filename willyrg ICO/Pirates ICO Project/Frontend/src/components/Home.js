import Header from "./Header";
import Footer from "./Footer";
import { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import ICOToken from "./ICOToken";

const Home = () => {
  const { contract_1_NFTs, currentSignerAddress } =
    useContext(BlockchainContext);

  const crowdsaleAddress = "";
  return (
    <>
      <div className="wrapper min-h-screen">
        {/* Header */}
        <Header />
        <div className=""></div>
        {/* Main */}
        <main className="">
          <ICOToken crowdsaleAddress={crowdsaleAddress} />
        </main>
        {/* Footer */}
        <div className="h-[16px] w-[16px]"></div>
        <Footer />{" "}
      </div>
    </>
  );
};

export default Home;
