import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../Context/BlockchainContext";

export default function Header({ addClass, connected = false }) {
  const { connectWallet, disconnectWallet, currentSignerAddress, balance } =
    useContext(BlockchainContext);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);
  const start = 50;
  const onScroll = () => {
    if (window.scrollY > start) {
      document.getElementById("header").classList.add("sticky");
    } else {
      document.getElementById("header").classList.remove("sticky");
    }
  };

  useEffect(() => {
    if (menu) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [menu]);
  var logo = document.querySelectorAll(".header__inner-logo");
  var button = document.querySelectorAll(".button");
  var link = document.querySelectorAll(".nav__inner-link");

  button.forEach((e) => {
    onButtonClick(e);
  });
  logo.forEach((e) => {
    onLogoClick(e);
  });
  link.forEach((e) => {
    onLinkClick(e);
  });
  function onButtonClick(btnItem) {
    btnItem.addEventListener("click", function () {
      setMenu(false);
      document.body.classList.remove("active");
    });
  }
  function onLogoClick(logoItem) {
    logoItem.addEventListener("click", function () {
      setMenu(false);
      document.body.classList.remove("active");
    });
  }
  function onLinkClick(linkItem) {
    linkItem.addEventListener("click", function () {
      setMenu(false);
      document.body.classList.remove("active");
    });
  }
  return (
    <header className={`header ${addClass ?? ""}`} id="header">
      <div className="auto__container">
        <div className="header__inner">
          <Link to={"/"} className="header__inner-logo">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </Link>
          <nav className={"nav " + (menu ? "active" : "")} id="menu">
            <div className="nav__inner">
              <div className="nav__inner-links">
                <Link to="/" className="nav__inner-link">
                  Home
                </Link>
                <Link to="/" className="nav__inner-link">
                  Tikki carving
                </Link>
              </div>
              {!currentSignerAddress && (
                <div className="button connect cursor" onClick={connectWallet}>
                  <span>
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/icons/metamask.png"
                      }
                      alt="metamask"
                    />
                  </span>
                  Connect wallet
                </div>
              )}
              {currentSignerAddress && (
                <div
                  className="button connected cursor"
                  onClick={disconnectWallet}
                >
                  {currentSignerAddress.substring(0, 7)}... {balance.toString()}{" "}
                  ETH
                </div>
              )}
            </div>
          </nav>
          <div
            className={"burger " + (menu ? "active" : "")}
            id="menuBtn"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
