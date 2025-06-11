import React, { useState } from "react";
import GameSetup from "./GameSetup";
import GameScreen from "./GameScreen";
import "./index.css";

export default function App() {
  const [settings, setSettings] = useState(null);
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);

  return (
    <div className="container">
      <h1>Wrong is Correct (WiC)</h1>
      {!started ? (
        <GameSetup
          settings={settings}
          setSettings={setSettings}
          players={players}
          setPlayers={setPlayers}
          questions={questions}
          setQuestions={setQuestions}
          onStart={() => setStarted(true)}
        />
      ) : (
        <GameScreen
          settings={settings}
          players={players}
          questions={questions}
          onRestart={() => setStarted(false)}
        />
      )}
      <footer>
        <small>
          <a href="https://github.com/Prinzvonbinz" target="_blank" rel="noopener noreferrer">
            © {new Date().getFullYear()} Prinzvonbinz
          </a>
        </small>
      </footer>
    </div>
  );
}
