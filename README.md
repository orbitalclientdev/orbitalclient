# React Three Fiber Endless Runner Prototype

A functional Subway-Surfers-style prototype built with:

- React
- React Three Fiber + Drei
- Zustand

## Run locally

```bash
npm install
npm run dev
```

## Controls

- **Start game:** `Space` / `Enter` (or Start button)
- **Left lane:** `ArrowLeft` or `A`
- **Right lane:** `ArrowRight` or `D`
- **Back to start after game over:** `R` / `Enter` (or button)

## Architecture

- `src/components/Track.jsx`: Infinite moving floor segments with lane divider lines.
- `src/components/Player.jsx`: Lane-based player interpolation using `useFrame` + lerp.
- `src/components/ObstacleField.jsx`: Instanced obstacles (visibility fix with `frustumCulled={false}`).
- `src/store/gameStore.js`: Zustand game loop state, phase (`start` / `playing` / `gameover`), scoring, spawning, and collision checks.
- `src/components/HUD.jsx`: Start screen, score HUD, and game-over overlay.
- `src/App.jsx`: Scene setup and keyboard input bindings.
