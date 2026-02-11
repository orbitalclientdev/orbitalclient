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

- **Left lane:** `ArrowLeft` or `A`
- **Right lane:** `ArrowRight` or `D`
- **Restart after game over:** `R` (or click restart)

## Architecture

- `src/components/Track.jsx`: Infinite moving floor segments with lane divider lines.
- `src/components/Player.jsx`: Lane-based player interpolation using `useFrame` + lerp.
- `src/components/ObstacleField.jsx`: Instanced obstacles.
- `src/store/gameStore.js`: Zustand game loop state, scoring, spawning, collision checks.
- `src/App.jsx`: Scene setup and keyboard input bindings.
