import React, { useEffect, useState } from "react";
import { MarketSNSTokenContract, web3 } from "../contracts";

const NFTMarketCard = (props) => {
    const tokenInfo = props.tokenInfo;
    const feed = props.feed;
    const accountAddress = props.accountAddress;

    const [price, setPrice] = useState("");

    if (tokenInfo.tokenPrice === "0")
        return;

    const onClickBuy = async (tokenId) => {
        try {
            const response = await MarketSNSTokenContract.methods
                .buyToken(tokenId)
                .send({ from: accountAddress, value: tokenInfo.tokenPrice });
            if (response.status) {
                setPrice("0");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderPrice = (SNSToken) => {
        if (feed.writer !== accountAddress)
            return (
                <div>
                    {price} FTM
                    < button className='sell_button'
                        onClick={event => onClickBuy(SNSToken.tokenId)}>
                        Buy</button >
                </div>
            )
        return (
            <div>
                {price} FTM
            </div>
        )
    }

    useEffect(() => {
        setPrice(web3.utils.fromWei(tokenInfo.tokenPrice));
    }, [])

    return (
        <div>
            <img className='my_image' src={`http://localhost:2400/${feed.filePath}`} alt="feed image" />
            <div>{renderPrice(tokenInfo, accountAddress)}</div>
        </div>
    )
}


export default NFTMarketCard;