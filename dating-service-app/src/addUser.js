import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./addUser.css";
import logo from "./img/gift_heart.png";
import images from "./img/images"
const {man_raising,woman_raising,telescope,scroll,mag,eye_in_speech}=images

export function AddUser() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const alertMessage = urlParams.get('alert');
    if (alertMessage) {
        alert(decodeURIComponent(alertMessage));
    }
}, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const id = pathParts[3]; // 'id of Steve'
        const response = await axios.post("/api/user/:id/messages", {
          message: message,
          id: id,
        });

        let newChatHistory = [...chatHistory];
        let newUserEntries = [...userEntries];
        let newResponseEntries={}
        // the newUserEntries stores messages of input from user
        newUserEntries.push({ text: message, from: "own" })
        if (typeof response.data === "string") {
          newChatHistory.push({
            text: response.data,
            from: "response",
          });
          newResponseEntries = { text: response.data, from: "response" };
        } else if (Array.isArray(response.data)) {
          let data = response.data.map(user => `${user.name}, aged ${user.age}, ${user.phone_no}`);
          // let data = [];
          // response.data.forEach((user) => {
          //   data.push(`Name: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
          // });
          newResponseEntries = { text: data, from: "response" };
          newChatHistory.push({
            text: `${data.join('\n')}`,
            from: "response",
          });
          console.log(newResponseEntries)
        } else if (typeof response.data === "object" && response.data !== null) {
          if (response.data.message) {
            newChatHistory.push({
              text: response.data.message,
              from: "response",
            });
            newResponseEntries = { text: response.data.message, from: "response" };
          }
          if (response.data.alert) {
            // Construct URL with alert as a query parameter
            const encodedAlert = encodeURIComponent(response.data.alert);
            const redirectUrl = `/api/user/${response.data.user_searched}/messages?message=${encodedAlert}`;
  
            // Redirect to the new URL with the alert message
            window.open(redirectUrl,'blank')
          }
        } else if (typeof response.data === "object" && response.data === null) {
          newResponseEntries={text:`User appears to not have updated their entries. please try another user`,from:"response"};
          alert(`User appears to not have updated their entries. please try another user`)
        }
        setChatHistory(newChatHistory);
        // setChatHistory([newResponseEntries])
        setUserEntries([{ text: message, from: "own" }]);
        // setRecentEntries(newResponseEntries)
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

      <div className="section">
        <p>We have a couple of instructions for you. Very simple like abc:
          <ul className="sub_section">
          <p><img src={scroll} className="images"/>details#educationlevel#religion#maritalstatus
            #occupation if u want to update your details. Let others see ur success</p>
          <p><img src={eye_in_speech} className="images"/>describe#phone_number if u want to get the description of a match.</p>
          <p><img src={mag} className="images"/>match#20-30#County if u want to search within a given county. And yes all are a must.<img src={telescope} className="images"/></p>
          <p><img src={man_raising} className="images"/>myself#things about you. e.g., hobbies and interests if u want to update your description. Pitch yourself<img src={woman_raising} className="images"/></p>
          </ul>
        </p>
      </div>
      <div className="bubbleWrapper">
        <div className="inlineContainer">
          <div className="chat-container" aria-live="polite">
            {chatHistory.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

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
        <span className="message-time">{new Date().toLocaleTimeString()}</span>
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
