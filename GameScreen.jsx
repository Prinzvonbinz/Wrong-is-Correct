import React, { useState } from "react";

function getNextIdx(current, total) {
  return (current + 1) % total;
}

export default function GameScreen({ settings, players, questions, onRestart }) {
  const [amount, setAmount] = useState(settings.startAmount);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [winner, setWinner] = useState(null);

  // Shuffle questions at start
  React.useEffect(() => {
    setQuestionIdx(Math.floor(Math.random() * questions.length));
  }, [questions.length]);

  const nextRound = () => {
    setPlayerIdx(getNextIdx(playerIdx, players.length));
    setQuestionIdx((questionIdx + 1) % questions.length);
    setShowSolution(false);
  };

  const handleWrong = () => {
    setAmount(prev => Math.round(prev * (1 + settings.percent / 100)));
    nextRound();
  };

  const handleRight = () => {
    setWinner({
      name: players[playerIdx],
      gewonnen: amount,
    });
  };

  const resetGame = () => {
    setAmount(settings.startAmount);
    setPlayerIdx(0);
    setQuestionIdx(0);
    setShowSolution(false);
    setWinner(null);
  };

  if (winner) {
    let splitText = null;
    if (settings.split) {
      const verlierer = players.filter(p => p !== winner.name);
      const betrag = Math.round(winner.gewonnen / verlierer.length);
      splitText = (
        <div style={{ marginTop: 16 }}>
          <b>Jeder Verlierer zahlt:</b> {betrag} €<br />
          {verlierer.map((n, i) => (
            <span key={i}>{n}{i !== verlierer.length - 1 ? ", " : ""}</span>
          ))}
        </div>
      );
    }
    return (
      <div className="game">
        <h2>Spiel beendet!</h2>
        <p>
          <b>{winner.name}</b> gewinnt <b>{winner.gewonnen} €</b>!
        </p>
        {splitText}
        <button onClick={resetGame}>Neues Spiel, gleiche Einstellungen</button>
        <button onClick={onRestart}>Zurück zum Menü</button>
      </div>
    );
  }

  const q = questions[questionIdx];

  return (
    <div className="game">
      <div className="info-box">
        <div>Aktueller Gewinn: <b>{amount} €</b></div>
        <div>Nächster Spieler: <b>{players[playerIdx]}</b></div>
      </div>
      <hr />
      <div className="frage-box">
        <div>
          <b>Frage:</b> {q.question}
        </div>
        {showSolution ? (
          <>
            <div style={{ marginTop: 12 }}>
              <b>Lösung:</b> <span style={{ color: "#159" }}>{q.answer}</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="danger" onClick={handleWrong}>Falsch</button>
              <button className="success" onClick={handleRight} style={{marginLeft: 10}}>Richtig</button>
            </div>
            <div style={{ marginTop: 10, color: "#888" }}>
              (Bei "Falsch" steigt der Gewinn, bei "Richtig" gewinnt der Spieler das Geld)
            </div>
          </>
        ) : (
          <button onClick={() => setShowSolution(true)} style={{ marginTop: 16 }}>
            Lösung anzeigen
          </button>
        )}
      </div>
      <button onClick={onRestart} style={{ marginTop: 30 }}>Zurück zum Menü</button>
    </div>
  );
}
