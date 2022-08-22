import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios';
import Auth from '../../../hoc/auth';
import "../../style/reset.css";
import { SNSTokenContract } from '../../../contracts';

function ProfilePage() {
    const [feed, setFeed] = useState([]);
    const [SNSTokenArray, setSNSTokenArray] = useState([]);
    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress) {
        accountAddress = accountAddress.account;
    }
    else {
        accountAddress = "";
    }

    const getTokensInfo = async () => {
        try {
            const tempArray = [];
            const response = await SNSTokenContract.methods
                .getTokensInfoByAccount(accountAddress)
                .call();
            console.log(response);
            response.map(v => {
                tempArray.push({
                    tokenId: v.tokenId,
                    value: v.value,
                    tokenPrice: v.tokenPrice,
                });
            });
            setSNSTokenArray(tempArray);
            console.log(SNSTokenArray);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTokensInfo();
        if (!SNSTokenArray)
            return;
        //accountAddress에서 값을 받아오지 않았다면, 요청하지 않음.
        if (accountAddress === "")
            return;
        const variables = { writer: accountAddress };
        Axios.post('/api/feed/getFeedsByWriter', variables)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    setFeed(response.data.feeds)
                }
                else {
                    alert('피드 가져오기 실패');
                }
            })
    }, [accountAddress])

    const renderPrice = (SNSTokenArray, idx) => {
        const price = SNSTokenArray[idx].tokenPrice;
        if (price === "0")
            return (
                <div>
                    <input className="input_price" type="text"></input>FTM
                    < button className='sell_button' > sell</button >
                </div>
            )
        return (
            <div>{price} FTM</div>
        )

    }

    const renderMyFeeds = feed.map((feed, index) => {
        return (
            <div className='my_feed' key={feed._id}>
                <img className='my_image' src={`http://localhost:2400/${feed.filePath}`} alt="feed image" />
                {SNSTokenArray.length == 0 ? (<h4>FTM</h4>) : renderPrice(SNSTokenArray, index)}
            </div>
        )
    })

    return (
        <div id='contents_profile'>
            <div id='wrapper'>
                {renderMyFeeds}
                <div className='my_feed'>
                    <img className='my_image' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                    <h4>10FTM</h4>
                </div>
                <div className='my_feed'>
                    <img className='my_image' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                    <input className="input_price" type="text"></input>FTM
                    <button className='sell_button'>sell</button>
                </div>
                <div className='my_feed'>
                    <img className='my_image' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                    <h4>10FTM</h4>
                </div>
                <div className='my_feed'>
                    <img className='my_image' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                    <h4>10FTM</h4>
                </div>
                <div className='my_feed'>
                    <img className='my_image' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                    <h4>10FTM</h4>
                </div>
            </div>
        </div>
    );
}

export default Auth(ProfilePage, true);