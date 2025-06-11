import React, { useState, useEffect } from "react";
import QuestionsEditor from "./QuestionsEditor";
import { saveGameData, loadGameData } from "./storage";

export default function GameSetup({
  settings,
  setSettings,
  players,
  setPlayers,
  questions,
  setQuestions,
  onStart,
}) {
  // Load from LocalStorage on mount
  useEffect(() => {
    const data = loadGameData();
    if (data) {
      setSettings(data.settings || {
        startAmount: 10,
        percent: 20,
        split: false,
      });
      setPlayers(data.players || []);
      setQuestions(data.questions || []);
    } else {
      setSettings({
        startAmount: 10,
        percent: 20,
        split: false,
      });
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (settings) {
      saveGameData({ settings, players, questions });
    }
  }, [settings, players, questions]);

  // Spieler
  const [newPlayer, setNewPlayer] = useState("");

  const addPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const removePlayer = (idx) => {
    setPlayers(players.filter((_, i) => i !== idx));
  };

  // Settings-Änderungen
  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  // Start-Validierung
  const canStart =
    players.length > 1 &&
    questions.length > 0 &&
    settings.startAmount > 0 &&
    settings.percent > 0;

  return (
    <div className="setup">
      <h2>Spielmenü</h2>

      <div className="setup-row">
        <label>Startbetrag (€):</label>
        <input
          type="number"
          min="1"
          value={settings.startAmount}
          onChange={e => updateSetting("startAmount", Math.max(1, Number(e.target.value)))}
        />
      </div>
      <div className="setup-row">
        <label>Anstieg in %:</label>
        <input
          type="number"
          min="1"
          value={settings.percent}
          onChange={e => updateSetting("percent", Math.max(1, Number(e.target.value)))}
        />
      </div>
      <div className="setup-row">
        <label>
          <input
            type="checkbox"
            checked={settings.split}
            onChange={() => updateSetting("split", !settings.split)}
          />{" "}
          Split (Gewinn auf Verlierer umlegen)
        </label>
      </div>

      <hr />

      <div>
        <h3>Teilnehmer</h3>
        <input
          value={newPlayer}
          onChange={e => setNewPlayer(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addPlayer()}
          placeholder="Namen eingeben"
        />
        <button onClick={addPlayer}>Hinzufügen</button>
        <ul>
          {players.map((name, i) => (
            <li key={i}>
              {name}{" "}
              <button onClick={() => removePlayer(i)} className="danger">
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <QuestionsEditor questions={questions} setQuestions={setQuestions} />

      <hr />

      <button
        className="start-btn"
        onClick={onStart}
        disabled={!canStart}
        title={!canStart ? "Mindestens 2 Teilnehmer und 1 Frage nötig" : ""}
      >
        Spiel starten
      </button>
    </div>
  );
                                                                     }
