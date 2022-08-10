//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintSNSToken is ERC721Enumerable {
    constructor() ERC721("SNS_Feed", "SNS") {}

    struct SNSTokenData {
        uint256 tokenId;
        string value; //hash value of photo
        uint256 tokenPrice;
    }

    mapping(uint256 => SNSTokenData) public SNSTokenDataMap;

    function mintAnimalToken(string memory _value) public {
        uint256 tokenId = totalSupply() + 1;
        SNSTokenDataMap[tokenId] = SNSTokenData(tokenId, _value, 0);
        _mint(msg.sender, tokenId);
    }

    function getTokenMapInfo(uint256 idx)
        public
        view
        returns (SNSTokenData memory)
    {
        return SNSTokenDataMap[idx];
    }
}
