import React from "react";
import pizza from "../img/pizza.jpg";
import cardData from "./CardData";

const Card = () => {
  return (
    <div className="cards row">
      {cardData.map((item, i) => {
        return (
          <>
            <div key={i} className="col-xxl-3 col-md-4 col-6 card-single">
            <div className="box">
              <img src={pizza} alt="" />
            </div>
            <div className="content">
              <span>{item.name}</span>
              <span>Price:   {item.price}</span>
              <button>Buy</button>
            </div>
            </div>
          </>
        );
      })}

      {/* <div className="col-xxl-3 col-md-4 col-6 card-single">
    <div className="box"></div>
        <div className="content">
            <span>Name</span>
            <span>Price:500 GEM</span>
            <button>Buy</button>
        </div>
    </div>
    <div className="col-xxl-3 col-md-4 col-6 card-single">
    <div className="box"></div>
        <div className="content">
            <span>Name</span>
            <span>Price:500 GEM</span>
            <button>Buy</button>
        </div>
    </div>
    <div className="col-xxl-3 col-md-4 col-6 card-single">
    <div className="box"></div>
        <div className="content">
            <span>Name</span>
            <span>Price:500 GEM</span>
            <button>Buy</button>
        </div>
    </div> */}
    </div>
  );
};

export default Card;
