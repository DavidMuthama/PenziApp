import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./addUser.css";
import logo from "./img/gift_heart.png";

export function AddUser() {
const [message, setMessage] = useState("");
const [chatHistory, setHistory] = useState([]);
const messagesEndRef = useRef(null);

// const scrollToBottom = () => {
//     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatHistory]);
let newChatHistory
let data=[];
const handleUserInput = async (e) => {
e.preventDefault();
try {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const name = pathParts[3]; // 'Steve'
    const response = await axios.post("/api/user/:name/messages", {
    message: message,
    name: name});
    if (typeof response.data === "string") {
        newChatHistory = chatHistory.concat({
            text: response.data,
            from: response,
        });
        alert(response.data);
    } 
    
    else if (Array.isArray(response.data)) {
    response.data.forEach((user) => {
        data.push(`\nName: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
        newChatHistory = chatHistory.concat({
            text: `${data}\n`,
            from: response,
        });
    });
    alert(data)
    }
    // Check if the `data` in response is an object
    else if (typeof response.data === "object" && response.data !== null) {
    alert(response.data.message);
    const redirectUrl = `/api/user/${encodeURIComponent(response.data.name)}/messages`;
    window.location.href = redirectUrl;
    alert(response.data.alert);
    }
    else if(typeof response.data==="object"&& response.data===null){
        alert("End of entries")
    }
} catch (error) {
    console.error("Error sending message:", error);
}
setHistory(newChatHistory)
};
return (
<div className="MainPage">
    <header className="Title_area">
        <h1 className="head_title"> PenziApp </h1> <br></br>
        <p>Connect with your partner today:)<img src={logo} className="App-logo" alt="logo" /></p>
    </header>
    <div className="chat-container">
        {chatHistory.map((message, index) => (
            <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
            </div>
        ))
        }
        <div ref={messagesEndRef} />
    </div>
    <form onSubmit={handleUserInput} className="addUser-form">
    <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="match#20-30#Nairobi"
        className="Input-area"
    />
    <button type="submit" className="Submit">
        Press Here
    </button>
    </form>
</div>
);
}
