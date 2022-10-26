const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Voucher } = require("../scripts/voucher");

let owner, redeemer1, redeemer2, randomSigner, redeemers;
let nftContract, claimRewardContract;
beforeEach(async () => {
  [owner, redeemer1, redeemer2, randomSigner, ...redeemers] =
    await ethers.getSigners();
  // Deploy NFT Contract
  const NftContract = await ethers.getContractFactory("NFT");
  nftContract = await NftContract.deploy();
  await nftContract.deployed();

  // Deploy ClaimReward Contract
  const ClaimRewardContract = await ethers.getContractFactory("ClaimReward");
  claimRewardContract = await ClaimRewardContract.deploy(
    owner.address,
    nftContract.address
  );
  await claimRewardContract.deployed();
});

describe("Testcase 1 : Check if the smart contracts have been deployed successfully", () => {
  it("1.1. Is NFT Contract deployed successfully?", async () => {	
    expect(await nftContract.address).to.not.equal(
      ethers.constants.AddressZero
    );
  });

  it("1.2. Is ClaimReward Contract deployed sucessfully?", async () => {
    expect(await claimRewardContract.address).to.not.equal(
      ethers.constants.AddressZero
    );
  });
});

describe("Testcase 2 : Check if Staking and Unstaking functionality works", async () => {
  it("2.1. Is stake method stakes the token successfully?", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    expect(stakeId).to.equal(1);
    expect(stakeOwner).to.equal(redeemer1.address);
    expect(stakeTokenId).to.equal(0);
  });

  it("2.2. Is unStake method unStakes the token successfully?", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Unstake
    expect(await claimRewardContract.connect(redeemer1).unStake(1))
      .to.emit(claimRewardContract, "NFTUnstake")
      .withArgs(1, claimRewardContract.address, redeemer1.address, 0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    expect(stakeId).to.equal(0);
    expect(stakeOwner).to.equal(ethers.constants.AddressZero);
    expect(stakeTokenId).to.equal(0);
  });
});

describe("Testcase 3 : Check if voucher functionality works", () => {
  it("3.1. It should claim reward from a signed voucher", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    expect(await claimRewardContract.connect(redeemer1).claim(voucher))
      .to.emit(claimRewardContract, "Claim")
      .withArgs(
        voucher.stakeId,
        owner.address,
        redeemer1.address,
        voucher.rewardAmount
      );
  });

  it("3.2. It should fail to claim reward that's already been claimed", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    expect(await claimRewardContract.connect(redeemer1).claim(voucher))
      .to.emit(claimRewardContract, "Claim")
      .withArgs(
        voucher.stakeId,
        owner.address,
        redeemer1.address,
        voucher.rewardAmount
      );

    // Reclaim Voucher
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("Voucher Expired!");
  });

  it("3.3. It should fail to claim reward that's signed by an unauthorized account", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: randomSigner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("Signature invalid or unauthorized");
  });

  it("3.4. It should fail to claim reward from voucher that's been modified", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );
    voucher.rewardAmount = 100;

    // Claim Voucher
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("Signature invalid or unauthorized");
  });

  it("3.5. It should fail to claim reward with an invalid signature", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    const dummyData = ethers.utils.randomBytes(128);
    voucher.signature = await owner.signMessage(dummyData);

    // Claim Voucher
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("Signature invalid or unauthorized");
  });
});

describe("Testcase 4 : Check end to end functionality", () => {
  it("4.1. It should claim reward", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    expect(await claimRewardContract.connect(redeemer1).claim(voucher))
      .to.emit(claimRewardContract, "Claim")
      .withArgs(
        voucher.stakeId,
        owner.address,
        redeemer1.address,
        voucher.rewardAmount
      );
  });

  it("4.2. It should fail to claim reward without staking NFT", async () => {
    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(5, 54654545, 50);

    // Claim Voucher
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("You Cannot Claim this Voucher!");
  });

  it("4.3. It should fail to claim reward for stake id that sender don't owns", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    await expect(
      claimRewardContract.connect(redeemer2).claim(voucher)
    ).to.be.revertedWith("You Cannot Claim this Voucher!");
  });

  it("4.4. It should fail to claim reward after unstaking", async () => {
    // Mint Token
    expect(await nftContract.connect(redeemer1).safeMint(redeemer1.address))
      .to.emit(nftContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, redeemer1.address, 0);

    // Approve Minted Token to ClaimReward Contract
    await nftContract
      .connect(redeemer1)
      .approve(claimRewardContract.address, 0);

    // Stake Token
    await claimRewardContract.connect(redeemer1).stake(0);

    // Check Stakes Mapping
    let stakeId, stakeOwner, stakeTokenId, timestamp;
    [stakeId, stakeOwner, stakeTokenId, timestamp] =
      await claimRewardContract.stakes(1);

    const stake = {
      stakeId: stakeId.toNumber(),
      stakeOwner,
      stakeTokenId: stakeTokenId.toNumber(),
      timestamp: timestamp.toNumber(),
    };

    // Create a Voucher
    const voucherInstance = new Voucher({
      contract: claimRewardContract,
      signer: owner,
    });
    const voucher = await voucherInstance.createVoucher(
      stake.stakeId,
      stake.timestamp,
      50
    );

    // Claim Voucher
    expect(await claimRewardContract.connect(redeemer1).claim(voucher))
      .to.emit(claimRewardContract, "Claim")
      .withArgs(
        voucher.stakeId,
        owner.address,
        redeemer1.address,
        voucher.rewardAmount
      );

    // Unstake
    expect(await claimRewardContract.connect(redeemer1).unStake(1))
      .to.emit(claimRewardContract, "NFTUnstake")
      .withArgs(1, claimRewardContract.address, redeemer1.address, 0);

    // Claim Voucher after unstaking on same staking id
    await expect(
      claimRewardContract.connect(redeemer1).claim(voucher)
    ).to.be.revertedWith("You Cannot Claim this Voucher!");
  });
});
