import React, { useEffect } from "react";
import { connectWallet } from "../../../_actions/user_action";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

function ConnectWallet() {
    const dispatch = useDispatch();
    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress)
        accountAddress = accountAddress.account;
    else
        accountAddress = "";

    // 연결상태 지속확인
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged() {
        dispatch(connectWallet());
    }

    return (
        String(accountAddress).length !== 0 ?
            <button>My wallet : {String(accountAddress).substring(0, 6)} ...</button>
            : <button onClick={connectWallet}>Connect</button>);
}

export default ConnectWallet