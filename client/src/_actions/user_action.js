import {
    CONNECT_WALLET
} from './types';

export async function connectWallet() {
    console.log("connect");
    const getAccount = async () => {
        try {
            if (window.ethereum) {
                return await window.ethereum.request({
                    method: 'eth_requestAccounts',
                }).then((res) => res[0])
            } else {
                alert("Please install Metamask");
            }
        } catch (error) {
            console.error(error);
            return "";
        }
        return "";
    }
    return {
        type: CONNECT_WALLET,
        payload: {
            account: await getAccount()
        }
    }
}