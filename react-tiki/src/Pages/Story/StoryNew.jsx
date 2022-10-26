import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlockchainContext } from "../../Context/BlockchainContext";

const storyPrice = process.env.REACT_APP_STORY_PRICE;

export default function StoryNew() {
  const { id } = useParams();
  const { transferMoney, currentSignerAddress } = useContext(BlockchainContext);
  const navigate = useNavigate();

  const addStoryHandler = async () => {
    try {
      const tx = await transferMoney();
      await tx.wait();
      // Transfer Story Fee Successfull

      navigate("success");
    } catch (error) {
      // Transfer Story Fee Failed
      console.log();

      if (error.toString().includes("insufficient funds")) {
        alert("Insufficient Funds in your wallet.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="general">
        {storyPrice} ETH To Add Your Story To The History Books
      </h1>
      <div className="story__inner">
        <div className="story__inner-frame">
          <div
            className="story__inner-box wow animate__fadeIn"
            data-wow-duration=".6s"
            data-wow-delay=".2s"
          >
            <iframe
              src={`https://nft.tikiisland.io/?id=${id}`}
              frameBorder="0"
              title="ID"
            ></iframe>
          </div>
          <div
            className="story__inner-name wow animate__fadeIn"
            data-wow-duration=".6s"
            data-wow-delay=".4s"
          >
            Tiki #{id}
          </div>
        </div>
        <div className="story__inner-content">
          <form action="#" className="story__inner-form">
            <div
              className="input wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".1s"
            >
              <label htmlFor="">NAME</label>
              <input type="text" placeholder="John Dow" />
            </div>
            <div
              className="input wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".2s"
            >
              <label htmlFor="">Your Story</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="The Crazy Things I Have Seen…."
              ></textarea>
            </div>
            <div
              className="check wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".3s"
            >
              <input type="checkbox" />
              <label htmlFor="">
                Check to show my wallet address in my story. Do not check if you
                do not want to display it.
              </label>
            </div>
            <div
              className="check wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".4s"
            >
              <input type="checkbox" />
              <label htmlFor="">
                I understand and give full copyrights to the holder of the NFT,
                All commercial copyrights will be transferred to the owner /
                holder of the NFT.
              </label>
            </div>
            <div
              className="check wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".5s"
            >
              <input type="checkbox" />
              <label htmlFor="">
                Check your spelling and re read! Once you submit your story you
                can not edit it. I aggrege and confirm all the information above
                is correct and I am ready to submit.
              </label>
            </div>
            <div
              className="check wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".6s"
            >
              <input type="checkbox" />
              <label htmlFor="">
                I have read and agree to all of the{" "}
                <a href="">Teams & Conditions</a>
              </label>
            </div>
            <div
              onClick={addStoryHandler}
              className="button add wow animate__fadeIn"
              data-wow-duration=".6s"
              data-wow-delay=".7s"
            >
              ADD STORY
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
