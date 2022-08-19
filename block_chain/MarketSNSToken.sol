//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;
import "SNSToken.sol";

contract MarketSNSToken {
    SNSToken public SNSTokenAddress;

    constructor(address _SNSTokenAddress) {
        SNSTokenAddress = SNSToken(_SNSTokenAddress);
    }

    //판매등록
    function sellToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = SNSTokenAddress.ownerOf(_tokenId);

        //주인이 맞는 지 확인
        require(tokenOwner == msg.sender, "Caller is not token owner.");
        //유효한 가격인지 확인
        require(_price > 0, "Price is not valid");
        //이미 판매중인 토큰인지 확인
        require(
            SNSTokenAddress.getTokenPrice(_tokenId) == 0,
            "This token is already on sale"
        );
        //승인된 컨트랙트인지 확인
        //마켓 컨트랙트(MarketSNSToken)가 NFT 소유를 변경 할 수 있도록 권한을 바꾸는 것.
        require(
            SNSTokenAddress.isApprovedForAll(tokenOwner, address(this)),
            "Token owner did not approve contract"
        );
        SNSTokenAddress.setTokenPrice(_tokenId, _price);
    }

    //토큰 구매
    function buyToken(uint256 _tokenId) public payable {
        uint256 price = SNSTokenAddress.getTokenPrice(_tokenId);
        address tokenOwner = SNSTokenAddress.ownerOf(_tokenId);

        //판매중인지 확인
        require(price > 0, "token not sale.");
        //충분한 가격을 제시했는지 확인
        require(price <= msg.value, "Caller sent lower than price.");
        //자기 자신은 못산다.
        require(tokenOwner != msg.sender, "Caller is token owner.");

        //돈을 보냄
        payable(tokenOwner).transfer(msg.value);
        //NFT 보냄
        SNSTokenAddress.safeTransferFrom(tokenOwner, msg.sender, _tokenId);
        //판매된 NFT를 0으로
        SNSTokenAddress.setTokenPrice(_tokenId, 0);
    }
}
