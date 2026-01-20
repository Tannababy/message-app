import { useEffect, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5050/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newMessage = await res.json();
    setMessages([newMessage, ...messages]);
    setText("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Message App</h1>

      <form onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message"
        />
        <button>Add</button>
      </form>

      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
