import React, { useState } from "react";
import axios from "axios";

export function Welcome() {
  const [input, setInput] = useState("");
  // const [users, setUsers] = useState([]);
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/messages", { message: input });
      // alert(response.data);
      // alert(typeof(response.data))
      if (typeof response.data === 'string') {
        alert(response.data);
    }
    else if (Array.isArray(response.data)) {
      response.data.forEach(user => {
          alert(`Name: ${user.name}, Age: ${user.age}, Phone: ${user.phone_no}`);
      });
  }
    // Check if the `data` in response is an object
    else if (typeof response.data === 'object' && response.data !== null) {
        // Assuming the object might have keys like 'name', 'age', and 'message'
        // This is just an example, replace it with the actual keys from your response
        const redirectUrl = `/api/user/${encodeURIComponent(response.data.name)}/messages`;
        alert(response.data.message)
        window.location.href = redirectUrl;
    }
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
        <button type="submit">Submit Me</button>
      </form>
    </div>
  );
}