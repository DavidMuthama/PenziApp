import React, { useState} from "react";
import axios from "axios";
import logo from "./img/gift_heart.png";
import "./welcome.css";

export function Welcome() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const handleInput = async (e) => {
    let newResponseEntries={}
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/messages", { message: input });
      // alert(response.data);
      // alert(typeof(response.data))
      if (typeof response.data === 'string') {
        newResponseEntries={text: response.data}
    }
  //   else if (Array.isArray(response.data)) {
  //     response.data.forEach(user => {
  //         alert(`Name: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
  //     });
  // }
  //   // Check if the `data` in response is an object
    else if (typeof response.data === 'object' && response.data !== null) {
        // Assuming the object might have keys like 'name', 'age', and 'message'
        // This is just an example, replace it with the actual keys from your response
        newResponseEntries={text:response.data.message}
        const redirectUrl = `/api/user/${encodeURIComponent(response.data.name)}/messages`;
        window.location.href = redirectUrl;
    }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setOutput([newResponseEntries])
  };
  return (
    <div className="MainPage">
      <header className="Title_area">
        <h1 className="head_title"> PenziApp </h1>
        <p className="Initial">Connect with your partner today:)<img src={logo} className="App-logo" alt="logo" /></p>
      </header>
      <div className="intro">
      <p>You have searched you havent found? You have looked all over for the one? have no fear. Here at PenziApp
          We link you to the one you can relate to. Forget about your worries and have fun 
        </p>
        <p>We are dedicated to helping you, YES you to find a good partner. So what are you waiting for, hop on and explore
          ALL that you want and find yourself someone. Don't be alone, don't feel alone.
        </p>
      </div>
      <div className="handleInput">
      {output.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
              </div>
            ))}
      </div>
      <form onSubmit={handleInput} className="Myformy">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter 'PENZI' to start"
        />
        <button type="submit">Submit Me</button>
      </form>
    </div>
  );
}