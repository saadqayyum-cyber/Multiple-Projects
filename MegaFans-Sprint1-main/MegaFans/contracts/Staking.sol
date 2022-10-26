// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IStake.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Staking is IStake {
    using Counters for Counters.Counter;
    Counters.Counter private stakeIdCounter;

    IERC721 stakingNftContract;

    mapping(uint256 => IStake.Stake) public stakes;

    constructor(address _stakingNftContract) {
        stakingNftContract = IERC721(_stakingNftContract);
    }

    function stake(uint256 _tokenId) public override {
        // Approve this contract the tokenId to stake

        // Transfer staking token from msg.sender to this contract
        stakingNftContract.transferFrom(msg.sender, address(this), _tokenId);

        stakeIdCounter.increment();
        uint256 currentStakeId = stakeIdCounter.current();

        stakes[currentStakeId] = IStake.Stake({
            stakeId: currentStakeId,
            stakeOwner: msg.sender,
            stakeTokenId: _tokenId,
            timestamp: block.timestamp
        });

        emit NFTStake(currentStakeId, address(this), msg.sender, _tokenId);
    }

    function unStake(uint256 _stakeId) public override {
        // Get Token Id from Stake Id
        address stakeOwner = stakes[_stakeId].stakeOwner;
        uint256 tokenId = stakes[_stakeId].stakeTokenId;

        // Check if the unStaker is original owner of token
        require(
            msg.sender == stakeOwner,
            "Stake: You are unstaking wrong token!"
        );

        // Release the token
        stakingNftContract.transferFrom(address(this), msg.sender, tokenId);

        // Remove staking id
        delete stakes[_stakeId];

        emit NFTUnstake(_stakeId, address(this), msg.sender, tokenId);
    }
}
