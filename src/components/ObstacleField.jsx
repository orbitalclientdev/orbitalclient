import { useMemo, useRef } from 'react';
import { Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import { LANE_X, useGameStore } from '../store/gameStore';

const MAX_OBSTACLES = 64;

export default function ObstacleField() {
  const meshRef = useRef();
  const obstacles = useGameStore((s) => s.obstacles);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < MAX_OBSTACLES; i += 1) {
      const obstacle = obstacles[i];
      if (obstacle) {
        const size = obstacle.size;
        dummy.position.set(LANE_X[obstacle.lane], size / 2, obstacle.z);
        dummy.scale.set(size, size, size);
      } else {
        dummy.position.set(0, -20, 0);
        dummy.scale.set(0.001, 0.001, 0.001);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, MAX_OBSTACLES]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff7b00" roughness={0.6} />
    </instancedMesh>
  );
}
