import Home from "./Components/Home";
import * as anchor from "@project-serum/anchor";
import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Get Candy Machine ID (Get Pubkey from Base58)
const getCandyMachineId = () => {
  try {
    return new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID);
  } catch (e) {
    console.log("Failed to construct CandyMachineID", e);
    return undefined;
  }
};

// CANDY MACHINE ID
const candyMachineId = getCandyMachineId();
// SOLANA NETWORK IDENTIFIER - (devnet, mainnet, testnet)
const network = process.env.REACT_APP_SOLANA_NETWORK;
// SOLANA RPC HOST (PROVIDER)
const rpcHost = process.env.REACT_APP_RPC_HOST;

// Constrct Connection (From RPC_HOST URL, If Custom RPC_URL not available,
// use default devnet (https://api.devnet.solana.com))
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl(network)
);

function App() {
  // Get Endpoint as Memo, So it doesn't recalculated on every re-render
  // clusterApiUrl("devnet") --> https://api.devnet.solana.com
  const endPoint = useMemo(() => anchor.web3.clusterApiUrl(network), []);

  // Initialize Wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Home
            candymachineId={candyMachineId}
            connection={connection}
            rpcHost={rpcHost}
            txTimeout={60000}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
