import React from 'react';
import { useMemo, useRef } from 'react';
import { Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import { LANE_X, useGameStore } from '../store/gameStore';

const MAX_OBSTACLES = 64;

export default function ObstacleField() {
  const meshRef = useRef();
  const obstacles = useGameStore((s) => s.obstacles);
  const phase = useGameStore((s) => s.phase);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < MAX_OBSTACLES; i += 1) {
      const obstacle = obstacles[i];
      if (obstacle && phase === 'playing') {
        const size = obstacle.size;
        dummy.position.set(LANE_X[obstacle.lane], size / 2, obstacle.z);
        dummy.scale.set(size, size, size);
        dummy.rotation.set(0, obstacle.z * 0.05, 0);
      } else {
        dummy.position.set(0, -50, 0);
        dummy.scale.set(0.001, 0.001, 0.001);
        dummy.rotation.set(0, 0, 0);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, MAX_OBSTACLES]}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff7b00" emissive="#472100" roughness={0.45} metalness={0.15} />
    </instancedMesh>
  );
}
