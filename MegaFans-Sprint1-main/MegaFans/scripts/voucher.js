const SIGNING_DOMAIN_NAME = "LazyMinting";
const SIGNING_DOMAIN_VERSION = "1";

class Voucher {
  constructor({ contract, signer }) {
    this.contract = contract;
    this.signer = signer;
  }

  async createVoucher(stakeId, timestamp, rewardAmount) {
    const voucher = { stakeId, timestamp, rewardAmount };
    const domain = await this._signingDomain();
    const types = {
      Voucher: [
        { name: "stakeId", type: "uint256" },
        { name: "timestamp", type: "uint256" },
        { name: "rewardAmount", type: "uint256" },
      ],
    };
    const signature = await this.signer._signTypedData(domain, types, voucher);
    return {
      ...voucher,
      signature,
    };
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    try {
      const chainId = await this.contract.getChainID();
    } catch (err) {
      console.log("error in getting chainid", err);
    }
    const chainId = await this.contract.getChainID();
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
    };

    return this._domain;
  }
}

module.exports = {
  Voucher,
};
