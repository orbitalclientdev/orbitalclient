import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function HUD() {
  const score = useGameStore((s) => s.score);
  const phase = useGameStore((s) => s.phase);
  const startGame = useGameStore((s) => s.startGame);
  const resetToStart = useGameStore((s) => s.resetToStart);

  return (
    <div className="hud">
      {phase === 'playing' && <div className="score">Score: {Math.floor(score)}</div>}

      {phase === 'start' && (
        <div className="overlay">
          <h1>Endless Runner</h1>
          <p>Dodge obstacles and survive as long as possible.</p>
          <p>Move: Arrow keys or A / D</p>
          <button type="button" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {phase === 'gameover' && (
        <div className="overlay">
          <h2>Game Over</h2>
          <p>Final Score: {Math.floor(score)}</p>
          <button type="button" onClick={resetToStart}>
            Back to Start
          </button>
        </div>
      )}
    </div>
  );
}
