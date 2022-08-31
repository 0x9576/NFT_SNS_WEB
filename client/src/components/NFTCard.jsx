import React, { useEffect, useState } from "react";
import { MarketSNSTokenContract, web3 } from "../contracts";

const NFTCard = (props) => {
    console.log(props);
    const tokenInfo = props.tokenInfo;
    const feed = props.feed;
    const accountAddress = props.accountAddress;

    const onClickSale = async (tokenId, price) => {
        try {
            const wei_price = web3.utils.toWei(price)
            const response = await MarketSNSTokenContract.methods
                .sellToken(tokenId, wei_price)
                .send({ from: accountAddress });
            if (response.status) {
                setPrice(price);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderPrice = (SNSToken) => {
        if (price === "0")
            return (
                <div>
                    <input id="price" className="input_price" type="text"></input>FTM
                    < button className='sell_button' onClick={event => onClickSale(SNSToken.tokenId,
                        document.getElementById("price").value)}> sell</button >
                </div>
            )
        return (
            <div>{price} FTM</div>
        )
    }

    const [price, setPrice] = useState("");

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


export default NFTCard;