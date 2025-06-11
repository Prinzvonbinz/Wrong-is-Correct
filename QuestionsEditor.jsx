import React, { useState } from "react";

export default function QuestionsEditor({ questions, setQuestions }) {
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  const addQuestion = () => {
    if (!newQ.trim() || !newA.trim()) return;
    setQuestions([...questions, { question: newQ.trim(), answer: newA.trim() }]);
    setNewQ("");
    setNewA("");
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h3>Eigene Fragen</h3>
      <input
        value={newQ}
        onChange={e => setNewQ(e.target.value)}
        placeholder="Frage"
        style={{ width: "56%" }}
      />
      <input
        value={newA}
        onChange={e => setNewA(e.target.value)}
        placeholder="Antwort"
        style={{ width: "30%", marginLeft: 8 }}
      />
      <button onClick={addQuestion}>Frage hinzufügen</button>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            <b>{q.question}</b> <span style={{ color: "#888" }}>({q.answer})</span>
            <button onClick={() => removeQuestion(i)} className="danger" style={{ marginLeft: 10 }}>
              Entfernen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
