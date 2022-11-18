import React from "react";
import ConnectWallet from "./ConnectWallet";
import { useNavigate } from 'react-router-dom';
import "../../style/reset.css";
import "../../style/header.css";

function Header() {
    let navigate = useNavigate();

    const onClick = (url, e) => {
        navigate(url)
        e.preventDefault()
    }


    return (
        <div id="header">
            <div className="container">
                <div className="header">
                    <div className="header-icon">
                        <a className="icon1" onClick={(e) => { onClick("/", e) }}><span className="ir_pm">Feed</span></a>
                        <a className="icon2" onClick={(e) => { onClick("/upload", e) }}><span className="ir_pm">Upload</span></a>
                        <a className="icon3" onClick={(e) => { onClick("/market", e) }}><span className="ir_pm">Market</span></a>
                        <a className="icon4" onClick={(e) => { onClick("/chat", e) }}><span className="ir_pm">Chat</span></a>
                        <a className="icon5" onClick={(e) => { onClick("/profile", e) }}><span className="ir_pm">Profile</span></a>
                        <ConnectWallet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;