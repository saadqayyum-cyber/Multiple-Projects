import React from "react";
import "../img/heart.png";
import brut20 from "../img/brut20.png";
import faqbottom from "../img/faqbottom.png";
import heart from "../img/heart.png";
import horse from "../img/horse.png";
import "../css/faq-section.css";

const FaqSection = () => {
  return (
    <div className="faq-container">
      <div className="heart">
        <div className="line"></div>
        <img src={heart} alt="" />
      </div>

      <div
        className="faqs accordion accordion-flush"
        id="accordionFlushExample"
      >
        <div className="inner accordion-item">
          <img src={brut20} alt="" />
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              What is a loyalty Program
            </button>
          </h2>
        </div>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            The loyalty campaign was created to reward company employees. We
            love and appreciate everyone, so we want to additionally reward you
            for your success and labor activity.
          </div>
        </div>
        <div className="inner accordion-item">
          <img src={brut20} alt="" />
          <h2 class="accordion-header" id="flush-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              How can I get loyalty tokens?
            </button>
          </h2>
        </div>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
          HR will acquaint you with a complete list of what loyalty tokens are credited for. This is to come to the work on time, meet the completion of all tasks on time, as well as for a special contribution to the success of the company.
          </div>
        </div>
        <div className="inner accordion-item">
          <img src={brut20} alt="" />
          <h2 class="accordion-header" id="flush-headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
             How can I spend my loyalty tokens?
            </button>
          </h2>
        </div>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
          You need to connect your crypto wallet on this website, select the products you like, add them to the cart and pay. After payment - go to HR to receive the goods.
          </div>
        </div>


      </div>

      <img src={faqbottom} className="faq-bottom" alt="" />
    </div>
  );
};

export default FaqSection;
