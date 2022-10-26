import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Home = (props) => {
  const wallet = useWallet();

  return (
    <main className="min-h-screen bg-[#11061a]">
      {/* Header */}
      <header className="flex justify-center items-center p-10 text-white">
        <div
          className="space-y-5 flex flex-col justify-center items-center
                        md:flex-row md:justify-between md:items-center md:w-full"
        >
          <h1 className="text-3xl font-bold ">Solana NFT Frontend</h1>

          {/* Wallet Connect Button */}
          {!wallet.publicKey ? (
            <WalletMultiButton>Connect Wallet</WalletMultiButton>
          ) : (
            <WalletMultiButton startIcon="" className="disconnect-wallet">
              Wallet Connected{" "}
              {wallet.publicKey.toString().slice(0, 4) +
                ".." +
                wallet.publicKey.toString().slice(-4)}
            </WalletMultiButton>
          )}
        </div>
      </header>
    </main>
  );
};

export default Home;
