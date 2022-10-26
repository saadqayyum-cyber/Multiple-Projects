# MegaFans 

This project demonstrates the functionality of smart contracts

These are the main contracts
  1) NFT contract
  2) Staking contract
  3) ClaimReward contract
  4) SignatureVerification contract
  5) ERC20 Token
  6) Backend Nodejs Voucher Generation Script

## 1 -NFT Contract (auxiliary/NFT.sol)
   NFT contract is complete ERC721 Token contract. Tokens issued from this contract can be staked
   
## 2- Staking Contract (Staking.sol)
   Staking contract stakes the user NFT and unstakes the NFT whenever user wants
   
## 3- Voucher Generation (backend/app.js)
   Nodejs script generates the voucher for claiming reward. Admin will create a voucher specific to a staking id and signs the voucher with its private key.
   Now this has become secured with cryptography and it is immutable. If a malicious person modify the voucher on the fly, it will become invalid
   
## 4- ClaimReward Contract (ClaimReward.sol)
   User will invoke claim method of this contract to get reward. He has to pass a voucher info with the signature which was generated from backend while signing.
   If there is even 1 letter or 1 space modification, the voucher will become invalid and user cannot claim reward. If signature is valid, user will be rewarded     with new ERC20 Governance tokens. The amount of the reward is encapsulated inside voucher
   
## 5- Signature Verification (helpers/SignatureVerification.sol)
   This contract uses EIP712 to verify the signature by calculating different hashes based on signature.
   
## 6- ERC20 Token (Integrated in ClaimReward contract)
   In ClaimReward contract, there is also a new ERC20 Token that will be rewarded to claimer
