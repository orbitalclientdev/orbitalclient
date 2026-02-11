import React from 'react';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';

const SEGMENT_COUNT = 10;
const SEGMENT_LENGTH = 20;

export default function Track() {
  const speed = useGameStore((s) => s.speed);
  const segmentRefs = useRef([]);
  const segments = useMemo(
    () =>
      Array.from({ length: SEGMENT_COUNT }, (_, i) => ({
        id: i,
        z: -i * SEGMENT_LENGTH
      })),
    []
  );

  useFrame((_, delta) => {
    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i];
      segment.z += speed * delta;
      if (segment.z > SEGMENT_LENGTH) {
        segment.z -= SEGMENT_COUNT * SEGMENT_LENGTH;
      }

      const mesh = segmentRefs.current[i];
      if (mesh) mesh.position.z = segment.z;
    }
  });

  return (
    <group>
      {segments.map((segment, index) => (
        <mesh
          key={segment.id}
          ref={(mesh) => {
            segmentRefs.current[index] = mesh;
          }}
          position={[0, -0.05, segment.z]}
          receiveShadow
        >
          <boxGeometry args={[8, 0.1, SEGMENT_LENGTH]} />
          <meshStandardMaterial color={segment.id % 2 ? '#252525' : '#2f2f2f'} />
        </mesh>
      ))}

      <mesh position={[-2, 0.01, -70]}>
        <boxGeometry args={[0.07, 0.02, 160]} />
        <meshStandardMaterial color="#8d8d8d" />
      </mesh>
      <mesh position={[2, 0.01, -70]}>
        <boxGeometry args={[0.07, 0.02, 160]} />
        <meshStandardMaterial color="#8d8d8d" />
      </mesh>
    </group>
  );
}
