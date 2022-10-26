const ethers = require("ethers");
const abi = require("./abi.json");
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

const _generateVoucher = async (data) => {
  const voucher = new Voucher({ contract, signer });
  const voucherData = await voucher.createVoucher(
    data.stakeId,
    data.timestamp,
    data.rewardAmount
  );

  return voucherData;
};

const _claimVoucher = async (voucher) => {
  try {
    // CallStatic(
    const res = await contract.connect(redeemer).callStatic.claim(voucher);
    // Transaction
    const response = await contract.connect(redeemer).claim(voucher);
  } catch (error) {
    if (error.reason) {
      console.log("Revert Reason :", error.reason);
    } else {
      console.log(error);
    }
  }
};

module.exports = {
  _generateVoucher,
  _claimVoucher,
};
