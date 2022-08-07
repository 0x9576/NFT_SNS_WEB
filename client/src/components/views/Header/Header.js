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
                        <a href="#" className="icon1"><span className="ir_pm">icon1</span></a>
                        <a href="#" className="icon2"><span className="ir_pm">icon2</span></a>
                        <a href="#" className="icon3"><span className="ir_pm">icon3</span></a>
                        <a href="#" className="icon4"><span className="ir_pm">icon4</span></a>
                        <a href="#" className="icon5"><span className="ir_pm">icon4</span></a>
                        <ConnectWallet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;