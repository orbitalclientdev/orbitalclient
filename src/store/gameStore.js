import { create } from 'zustand';

export const LANE_X = [-2, 0, 2];
const PLAYER_BOUNDS = { hx: 0.45, hy: 0.6, hz: 0.45 };

const randomId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

const createObstacle = () => ({
  id: randomId(),
  lane: Math.floor(Math.random() * 3),
  z: -55,
  size: 1.1 + Math.random() * 1.2
});

const intersectsAABB = (playerX, obstacle) => {
  const ox = LANE_X[obstacle.lane];
  const oz = obstacle.z;
  const oh = obstacle.size * 0.5;

  const xOverlap = Math.abs(playerX - ox) < PLAYER_BOUNDS.hx + oh;
  const yOverlap = Math.abs(0.6 - oh) < PLAYER_BOUNDS.hy + oh;
  const zOverlap = Math.abs(0 - oz) < PLAYER_BOUNDS.hz + oh;

  return xOverlap && yOverlap && zOverlap;
};

export const useGameStore = create((set, get) => ({
  speed: 24,
  phase: 'start',
  targetLane: 1,
  playerX: 0,
  score: 0,
  spawnTimer: 0.8,
  obstacles: [],

  setTargetLane: (lane) => set({ targetLane: Math.max(0, Math.min(2, lane)) }),
  nudgeLane: (delta) => {
    const next = Math.max(0, Math.min(2, get().targetLane + delta));
    set({ targetLane: next });
  },
  setPlayerX: (x) => set({ playerX: x }),

  startGame: () =>
    set({
      phase: 'playing',
      score: 0,
      targetLane: 1,
      playerX: 0,
      spawnTimer: 0.5,
      obstacles: [createObstacle()]
    }),

  step: (delta) => {
    const state = get();
    if (state.phase !== 'playing') return;

    let spawnTimer = state.spawnTimer - delta;
    const nextObstacles = state.obstacles
      .map((obs) => ({ ...obs, z: obs.z + state.speed * delta }))
      .filter((obs) => obs.z < 12);

    if (spawnTimer <= 0) {
      nextObstacles.push(createObstacle());
      spawnTimer = 0.55 + Math.random() * 0.45;
    }

    const collision = nextObstacles.some((obs) => intersectsAABB(state.playerX, obs));

    set({
      obstacles: nextObstacles,
      spawnTimer,
      score: state.score + delta * 10,
      phase: collision ? 'gameover' : state.phase
    });
  },

  resetToStart: () =>
    set({
      phase: 'start',
      targetLane: 1,
      playerX: 0,
      score: 0,
      spawnTimer: 0.8,
      obstacles: []
    })
}));
