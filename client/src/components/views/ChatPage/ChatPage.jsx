import React, { useEffect, useState } from "react";
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

    const sendMessageHandler = () => {
        socket.emit("message", message);
        setMessage("");
    };

    useEffect(() => {
        socket.on("message", (message) => {
            setChat([...chat, message]);
        });
    }, [chat]);

    return (
        <div className="ChatPage">
            <div>
                <h1>Messages</h1>
                <ul>
                    {chat.map((data, idx) => {
                        return <li key={idx}>{data}</li>;
                    })}
                </ul>
            </div>
            <div>
                <h1>Chat Box</h1>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessageHandler}>Send Message</button>
            </div>
        </div>
    );
}

export default ChatPage;