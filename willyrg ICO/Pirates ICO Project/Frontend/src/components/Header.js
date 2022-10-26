import { BlockchainContext } from "../context/BlockchainContext";
import { useContext } from "react";

const Header = () => {
  const { currentSignerAddress, connectWallet } = useContext(BlockchainContext);

  function connectWalletHandler() {
    connectWallet();
  }

  return (
    <>
      <div class="test3">
        <a href="">
          {" "}
          <font size="10">
            {" "}
            <h1>PIRATES ICO</h1>
          </font>
        </a>
      </div>

      <div>
        {!currentSignerAddress ? (
          <button className="btn-load" onClick={connectWalletHandler}>
            Connect
          </button>
        ) : (
          <button className="btn-load">Connected</button>
        )}
      </div>

      <br></br>
      <br></br>
      <br></br>

      <hr
        color="black"
        noshade="noshade"
        size=""
        textAlign="center"
        text-decoration="none"
      />
    </>
  );
};

export default Header;
