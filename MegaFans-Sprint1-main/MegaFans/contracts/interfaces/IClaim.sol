// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IClaim {
    struct Voucher {
        uint256 stakeId;
        uint256 timestamp;
        uint256 rewardAmount;
        bytes signature;
    }

    function claim(Voucher memory voucher) external;

    event Claim(uint256 stakeId, address from, address to, uint256 amount);
}
