// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

library LibPart {
    bytes32 public constant TYPE_HASH = keccak256("Part(address account,uint96 value)");

    struct Part {
        address payable account;
        uint96 value;
    }

    function hash(Part memory part) internal pure returns (bytes32) {
        return keccak256(abi.encode(TYPE_HASH, part.account, part.value));
    }
}

contract TokenContract is ERC721URIStorage, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    /// please note that tokenId starts from 0
    Counters.Counter private _tokenIdCounter;

    /// @dev stores metadata URI of the token
    string private baseURI;

    /// @dev stores hidden metadata URI used before reveal
    string private hiddenURI;

    /// @dev stores if the nft metadata is revealed or not - initialized to false by default 
    bool revealed;
    /// @dev stores if the public sale is active or not - initialized to false by default 
    bool saleIsActive;

    /// variable to store the mint price
    /// @notice price should be specified in smallest unit of the native token of the deployed blockchain (eg: ether(should specify in wei) for ethereum)
    uint256 public mintPrice;
    /// variable to store the max supply for the tokens
    uint256 maxSupply;

    uint256 public whitelistMintLimit;
    uint256 public publicMintLimit;

    address payable royaltiesRecipientAddress;
    uint96 percentageBasisPoints;

    address payable teamPaymentSplitterAddress;

    address[] public whitelistedAddresses;

    bool safeMintIsDisabled;
    bool reserveTokensIsDisabled;

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    bytes4 constant _INTERFACE_ID_ROYALTIES = 0xcad96cca;

    /// baseURI and hiddenURI should be of the form ipfs://CID/
    constructor(string memory _name, string memory _symbol, string memory _baseURI, string memory _hiddenURI,  uint256 _mintPrice, uint256 _maxSupply, uint256 _whitelistMintLimit, uint256 _publicMintLimit, address payable _teamPaymentSplitterAddress, address payable _royaltyRecipient, uint96 _royaltyPercentageBasisPoints) ERC721(_name, _symbol) {
        maxSupply = _maxSupply;
        setBaseURI(_baseURI);
        setHiddenURI(_hiddenURI);
        setMintPrice(_mintPrice);
        setWhitelistMintLimit(_whitelistMintLimit);
        setPublicMintLimit(_publicMintLimit);
        setTeamPaymentSplitterAddress(_teamPaymentSplitterAddress);
        setRoyalties(_royaltyRecipient, _royaltyPercentageBasisPoints);
    }

    // the following function allows only the owner to mint NFTs to the specified address (Useful for airdrops)
    function safeMint(address to, uint amount, string[] memory uris) public onlyOwner {
        require(!safeMintIsDisabled, "safe mint is disabled");
        require(amount==uris.length, "length of uris doesnot match amount specified");

        uint256 tokenId;
        for (uint i = 0; i < amount; i++) {
            tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);
        }
    }

    /// function that allows the owner to reserve some tokens to the communityWallet
    function reserveTokens(address communityWallet, uint amount) public onlyOwner {
        require(!reserveTokensIsDisabled, "token reservation is disabled");

        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId+amount<=maxSupply, "exceeds max supply");

        for (uint i = 0; i < amount; i++) {
            _tokenIdCounter.increment();
            _safeMint(communityWallet, tokenId);
            tokenId = _tokenIdCounter.current();
        }
    }

    // kill switch for safe mint function
    function killSwitchSafeMint() external onlyOwner {
        safeMintIsDisabled = true;
    }

    // kill switch for reserve tokens function
    function killSwitchReserveTokens() external onlyOwner {
        reserveTokensIsDisabled = true;
    }

    // function to mint tokens by whitelisted addresses
    function mint(uint amount) public payable {
        require(isWhitelisted(msg.sender), "caller is not whitelisted");
        require(balanceOf(msg.sender)+amount<=whitelistMintLimit, "Exceeds mint limit per address");
        require(msg.value == mintPrice*amount, "Value doesnot match with mint price");

        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId+amount<=maxSupply, "Exceeds max supply");

        for (uint i = 0; i < amount; i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenId = _tokenIdCounter.current();
        }
    }

    /// the following function allows the users to mint an NFT by paying the mint price
    function publicMint(uint amount) public payable {
        require(saleIsActive, "Sale must be active to mint tokens");
        require(balanceOf(msg.sender)+amount<=publicMintLimit, "Exceeds mint limit per address");
        require(msg.value == mintPrice*amount, "Value doesnot match with mint price");

        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId+amount<=maxSupply, "Exceeds max supply");

        for (uint i = 0; i < amount; i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenId = _tokenIdCounter.current();
        }
    }

    // function to check if an address is whitelisted
    function isWhitelisted(address _user) public view returns (bool) {
        for (uint i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    /// Pause sale if active, make active if paused
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    /// function to set/update the mint price
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    /// function to set/update the uri of the metadata (format: ipfs://CID/)
    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    /// function to set/update the hidden uri (format: ipfs://CID)
    function setHiddenURI(string memory _hiddenURI) public onlyOwner {
        hiddenURI = _hiddenURI;
    }

    /// function to set/update the whitelistMintLimit
    function setWhitelistMintLimit(uint256 _newWhitelistMintLimit) public onlyOwner {
        whitelistMintLimit = _newWhitelistMintLimit;
    }

    /// function to set/update the publicMintLimit
    function setPublicMintLimit(uint256 _newPublicMintLimit) public onlyOwner {
        publicMintLimit = _newPublicMintLimit;
    }

    /// function to set/update the teamPaymentSplitterAddress
    function setTeamPaymentSplitterAddress(address payable _newTeamPaymentSplitterAddress) public onlyOwner {
        teamPaymentSplitterAddress = _newTeamPaymentSplitterAddress;
    }

    /// the following function returns metadata uri for the given tokenId (format: ipfs://CID/tokenId.json)
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    /// please note that tokenId starts from 0
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        if(!revealed){
            return hiddenURI;
        } else {
            if(tokenId<maxSupply) {
                return string(
                    abi.encodePacked(
                        baseURI,
                        Strings.toString(tokenId),
                        ".json"
                ));
            } else {
                return super.tokenURI(tokenId);
            }
        }
    }

    /// function to reveal the actual metadata once the mint phase is over
    function reveal() public onlyOwner {
        revealed = true;
    }

    //configure royalties
    function setRoyalties(address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        royaltiesRecipientAddress = _royaltiesRecipientAddress;
        percentageBasisPoints = _percentageBasisPoints;
    }

    // royalties using the ERC2981 standard
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        return (royaltiesRecipientAddress, (_salePrice * percentageBasisPoints) / 10000);
    }

    // royalties for rarible
    function getRaribleV2Royalties(uint256 id) external view returns (LibPart.Part[] memory) {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = percentageBasisPoints;
        _royalties[0].account = royaltiesRecipientAddress;
        return _royalties;
    }

    // function to update the whitelist - pass in the new whitelist as argument
    function whitelistUsers(address[] calldata _users) public onlyOwner {
        delete whitelistedAddresses;
        whitelistedAddresses = _users;
    }

    /// Get Tokens owned by user
    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);

        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        if(interfaceId == _INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if(interfaceId == _INTERFACE_ID_ERC2981) {
          return true;
        }

        return super.supportsInterface(interfaceId);
    }

    /// function to withdraw the specified amount from the contract
    function withdrawToTeam(uint amount) public onlyOwner {
        uint balance = address(this).balance;
        require(amount <= balance, "Not enough balance to withdraw the specified amount");
        teamPaymentSplitterAddress.transfer(amount);
    }

    /// function to withdraw the specified amount from the contract
    function withdraw(address payable recipient, uint amount) public onlyOwner {
        uint balance = address(this).balance;
        require(amount <= balance, "Not enough balance to withdraw the specified amount");
        recipient.transfer(amount);
    }
}
