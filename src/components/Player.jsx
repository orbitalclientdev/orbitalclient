import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { LANE_X, useGameStore } from '../store/gameStore';

export default function Player() {
  const ref = useRef();
  const targetLane = useGameStore((s) => s.targetLane);
  const setPlayerX = useGameStore((s) => s.setPlayerX);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const tx = LANE_X[targetLane];
    ref.current.position.x += (tx - ref.current.position.x) * Math.min(1, delta * 12);
    setPlayerX(ref.current.position.x);
  });

  return (
    <mesh ref={ref} position={[0, 0.6, 0]} castShadow>
      <boxGeometry args={[0.9, 1.2, 0.9]} />
      <meshStandardMaterial color="#4cc9f0" metalness={0.1} roughness={0.4} />
    </mesh>
  );
}
