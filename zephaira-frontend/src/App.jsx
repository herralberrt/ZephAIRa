import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get('http://127.0.0.1:5000/history');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async () => {
    if (input.trim() === '') return;
    await axios.post('http://127.0.0.1:5000/submit', { text: input });
    setInput('');
    fetchHistory();
  };

  const handleClear = async () => {
    await axios.post('http://127.0.0.1:5000/clear');
    setHistory([]);
  };

  return (
    <div style={{ padding: '2rem', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h1>ZephAIRa – Emotion History</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type something"
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear} style={{ marginLeft: '1rem' }}>Clear All</button>

      <h3 style={{ marginTop: '2rem' }}>History:</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {history.map((item, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <div><strong>Text:</strong> {item.text}</div>
            <div><strong>Emotion:</strong> {item.emotion} {item.emoji}</div>
            <div><small>{new Date(item.timestamp).toLocaleString()}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
