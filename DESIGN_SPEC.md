# A.S.T.R.A. UI Prototype — Locked Design Rules

## Core concept
- Tactical Core × Holographic Orbit.
- The UI is a sci-fi holographic spatial operation interface, not a spaceship room, outer space scene, physical console, or generic dashboard.
- Information may have foreground/background depth. Depth must communicate information priority or interaction state.
- Fixed camera. Do not use camera drift or parallax tricks to fake depth.
- MIRA artwork is reserved for future Live2D. Prototype the surrounding interface, not a substitute 3D/avatar figure.

## Current design phase
Information architecture and interaction come before decoration.

Do not add decorative curves/rings merely to make the screen look sci-fi. Every line, shape, light, shadow, and motion must have a reason.

## Main Terminal behavior
The Main view shows only information needed now:
- Primary Directive
- Current Frame
- MIRA presence slot
- Next Directive
- large shortcuts to Upcoming / Route, SENTRY / Observe, LAPLACE / System, Sub Intelligence / System
- PTT + text conversation
- usable operation mode controls

Detailed route, observation, and system information belongs in dedicated ROUTE / OBSERVE / SYSTEM views instead of being permanently crammed into Main.

## Controls
- Important controls must be realistically clickable/tappable.
- Target minimum height: 46–48px.
- No tiny button rows used as decoration.
- START / TALK / DONE / DETAIL / CORRECT / OPEN PHASE / PTT must look and behave like controls.

## Visual hierarchy
- Main task title and current state must be readable immediately.
- Supporting data is secondary but still legible; do not rely on microscopic sci-fi text.
- Avoid large dead areas that do not serve MIRA/Live2D or interaction.
- Avoid symmetrical left-card/right-card layouts by default; layout must follow task priority.

## Light, shadow, depth
- Cyan: system/standard.
- Violet/Pink: MIRA/personality presence.
- Green: success/ready/valid.
- Amber: caution/pending/temporary.
- Red: critical only.
- White: key neutral information.
- Use light/shadow to clarify layer separation and focus, not as bloom decoration.

## Motion vocabulary
Meaningful motion only:
- Pulse = alive/ready state.
- Scan = observation/analysis.
- Synchronization = state/link alignment.
- Convergence = information aggregation.
- Deployment = report/detail presentation.
- Panel movement = focus/depth change.
- Sweep = reset/organization.
- Type display = sequential machine report presentation.

Normal operation should remain calm. Strong animation is reserved for meaningful state transitions.

## Implementation constraints
- React + TypeScript + Vite, matching the current ASTRA desktop UI direction.
- CSS/SVG/DOM first.
- No Three.js/WebGL/canvas render loop for the core interface.
- Do not compress the source into a single-file loader.
- Keep source separated and readable.
- GitHub repository is the source of truth; GitHub Pages is only the preview output.
