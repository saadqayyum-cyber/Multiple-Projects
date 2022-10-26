import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

export const Main = () => {
  const { currentSignerAddress, addUser, found } =
    useContext(BlockchainContext);

  return (
    <main className="min-h-[85vh] flex justify-center items-center">
      {/* Connect Wallet State */}
      {!currentSignerAddress && (
        <h1 className="text-white fancy text-3xl uppercase p-4">
          <div className="flex-col justify-center items-center text-center">
            <div className="font-extrabold text-5xl">
              Lets Find are you on Project List or not?
            </div>{" "}
            <br></br> <div> Please Connect Wallet to get statred</div>
          </div>
        </h1>
      )}

      {currentSignerAddress && found && (
        <h1 className="text-white fancy text-3xl uppercase p-4">
          <div className="flex-col justify-center items-center text-center">
            <div className="font-extrabold text-5xl">Congratulations!</div>{" "}
            <br></br> <div> You are already on project list</div>
          </div>
        </h1>
      )}

      {currentSignerAddress && !found && (
        <h1 className="text-white fancy text-3xl uppercase p-4">
          <div className="flex-col justify-center items-center text-center">
            <div className="font-extrabold text-5xl">Oops!</div> <br></br>{" "}
            <div> You are not on project list</div>
            <button className="mintBtn mt-7" onClick={addUser}>
              Join Now
            </button>
          </div>
        </h1>
      )}
    </main>
  );
};
