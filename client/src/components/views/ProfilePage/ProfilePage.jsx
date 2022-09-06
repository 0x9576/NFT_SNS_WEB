import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios';
import Auth from '../../../hoc/auth';
import { MarketSNSTokenAddress, MarketSNSTokenContract, SNSTokenContract, web3 } from '../../../contracts';
import NFTCard from '../../NFTCard';

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
                .getAllTokensInfo()
                .call();
            console.log(response);
            response.map(v => {
                tempArray.push({
                    tokenId: v.tokenId,
                    value: v.value,
                    tokenPrice: v.tokenPrice,
                    tokenCreator: v.tokenCreator
                });
            });
            setSNSTokenArray(tempArray);
            console.log(SNSTokenArray);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //accountAddress에서 값을 받아오지 않았다면, 요청하지 않음.
        if (accountAddress === "")
            return;
        getTokensInfo();
        if (!SNSTokenArray)
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

    const onClickApprove = async () => {
        try {
            await SNSTokenContract.methods
                .setApprovalForAll(MarketSNSTokenAddress, true)
                .send({ from: accountAddress });
        } catch (error) {
            console.log(error);
        }
    }

    const renderMyFeeds = feed.map((feed, index) => {
        if (!SNSTokenArray[feed.tokenNum])
            return;
        return (
            <div className='my_feed' key={feed._id}>
                {SNSTokenArray.length !== 0 && <NFTCard tokenInfo={SNSTokenArray[feed.tokenNum]}
                    feed={feed}
                    accountAddress={accountAddress} />}
            </div>
        )
    })

    return (
        <div id='contents_profile'>
            <div id='wrapper'>
                <div id='approve_button_wrapper'>
                    < button className='approve_button' onClick={onClickApprove}> approve</button>
                </div>
                {renderMyFeeds}
            </div>
        </div>
    );
}

export default Auth(ProfilePage, true);