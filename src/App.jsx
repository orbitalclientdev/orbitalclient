import React, { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Player from './components/Player';
import Track from './components/Track';
import ObstacleField from './components/ObstacleField';
import HUD from './components/HUD';
import { useGameStore } from './store/gameStore';

function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0.5, -22);
  });

  return null;
}

function GameLoop() {
  const step = useGameStore((s) => s.step);

  useFrame((_, delta) => {
    step(Math.min(delta, 0.05));
  });

  return null;
}

export default function App() {
  const nudgeLane = useGameStore((s) => s.nudgeLane);
  const phase = useGameStore((s) => s.phase);
  const startGame = useGameStore((s) => s.startGame);
  const resetToStart = useGameStore((s) => s.resetToStart);

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (phase === 'start' && [' ', 'enter'].includes(key)) {
        event.preventDefault();
        startGame();
      }

      if (phase === 'gameover' && ['r', 'enter'].includes(key)) {
        event.preventDefault();
        resetToStart();
      }

      if (phase !== 'playing') return;

      if (['arrowleft', 'a'].includes(key)) nudgeLane(-1);
      if (['arrowright', 'd'].includes(key)) nudgeLane(1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nudgeLane, phase, resetToStart, startGame]);

  return (
    <>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 5.5, 9], fov: 55, near: 0.1, far: 250 }}>
        <color attach="background" args={['#0a1020']} />
        <fog attach="fog" args={['#0a1020', 16, 125]} />

        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.45} color="#c8e6ff" groundColor="#1f1f1f" />
        <directionalLight
          castShadow
          intensity={1.4}
          position={[4, 10, 8]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <CameraRig />
        <Track />
        <Player />
        <ObstacleField />
        <GameLoop />
      </Canvas>
      <HUD />
    </>
  );
}
