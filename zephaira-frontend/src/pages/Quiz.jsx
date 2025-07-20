import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/quiz')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Failed to load quiz:', err));
  }, []);

  const handleChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    })
      .then(res => res.json())
      .then(data => alert('Answers submitted!'))
      .catch(err => console.error('Submission failed:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧠 Take the Quiz</h1>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: '1rem' }}>
          <p><strong>{q.question}</strong></p>
          {q.options.map(opt => (
            <div key={opt}>
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                {` ${opt}`}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: '2rem' }}>
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
