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

    //판매등록
    function sellToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = ownerOf(_tokenId);

        //주인이 맞는 지 확인
        require(tokenOwner == msg.sender, "C`ller is not token owner.");
        //유효한 가격인지 확인
        require(_price > 0, "Price is not valid");
        //이미 판매중인 토큰인지 확인
        require(
            SNSTokenDataMap[_tokenId].tokenPrice == 0,
            "This token is already on sale"
        );
        //승인된 컨트랙트인지 확인
        require(
            isApprovedForAll(tokenOwner, address(this)),
            "Token owner did not approve token"
        );

        SNSTokenDataMap[_tokenId].tokenPrice = _price;
    }

    //토큰 구매
    function purchaseToken(uint256 _tokenId) public payable {
        uint256 price = SNSTokenDataMap[_tokenId].tokenPrice;
        address tokenOwner = ownerOf(_tokenId);

        //판매중인지 확인
        require(price > 0, "token not sale.");
        //충분한 가격을 제시했는지 확인
        require(price <= msg.value, "Caller sent lower than price.");
        //자기 자신은 못산다.
        require(tokenOwner != msg.sender, "Caller is token owner.");

        //돈을 보냄
        payable(tokenOwner).transfer(msg.value);
        //NFT 보냄
        safeTransferFrom(tokenOwner, msg.sender, _tokenId);
        //판매된 NFT를 0으로
        SNSTokenDataMap[_tokenId].tokenPrice = 0;
    }
}
