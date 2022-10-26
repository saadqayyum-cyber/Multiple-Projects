require("dotenv").config();
const ethers = require("ethers");
const abi = require("./abi.json");
const nftContractAbi = require("./nft-contract-abi.json");
const { Voucher } = require("./helpers/voucher");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_TESTNET_PROVIDER
);

const signer = new ethers.Wallet(process.env.SIGNER_PV_KEY, provider);
const redeemer = new ethers.Wallet(process.env.REDEEMER_PV_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  provider
);

const NftContract = new ethers.Contract(
  process.env.NFT_CONTRACT_ADDRESS,
  nftContractAbi,
  provider
);

const _NftStake = async () => {
  const tokenId = await NftContract.connect(redeemer).safeMint(
    redeemer.address,
    {
      gasLimit: 3000000,
    }
  );

  const tx = await NftContract.connect(redeemer).approve(
    process.env.CONTRACT_ADDRESS,
    1,
    {
      gasLimit: 3000000,
    }
  );

  const res = await contract.connect(redeemer).stake(1, {
    gasLimit: 3000000,
  });
};

const _unStake = async () => {
  const res = await contract.connect(redeemer).unStake(2, {
    gasLimit: 3000000,
  });
};

module.exports = {
  _NftStake,
  _unStake,
};
