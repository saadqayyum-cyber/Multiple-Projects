// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStake {
    struct Stake {
        uint256 stakeId;
        address stakeOwner;
        uint256 stakeTokenId;
        uint256 timestamp;
    }

    function stake(uint256 _tokenId) external;

    function unStake(uint256 _stakeId) external;

    event NFTStake(uint256 stakeId, address from, address to, uint256 tokenId);

    event NFTUnstake(
        uint256 stakeId,
        address from,
        address to,
        uint256 tokenId
    );
}
