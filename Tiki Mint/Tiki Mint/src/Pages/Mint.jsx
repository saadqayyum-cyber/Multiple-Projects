import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  discord,
  minus,
  plus,
  twitter,
  volumeOff,
  volumeUp,
} from "../Base/SVG";
import { BlockchainContext } from "../Context/BlockchainContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CONTRACT_ADDRESS } from "../Config/config";

export default function Mint() {
  const {
    connectWallet,
    disconnectWallet,
    currentSignerAddress,
    mint,
    totalSupply,
  } = useContext(BlockchainContext);

  const MySwal = withReactContent(Swal);

  const [isPlaying, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("form");
  const [count, setCount] = useState(1);
  const [error, setError] = useState(true);
  const audio = useRef(null);
  const [popup, setPopup] = useState(false);
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const [tx, setTxHash] = useState(null);
  const [tokenNumber, setTokenNumber] = useState();
  const submit = async () => {
    if (count >= 1) {
      setLoading(true);
      const response = await mint({ amount: count });
      // After Minting Successfull
      if (response.status === "OK") {
        setTxHash(response.tx);
        setTokenNumber(+response.tokenNumber);
        setError(false);
        setTab("success");
      } else {
        MySwal.fire({
          title: <strong>Oops</strong>,
          html: <i>{response.message}</i>,
          icon: "error",
        });

        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (audio.current && isPlaying) {
      audio.current.play();
      audio.current.muted = false;
    } else {
      //   audio.current.pause();
      audio.current.muted = true;
    }
  }, [audio, isPlaying]);
  const price = 0.4;
  useEffect(() => {
    setTimeout(() => setPopup(true), 500);
  }, []);

  const soundOn = () => {
    setPopup(false);
    setPlaying(true);
  };
  const soundOff = () => {
    setPopup(false);
    setPlaying(false);
  };
  return (
    <>
      <div className={`popup ${popup ? "active" : ""}`}>
        <div className="popup__inner">
          <h4>Sound Auto Play has been blocked by your browser.</h4>
          <p className="sm">
            Allow Sound Auto Play?
            <button onClick={soundOn} type="button">
              Yes
            </button>
            <button onClick={soundOff} type="button">
              No
            </button>
          </p>
        </div>
      </div>
      <div className="mint">
        <div className="mint__bg">
          <img
            src={process.env.PUBLIC_URL + "/images/mintBg.jpg"}
            alt="mintBg"
          />
        </div>
        <div className="mint__inner">
          <div className="mint__header">
            <a href="https://www.tikiisland.io" className="mint__header-link">
              Back To The Island
            </a>
          </div>

          <div className="mintWin">
            <div className="mintWin__inner">
              <div className="speaker" onClick={() => setPlaying(!isPlaying)}>
                {isPlaying ? (
                  <span className="on">{volumeUp}</span>
                ) : (
                  <span className="off">{volumeOff}</span>
                )}
              </div>
              <audio ref={audio} autoPlay="autoplay" loop={true} muted={true}>
                <source
                  src={process.env.PUBLIC_URL + "/blue_hawaii.mp3"}
                  type="audio/mp3"
                />
              </audio>
              <Link
                to="/"
                className="mintWin__inner-logo  wow animate__fadeInUp"
                data-wow-duration=".6s"
                data-wow-delay=".2s"
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/logo.png"}
                  alt="logo"
                />
              </Link>
              <h2
                className="  wow animate__fadeInUp"
                data-wow-duration=".6s"
                data-wow-delay=".3s"
              >
                Tiki Island Mint
              </h2>
              <h3
                className="  wow animate__fadeInUp"
                data-wow-duration=".6s"
                data-wow-delay=".4s"
              >
                Your story awaits
              </h3>
              {tab === "form" && (
                <div
                  className="mintWin__form  wow animate__fadeIn"
                  data-wow-duration=".6s"
                  data-wow-delay=".6s"
                >
                  <div className="mintWin__row">
                    <button
                      type="button"
                      className="mintWin__btn minus"
                      onClick={decrement}
                    >
                      {minus}
                    </button>
                    <div className="mintWin__input">
                      <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="mintWin__btn plus"
                      onClick={increment}
                    >
                      {plus}
                    </button>
                  </div>
                  <p className="sm">
                    {count} Tiki costs {(count * price).toFixed(1)} ETH + gas
                  </p>
                  {!currentSignerAddress ? (
                    <button
                      disabled={count === 0}
                      className="mintWin__submit"
                      type="button"
                      onClick={connectWallet}
                    >
                      CONNECT WALLET
                    </button>
                  ) : (
                    <button
                      disabled={count === 0}
                      className="mintWin__submit"
                      type="button"
                      onClick={submit}
                    >
                      {!loading ? (
                        "MINT NFT"
                      ) : (
                        <div className="lds-facebook">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      )}
                      {!loading ? (
                        ""
                      ) : (
                        <p className="sm error uniq">
                          Please be patient while your transaction is
                          processing!
                        </p>
                      )}
                    </button>
                  )}

                  <p className="sm">
                    Total Minted {totalSupply.toString()}/10,000
                  </p>
                  <a
                    href="https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d#code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contract__link"
                  >
                    Contract
                  </a>
                </div>
              )}
              {tab === "success" && (
                <div className="mintWin__success">
                  <h2 className="uniq">Transaction Success</h2>
                  <p className="sm">Welcome to the Ohana</p>
                  <div className="mintWin__success-socials">
                    <p className="sm">Follow us!</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://discord.gg/2pUHSptBvj"
                      className="mintWin__success-social"
                    >
                      {discord}
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/Tikiisland_io"
                      className="mintWin__success-social"
                    >
                      {twitter}
                    </a>
                  </div>
                  <p className="sm">
                    Vist OpenSea to view & interact with your Tiki!
                  </p>
                  <div className="mintWin__success-btns">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://testnets.opensea.io/assets/rinkeby/${CONTRACT_ADDRESS}/${tokenNumber}`}
                      className="mintWin__open"
                    >
                      <span>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/openBlue.png"
                          }
                          alt="openBlue"
                        />
                      </span>
                      OpenSea
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://rinkeby.etherscan.io/tx/${tx}`}
                      className="mintWin__open"
                    >
                      <span>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/etherscan.svg"
                          }
                          alt="etherscan"
                        />
                      </span>
                      Etherscan
                    </a>
                  </div>
                </div>
              )}

              <a
                href="https://TikiIsland.io/tos/"
                target="_blank"
                rel="noopener noreferrer"
                className="mintWin__link"
              >
                Terms of sale
              </a>
            </div>
          </div>
        </div>

        <div className="mint__footer">
          <div className="mint__footer-powered">Tiki Island LLC</div>
          <div className="mint__footer-powered">
            Powered By:
            <a
              href="https://NFTLand.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NFT Land
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
