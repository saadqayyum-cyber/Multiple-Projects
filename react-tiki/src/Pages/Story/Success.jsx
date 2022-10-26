import React from "react";
import { useParams } from "react-router-dom";

export default function Success() {
  const { id } = useParams();
  return (
    <>
      <h1 className="general">WOW What A Great Story!</h1>
      <div className="story__inner">
        <div className="story__inner-frame">
          <div
            className="story__inner-box wow animate__fadeIn"
            data-wow-duration=".6s"
            data-wow-delay=".2s"
          >
            <iframe
              src={`https://nft.tikiisland.io/?id=${id}&display=3`}
              frameBorder="0"
            ></iframe>
          </div>
          <div
            className="story__inner-name wow animate__fadeIn"
            data-wow-duration=".6s"
            data-wow-delay=".4s"
          >
            Tiki {id}
          </div>
        </div>
        <div className="story__inner-content">
          <div className="story__inner-success">
            <h3
              className=" wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".1s"
            >
              Success
            </h3>
            <p
              className=" wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".2s"
            >
              Your story has been added to your Tiki #{id}!
            </p>
            <p
              className=" wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".3s"
            >
              We look forward to reading what great story’s you have added.
            </p>
            <p
              className=" wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".4s"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p>
            <div className="story__inner-success-btns">
              <a
                href="#"
                className="button uniq wow animate__fadeInLeft"
                data-wow-duration=".6s"
                data-wow-delay=".5s"
              >
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icons/chipset.png"}
                    alt="chipset"
                  />
                </span>
                Carve More
              </a>
              <a
                href="#"
                className="button uniq wow animate__fadeInRight"
                data-wow-duration=".6s"
                data-wow-delay=".5s"
              >
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icons/openBlue.png"}
                    alt="openSea"
                  />
                </span>
                Open Sea
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
