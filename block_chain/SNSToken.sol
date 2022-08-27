//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SNSToken is ERC721Enumerable {
    constructor() ERC721("SNS_Feed", "SNS") {}

    struct SNSTokenData {
        uint256 tokenId;
        address tokenCreator;
        string value; //hash value of photo
        uint256 tokenPrice;
    }

    mapping(uint256 => SNSTokenData) public SNSTokenDataMap;

    //mint
    function mintSNSToken(string memory _value) public returns (uint256) {
        uint256 tokenId = totalSupply();
        SNSTokenDataMap[tokenId] = SNSTokenData(tokenId, msg.sender, _value, 0);
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

    //모든 토큰 정보 출력
    function getAllTokensInfo() public view returns (SNSTokenData[] memory) {
        uint256 totalLength = totalSupply();
        SNSTokenData[] memory SNSTokenDataArray = new SNSTokenData[](
            totalLength
        );
        for (uint256 i = 0; i < totalLength; i++) {
            SNSTokenDataArray[i] = getTokenInfoById(i);
        }
        return SNSTokenDataArray;
    }

    //index: token, value: owner
    function getAllTokensOwner() public view returns (address[] memory) {
        uint256 totalLength = totalSupply();
        address[] memory addressArray = new address[](totalLength);
        for (uint256 i = 0; i < totalLength; i++) {
            addressArray[i] = ownerOf(i);
        }
        return addressArray;
    }

    //특정 사용자 토큰들 출력
    function getTokensInfoByAccount(address _account)
        public
        view
        returns (SNSTokenData[] memory)
    {
        uint256 balanceLength = balanceOf(_account);
        SNSTokenData[] memory SNSTokenDataArray = new SNSTokenData[](
            balanceLength
        );
        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 id = tokenOfOwnerByIndex(_account, i);
            SNSTokenDataArray[i] = getTokenInfoById(id);
        }
        return SNSTokenDataArray;
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
