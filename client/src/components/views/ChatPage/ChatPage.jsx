import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function ChatPage() {
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState();

    const sendMessageHandler = () => {
        const name = "name";
        const room = "room";

        const res = socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        });
        console.log(res);

        console.log(socket.emit("message", message));
        setMessage("");
    };

    useEffect(() => {
        setSocket(io('http://localhost:4800', {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttemps: 10,
            transports: ['websocket'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false
        }));
    }, [])

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