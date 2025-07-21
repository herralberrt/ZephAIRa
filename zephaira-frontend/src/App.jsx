import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    if (!input) return;
    const res = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, time: new Date().toISOString() })
    });
    if (res.ok) {
      setInput('');
      fetchHistory();
    }
  };

  const fetchHistory = async () => {
    const res = await fetch('/history');
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ZephAIRa – Istoric emoții</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrie ceva..."
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: '1rem' }}>
        Trimite
      </button>

      <h2>Istoric:</h2>
      <ul>
        {history.map((entry, idx) => (
          <li key={idx}>{entry.text} – {new Date(entry.time).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
