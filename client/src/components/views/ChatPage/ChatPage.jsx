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
    const [roomName, setRoomName] = useState("free");

    const joinRoomHandler = () => {
        socket.emit("join", roomName);
        setChat([]);
    };

    const sendMessageHandler = () => {
        const request = {
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
        socket.on("message", (message) => {
            setChat([...chat, message]);
        });
    }, [chat]);

    return (
        <div className="ChatPage">
            <div>
                <h1>{roomName}</h1>
                <div>
                    <h1>Chat Box</h1>
                    <div>
                        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                        <button onClick={joinRoomHandler}>Join Room</button>
                    </div>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessageHandler}>Send Message</button>
                </div>
                <ul>
                    {chat.map((data, idx) => {
                        return <li key={idx}>{data}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ChatPage;