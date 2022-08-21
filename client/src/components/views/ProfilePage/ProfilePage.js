import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios';
import Auth from '../../../hoc/auth';
import "../../style/profile.css";
import "../../style/reset.css";

function ProfilePage() {
    const [feed, setFeed] = useState([]);
    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress) {
        accountAddress = accountAddress.account;
    }
    else {
        accountAddress = "";
    }
    useEffect(() => {
        //accountAddress에서 값을 받아오지 않았다면, 요청하지 않음.
        if (accountAddress == "")
            return;
        const variables = { writer: accountAddress };
        Axios.post('/api/feed/getFeedsByWriter', variables)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    setFeed(response.data.feeds)
                    console.log(feed);
                }
                else {
                    alert('피드 가져오기 실패');
                }
            })
    }, [accountAddress])


    const renderFeeds = feed.map((feed, index) => {
        return (
            <img className='my_feed' src={`http://localhost:2400/${feed.filePath}`} alt="feed image" />
        )
    })

    return (
        <div id='contents'>
            <div id='wrapper'>
                {renderFeeds}
                <img className='my_feed' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                <img className='my_feed' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
                <img className='my_feed' src={`http://localhost:2400/uploads/1660482458565_aapx.jpeg`} alt="feed image" />
            </div>
        </div>
    );
}

export default Auth(ProfilePage, true);