//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SNSToken is ERC721Enumerable {
    constructor() ERC721("SNS_Feed", "SNS") {}

    struct SNSTokenData {
        uint256 tokenId;
        string value; //hash value of photo
        uint256 tokenPrice;
    }

    mapping(uint256 => SNSTokenData) public SNSTokenDataMap;

    //mint
    function mintSNSToken(string memory _value) public returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        SNSTokenDataMap[tokenId] = SNSTokenData(tokenId, _value, 0);
        _mint(msg.sender, tokenId);
        return tokenId;
    }

    //토큰 정보 확인
    function getTokenInfoById(uint256 id)
        public
        view
        returns (SNSTokenData memory)
    {
        return SNSTokenDataMap[id];
    }

    //price getter
    function getTokenPrice(uint256 id) public view returns (uint256) {
        return getTokenInfoById(id).tokenPrice;
    }

    //price setter
    function setTokenPrice(uint256 id, uint256 new_price) public {
        SNSTokenDataMap[id].tokenPrice = new_price;
    }
}
