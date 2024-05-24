import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatui.css";
import images from "./img/images"
import logo from "./img/gift_heart.png";
const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  let newMessage = {};
  const {man_raising,woman_raising,telescope,scroll,mag,eye_in_speech}=images
  useEffect(() => {
    // Load messages from sessionStorage if available
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to sessionStorage
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage = { type: "outgoing", text: input, time: timestamp };
    setMessages([userMessage, ...messages]);

    try {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/");
      const id = pathParts[3]; // 'id of Steve'
      const response = await axios.post("/api/user/:id/messages", {
        message: input,
        id: id,
      });

      if (typeof response.data === "string") {
        newMessage = { type: "incoming", text: response.data };
      } else if (Array.isArray(response.data)) {
        let data = response.data.map(
          (user) => `${user.name}, aged ${user.age}, ${user.phone_no}\n`
        );
        // let data = [];
        // response.data.forEach((user) => {
        //   data.push(`Name: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
        // });
        newMessage = {
          type: "incoming",
          text: data,
          time: new Date().toLocaleTimeString(),
        };
      } else if (typeof response.data === "object" && response.data !== null) {
        if (response.data.message) {
          newMessage = {
            type: "incoming",
            text: response.data.message,
            time: new Date().toLocaleTimeString(),
          };
        }
        if (response.data.alert) {
          // Construct URL with alert as a query parameter
          const encodedAlert = encodeURIComponent(response.data.alert);
          const redirectUrl = `/api/user/${response.data.user_searched}/messages?message=${encodedAlert}`;

          // Redirect to the new URL with the alert message
          window.open(redirectUrl, "blank");
        }
      } else if (typeof response.data === "object" && response.data === null) {
        newMessage = {
          text: `User appears to not have updated their entries. please try another user`,
          type: "incoming",
          time: new Date().toLocaleTimeString(),
        };
        alert(
          `User appears to not have updated their entries. please try another user`
        );
      }

      setMessages([newMessage, userMessage, ...messages]);
    } catch (error) {
      console.log("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div className="MainPage">
      <header className="Title_area">
        <h1 className="head_title"> PenziApp </h1>
        <p className="Initial">
          Connect with your partner today:)
          <img src={logo} className="App-logo" alt="logo" />
        </p>
      </header>

      <div className="section">
        <p>
          We have a couple of instructions for you. Very simple like abc:
          <ul className="sub_section">
            <p>
              <img src={scroll} className="images" alt="scroll"/>
              details#educationlevel#religion#maritalstatus #occupation if u
              want to update your details. Let others see ur success
            </p>
            <p>
              <img src={eye_in_speech} className="images" alt="eye_in_speech"/>
              describe#phone_number if u want to get the description of a match.
            </p>
            <p>
              <img src={mag} className="images" alt="mag"/>
              match#20-30#County if u want to search within a given county. And
              yes all are a must.
              <img src={telescope} className="images" alt="telescope"/>
            </p>
            <p>
              <img src={man_raising} className="images" alt="man_raising"/>
              myself#things about you. e.g., hobbies and interests if u want to
              update your description. Pitch yourself
              <img src={woman_raising} className="images" alt="woman_raising"/>
            </p>
          </ul>
        </p>
      </div>
      <div className="chat-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <div className="message-content">{msg.text}</div>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
