import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { connectWallet } from '../_actions/user_action';

export default function (SpecificComponent, option) {
    function AuthenticationCheck() {
        let naviate = useNavigate();
        const dispatch = useDispatch();
        /*
        option
        null: 아무나 출입가능
        true: 지갑을 연결한 유저만 가능
        false: 비 로그인한 유저만 가능
        */
        useEffect(() => {
            dispatch(connectWallet()).then(response => {
                const accountAddress = response.payload.account;
                if (accountAddress.length === 0) {
                    if (option === true) {
                        alert("Need to connect wallet");
                        naviate('/');
                    }
                    //Loggined in Status 
                }
                else {
                    if (option === false) {
                        alert("Need to disconnect wallet");
                        naviate('/');
                    }
                }
            })
        }, [])


        return (
            <SpecificComponent />
        );
    }

    return AuthenticationCheck;
}