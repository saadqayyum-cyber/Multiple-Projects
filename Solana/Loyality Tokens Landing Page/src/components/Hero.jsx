import React, { useState } from "react";
import "../css/hero.css";
import brut13 from "../img/brut13.png";
import horse from "../img/horse.png";
import brut10 from "../img/brut10.png";
import brut20 from "../img/brut20.png";
import brut23 from "../img/brut23.png";
import brut12 from "../img/brut12.png";
import brut7 from "../img/brut7.png";
import brut11 from "../img/brut11.png";
import brut8 from "../img/brut8.png";
import brut14 from "../img/brut14.png";
import brutRightTop from "../img/brutright.png";
import * as im from "react-icons/im";
import * as fa from "react-icons/fa";
import * as fi from "react-icons/fi";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Hero = () => {
  const wallet = useWallet();

  const [navbar, setNavbar] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleNavbar = () => {
    setToggle(!toggle);
  };
  return (
    <div className="hero">
      <div className="navbar">
        <div className="menu-btn" onClick={toggleNavbar}>
          <fa.FaBars />
        </div>
        <div className={toggle ? "navbar-toggle nav-items" : "nav-items"}>
          <div className="icons">
            <im.ImPhone />
            <fa.FaEnvelope className="envelop" />
            <fi.FiSend className="send" />
          </div>
          <ul>
            <li>Contact</li>
            <li>Mail</li>
            <li>Message</li>
          </ul>
          <div className="top-btn">
            {/* <button>Connect Wallet</button> */}
            {/* Wallet Connect Button */}
            {!wallet.publicKey ? (
              <WalletMultiButton className="top-btn">
                Connect Wallet
              </WalletMultiButton>
            ) : (
              <WalletMultiButton startIcon="" className="disconnect-wallet">
                {wallet.publicKey.toString().slice(0, 9) +
                  "......" +
                  wallet.publicKey.toString().slice(-4)}
              </WalletMultiButton>
            )}
          </div>
        </div>
      </div>
      <img src={brut13} className="brut13" alt="" />
      <img src={brut10} className="brut10" alt="" />
      <img src={horse} className="horse" alt="" />
      <img src={brutRightTop} className="brut-right-top" alt="" />
      <img src={brut20} className="brut20" alt="" />
      <img src={brut23} className="brut23" alt="" />
      <img src={brut7} className="brut7" alt="" />
      <img src={brut11} className="brut11" alt="" />
      <img src={brut8} className="brut8" alt="" />
      <img src={brut14} className="brut14" alt="" />

      {/* Center  */}
      <div className="center">
        <div className="top">
          <span>Loyalty Tokens</span>
          <span>For Your</span>
          <span>Motivation</span>
        </div>
        <div className="bottom">
          <span>
            Change it for <br /> everything you want
          </span>
          <img src={brut12} className="brut12" alt="" />
          {!wallet.publicKey ? (
            <WalletMultiButton>Connect Wallet</WalletMultiButton>
          ) : (
            <WalletMultiButton startIcon="" className="disconnect-wallet">
              {wallet.publicKey.toString().slice(0, 9) +
                "......" +
                wallet.publicKey.toString().slice(-4)}
            </WalletMultiButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
