// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract PiratesCrowdsale is Ownable {

    IERC20 private _token;
    uint256 _rate = 0.00666666666 ether;
    address _piratesTokenOwner;

    constructor(address piratesTokenAddress, address piratesTokenOwner) {
        _token = IERC20(piratesTokenAddress);
        _piratesTokenOwner = piratesTokenOwner;
        
    }

    function token() public view returns (IERC20) {
		return _token;
	}

	function rate() public view returns (uint256) {
		return _rate;
	}
    function remainingTokens() public view returns (uint256) {
		return
			Math.min(
				token().balanceOf(_piratesTokenOwner),
				token().allowance(_piratesTokenOwner, address(this))
			);
	}

	function buyTokens(uint256 amount) public payable {

		require(msg.value >= amount * rate(), "Insufficient Provided for Required Tokens");

		uint256 finalAmount = amount * 10**18;

		token().transferFrom(_piratesTokenOwner, msg.sender, finalAmount);
	}

	function withdraw() public payable onlyOwner {
      (bool main, ) = payable(owner()).call{value: address(this).balance}("");
      require(main);
     }


}