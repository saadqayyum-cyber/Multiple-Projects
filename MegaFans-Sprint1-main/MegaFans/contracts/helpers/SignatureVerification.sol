// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IClaim.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract SignatureVerification is AccessControl, EIP712 {
    bytes32 public constant REWARDER_ROLE = keccak256("REWARDER_ROLE");
    string private constant SIGNING_DOMAIN = "LazyMinting";
    string private constant SIGNATURE_VERSION = "1";

    constructor(address rewarder) 
    EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION)
    {
        _setupRole(REWARDER_ROLE, rewarder);
    }

    function verify(IClaim.Voucher memory voucher) internal view returns(address) {
    // make sure signature is valid and get the address of the signer
    address signer = _verify(voucher);

    // make sure that the signer is authorized to mint NFTs
    require(hasRole(REWARDER_ROLE, signer), "Signature invalid or unauthorized");

    return signer;
    }

    function _verify(IClaim.Voucher memory voucher) private view returns(address) {
        bytes32 digest = _hash(voucher);
        return ECDSA.recover(digest, voucher.signature);
    }

    function _hash(IClaim.Voucher memory voucher) private view returns(bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256("Voucher(uint256 stakeId,uint256 timestamp,uint256 rewardAmount)"),
            voucher.stakeId,
            voucher.timestamp,
            voucher.rewardAmount
        )));
    }


    // Helper Function for Voucher Generation Script
    function getChainID() external view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }
}