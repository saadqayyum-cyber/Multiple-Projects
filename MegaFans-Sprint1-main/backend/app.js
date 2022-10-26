require("dotenv").config();
const fs = require("fs");
const generated_voucher = require("./output/generated-voucher.json");
const { _generateVoucher, _claimVoucher } = require("./generate-voucher");
const { _NftStake, _unStake } = require("./test-voucher");

const voucherData = {
  stakeId: 2,
  timestamp: 1643188643,
  rewardAmount: 50,
};

const GenerateVoucher = async () => {
  const _generatedVoucher = await _generateVoucher(voucherData);
  const writeableVoucher = JSON.stringify(_generatedVoucher);
  fs.writeFile(
    "output/generated-voucher.json",
    writeableVoucher,
    "utf8",
    () => {
      console.log("Generated Voucher saved successfully");
    }
  );
};

const ClaimVoucher = () => {
  _claimVoucher(generated_voucher);
};

/**
 * *----------------------------------------------------------------------------------------
 * *                                Main Functions
 * *----------------------------------------------------------------------------------------
 */

// GenerateVoucher();
ClaimVoucher();
// _NftStake();
// _unStake();
