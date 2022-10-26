const hre = require("hardhat");

const REWARDER = "0x836355ba245BeB50421D298DfE2eFd551FEed4c9";
const NftContract = "0x3494d5F4B4B27935AabB5Fa8FC141aBB458715B7";

async function main() {
  const ClaimReward = await hre.ethers.getContractFactory("ClaimReward");
  const claimReward = await ClaimReward.deploy(REWARDER, NftContract);

  await claimReward.deployed();

  console.log("ClaimReward deployed to:", claimReward.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
