import React, { useState } from "react";
import axios from "axios";

function Welcome() {
  const [input, setInput] = useState("");
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8888/api/user/messages", { message: input });
      alert(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleInput}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter 'PENZI' to start"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Welcome;