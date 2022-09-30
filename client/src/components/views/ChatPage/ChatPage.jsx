import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Auth from '../../../hoc/auth';
import io from "socket.io-client";
const socket = io('http://localhost:2400', {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
})

function ChatPage() {
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [roomName, setRoomName] = useState("free");

    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress) {
        accountAddress = accountAddress.account;
    }
    else {
        accountAddress = "";
    }

    const joinRoomHandler = () => {
        socket.emit("join", roomName);
        setChat([]);
    };

    const sendMessageHandler = () => {
        const request = {
            sender: accountAddress,
            roomName: roomName,
            message: message
        }
        socket.emit("message", request);
        setMessage("");
    };

    useEffect(() => {
        socket.emit("join", roomName)
    }, [])

    useEffect(() => {
        socket.on("message", (data) => {
            setChat([...chat, data]);
        });
        //스크롤 바 맨 아래로
        let scroll = document.getElementById("chat_box");
        scroll.scrollTop = scroll.scrollHeight;
    }, [chat]);

    const chat_box = (data, idx) => {
        if (data.sender === accountAddress) {
            return (
                <div className="message_wrapper_my">
                    <div className="message_box_my">
                        {data.message}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="message_wrapper_sender">
                    {data.sender.substring(0, 6)}...{data.sender.slice(-4)}
                    <div className="message_box_sender">
                        {data.message}
                    </div>
                </div>
            )
        }
    }

    return (
        <div id="contents_chat">
            <div id="wrapper">
                <h1>{roomName}</h1>
                <div>
                    <div>
                        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                        <button onClick={joinRoomHandler}>Join Room</button>
                    </div>
                    <div id="chat_box">
                        {chat.map((data, idx) => {
                            return chat_box(data, idx);
                        })}
                    </div>
                    <input id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button id="send_button" onClick={sendMessageHandler}>Send Message</button>
                </div>

            </div>
        </div>
    );
}

export default Auth(ChatPage, true);