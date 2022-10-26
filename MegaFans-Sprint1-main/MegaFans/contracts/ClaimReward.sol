// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IClaim.sol";
import "./Staking.sol";
import "./helpers/SignatureVerification.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClaimReward is IClaim, SignatureVerification, Staking, ERC20, Ownable {
    uint256 private constant MAX_SUPPLY = 10000 * 10**18;

    constructor(address _rewarder, address _stakingNftContract)
        Staking(_stakingNftContract)
        SignatureVerification(_rewarder)
        ERC20("GovernanceToken", "GT")
    {
        _mint(address(this), MAX_SUPPLY);
    }

    function claim(IClaim.Voucher memory voucher) public override {
        // Verify Signature
        address signer = verify(voucher);

        // Check Staking Owner
        require(
            stakes[voucher.stakeId].stakeOwner == msg.sender,
            "You Cannot Claim this Voucher!"
        );

        // Match Timestamp
        require(
            stakes[voucher.stakeId].timestamp == voucher.timestamp,
            "Voucher Expired!"
        );

        // Reward ERC20 Governance Tokens

        // transfer the token to the redeemer
        _transfer(address(this), msg.sender, voucher.rewardAmount);

        // Timestamp Update
        stakes[voucher.stakeId].timestamp = block.timestamp;

        // Emit Event
        emit Claim(voucher.stakeId, signer, msg.sender, voucher.rewardAmount);
    }
}
