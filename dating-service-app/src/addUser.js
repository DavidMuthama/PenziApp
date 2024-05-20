import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./addUser.css";
import logo from "./img/gift_heart.png";
export function AddUser() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const name = pathParts[3]; // 'Steve'
        const response = await axios.post("/api/user/:name/messages", {
          message: message,
          name: name,
        });

        let newChatHistory = [...chatHistory];
        let newUserEntries = [...userEntries];
        // the newUserEntries stores messages of input from user
        newUserEntries.push({ text: message, from: "own" })
        if (typeof response.data === "string") {
          newChatHistory.push({
            text: response.data,
            from: "response",
          });
        } else if (Array.isArray(response.data)) {
          let data = [];
          response.data.forEach((user) => {
            data.push(`\nName: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
          });
          newChatHistory.push({
            text: `${data}\n`,
            from: "response",
          });
        } else if (typeof response.data === "object" && response.data !== null) {
          alert(response.data.message);
          const redirectUrl = `/api/user/${encodeURIComponent(response.data.name)}/messages`;
          window.open(redirectUrl, 'blank');
          alert(response.data.alert);
        } else if (typeof response.data === "object" && response.data === null) {
          alert("End of entries");
        }

        setChatHistory(newChatHistory);
        setUserEntries([{ text: message, from: "own" }]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }    
  };


  return (
    <div className="MainPage">
      <header className="Title_area">
        <h1 className="head_title"> PenziApp </h1>
        <p className="Initial">Connect with your partner today:)<img src={logo} className="App-logo" alt="logo" /></p>
      </header>

      <div className="bubbleWrapper">
        <div className="inlineContainer own">
          <div className="ownBubble own">
            {userEntries.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
              </div>
            ))}
            </div>
        </div>
      </div>

      <div className="bubbleWrapper">
        <div className="inlineContainer">
          <div className="chat-container">
            {chatHistory.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
              </div>
            ))}
            <span className="message-time">{new Date().toLocaleTimeString()}</span>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <form onSubmit={handleUserInput} className="addUser-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="Input-area"
        />
        <button type="submit" className="Submit">
          Send
        </button>
      </form>
    </div>
  );
}
