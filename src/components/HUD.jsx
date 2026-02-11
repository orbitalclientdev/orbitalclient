import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function HUD() {
  const score = useGameStore((s) => s.score);
  const gameOver = useGameStore((s) => s.gameOver);
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <div className="hud">
      <div className="score">Score: {Math.floor(score)}</div>
      {gameOver && (
        <div className="overlay">
          <h2>Game Over</h2>
          <button type="button" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
