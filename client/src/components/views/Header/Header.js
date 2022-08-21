import React from "react";
import ConnectWallet from "./ConnectWallet";
import "../../style/reset.css";
import "../../style/header.css";

function Header() {
    return (
        <div id="header">
            <div className="container">
                <div className="header">
                    <div className="header-icon">
                        <a href="/" className="icon1"><span className="ir_pm">Feed</span></a>
                        <a href="/upload" className="icon2"><span className="ir_pm">Upload</span></a>
                        <a href="#" className="icon3"><span className="ir_pm">Market</span></a>
                        <a href="#" className="icon4"><span className="ir_pm">Chat</span></a>
                        <a href="/profile" className="icon5"><span className="ir_pm">Profile</span></a>
                        <ConnectWallet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;