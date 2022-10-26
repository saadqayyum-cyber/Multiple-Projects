import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Opps({ setHeaderClass, setConnected }) {
  useEffect(() => {
    setHeaderClass("white");
    setConnected(true);
    return () => {
      setHeaderClass("");
      setConnected(false);
    };
  }, []);

  return (
    <section className="opps">
      <div className="opps__bg">
        <img
          src={process.env.PUBLIC_URL + "/images/volcano.png"}
          alt="volcano"
        />
      </div>
      <div className="auto__container">
        <div className="opps__inner">
          <div className="opps__inner-content">
            <h1
              className="opps__title wow animate__fadeInUp"
              data-wow-duration=".6s"
              data-wow-delay=".2s"
            >
              OOPs!!
            </h1>
            <h4
              className=" wow animate__fadeInUp"
              data-wow-duration=".6s"
              data-wow-delay=".3s"
            >
              Sorry we did not detect any tokens belonging to Tiki Island in
              your wallet please Mint or look on OpenSea to get one!
            </h4>
            <Link
              to="/collection"
              className="button open wow animate__fadeInUp"
              data-wow-duration=".6s"
              data-wow-delay=".4s"
            >
              <span>
                <img
                  src={process.env.PUBLIC_URL + "/images/icons/openSea.png"}
                  alt="openSea"
                />
              </span>
              Open Sea
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
