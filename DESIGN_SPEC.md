# A.S.T.R.A. UI Prototype — Canonical Design Rules

This file is the implementation guardrail for the UI prototype. When a later idea conflicts with this document, preserve these rules unless the user explicitly overrides them.

## 1. Core concept — Tactical Core × Holographic Orbit

The permanent visual direction is the fusion of two roles:

- **Tactical Core / Command Horizon** = clear hierarchy, legibility, strategic information architecture, visual guidance, direct controls.
- **Holographic Orbit / Spatial Workspace** = information has depth, can move between background/active/focused states, related information can spread around the current focus, and the visible screen feels like one viewport into a larger A.S.T.R.A. system.

A/B/C event-animation ideas are not mutually exclusive. Scene-specific event effects may be chosen from any of them when they carry meaning.

The UI should evoke **the main holographic spatial-operation system used by a spacecraft**, but it is **not** a drawing of a spaceship room, outer space, a physical console, or a physical glass panel. The interface itself is the spatial system.

## 2. Non-negotiable exclusions

Do not regress into any of the following:

- generic dashboard / card grid
- physical spaceship room, floor, ceiling, wall, cockpit, console surface
- decorative outer-space background used to fake depth
- camera drift, camera zoom, parallax, draggable camera, or cinematic camera movement
- decorative curves/rings/lines with no function
- tiny unreadable "sci-fi" text
- text-only status reporting where a diagram, meter, node state, route, waveform, graph, or spatial relation communicates better
- information-overloaded cyberpunk clutter
- a substitute 3D/avatar figure for MIRA
- humanoid LAPLACE
- Three.js/WebGL/canvas render loops for the core interface
- single-file compressed loaders or preview-only implementation tricks that cannot be cleanly moved into the real app

## 3. Spatial information model

Depth is information architecture, not decoration.

### Depth states
- **Dormant / background**: low priority, context, off-focus subsystem.
- **Active / base**: normal operational information.
- **Focused / near**: current operation or information being manipulated.
- **Critical / overlay**: temporary high-attention state such as major warning or LAPLACE formal report.

### Spatial operations
- **Focus**: selected information comes forward; surrounding information recedes.
- **Pin**: information remains fixed while other context changes.
- **Spread**: related information expands around the focused item.
- **Collapse**: detail retreats and returns to background.

The camera remains fixed. Spatial manipulation is performed by the information layers themselves.

The visible screen is only a **viewport into a larger A.S.T.R.A. Mainframe**. Edge subsystems may remain partially visible and slide/expand into the active workspace when selected. This should suggest that more system structure exists outside the viewport without drawing a physical room.

## 4. Main Terminal information architecture

The Main Terminal is conversation-centered and must not become a passive monitoring dashboard.

The original role structure remains valid:

- **Strategic layer / upper region**: time, date, next fixed event, high-level system state.
- **Intent / Route side**: future, objective, directive, route and user intent.
- **Current / MIRA region**: current vector and the MIRA presence area.
- **Reality / Observation side**: Current Frame, SENTRY, external/current-state observation.
- **Interaction layer / lower region**: PTT, text input, mode and large direct controls.

These are information roles, not mandatory rectangular columns. Do not force a symmetrical left-card/right-card layout.

### Main Terminal content that must remain represented
- MIRA presence area (center/right tendency is acceptable, but layout follows hierarchy)
- PRIMARY DIRECTIVE
- current route/vector and NEXT DIRECTIVE
- current activity / CURRENT FRAME / focus / confidence
- Start / Delay-Talk / Done or equivalent direct task controls
- correction UI
- PTT + text in the same MAIN thread
- speech/operation mode
- LAPLACE status
- SENTRY / observation access
- Sub Intelligence state/access
- Today Route expandable/access
- Objective Inbox access where useful
- Break / OPEN PHASE negotiation
- Temporary Clearance state when it exists
- Auto Info / ambient information such as date/time/weather/system load may rotate or stay in low-priority space instead of permanently consuming large foreground area

Not all details belong on Main. ROUTE / OBSERVE / SYSTEM / ARCHIVE may own deeper information. Programming the UI means details should open, focus, spread, collapse, or switch views instead of being permanently crammed into one screen.

## 5. Information must not be text-only

Text is one information channel, not the interface itself.

Prefer visual structures when they improve immediate comprehension:

- route/progression tracks for past-now-next and session stages
- confidence/progress meters for numeric state
- node matrices for subsystem availability / readiness / connection state
- waveform / spectral / activity bars for voice, analysis, signal, focus or observation flow
- timeline or heat/intensity graphics for changing state
- compact state symbols when the meaning is stable and learned

A visual must represent real meaning. Do not add graphs or meters merely to make the screen look technical.

## 6. Meaning of shape and motif

Every design element must have a reason.

- **Ring / circle** = synchronization, progress, monitoring. Use only when one of those meanings is actually present.
- **Straight line** = connection, flow, vector.
- **Bracket** = focus, lock, target boundary.
- **Grid / lattice** = operational coordinates / spatial reference.
- **Route/orbit line** = route, vector, possibility. Do not use as generic decoration.
- **Particle / point** = signal or information unit.
- **Transparent plane** = information layer / foreground-background relation.
- **Cut / tactical frame** = important section or strategic boundary.

## 7. Color meaning

Exact RGB values are still adjustable, but semantic roles are fixed:

- **Cyan / Ice Blue** = normal system / standard operation
- **Emerald Green** = approved, ready, valid, stable, successful
- **Pink / Violet** = MIRA, personality, emotion/presence
- **Amber / Gold** = caution, pending, temporary, uncertain
- **Red** = danger, critical error, serious abnormality only
- **White** = key neutral information

Color is not decoration. A color must describe state, ownership, or attention.

## 8. Light, shadow and depth

Light and shadow are important and must not disappear from the design.

Use them to make depth and focus readable:

- near information receives stronger key light and contrast
- background information loses contrast and light
- overlapping layers create local occlusion/darkening
- MIRA-related presence can cast/reflect a restrained violet influence on nearby UI
- system-standard edges and active data links can use cyan light
- state colors illuminate only the state they belong to
- avoid full-screen bloom as a substitute for design

The goal is premium depth and material presence while staying light enough for the real Tauri/React UI.

## 9. Motion vocabulary

Normal operation is calm. Motion has semantic meaning.

- **Pulse** = alive / ready / breathing state
- **Scan** = analysis / search / observation
- **Synchronization** = alignment / authentication / state link
- **Convergence** = aggregation / analysis
- **Deployment** = report/detail presentation
- **Type display** = sequential machine report presentation
- **Panel movement** = focus/depth change
- **Sweep** = reset / organization / return to clean state

### Attention levels
- **Level 0 — Ambient**: quiet normal operation
- **Level 1 — Secondary update**: small status change
- **Level 2 — Focused action**: user operation / panel manipulation
- **Level 3 — Cinematic**: rare event-level sequence only

Do not run strong continuous animation merely because the screen is sci-fi.

## 10. Controls and interaction

Important controls must look usable and actually be usable.

- target control height: approximately **46–48 px minimum**
- PTT, START, TALK/DELAY, DONE, EXPAND/DETAIL, CORRECT, OPEN PHASE and primary navigation must never be tiny decorative text
- clicking/tapping information should cause a meaningful state change: focus, open, expand, switch view, pin, spread, collapse, etc.
- mode choices should use a usable selector/menu rather than an unreadable row of tiny buttons
- fixed camera: interaction manipulates information, not viewpoint

## 11. MIRA

MIRA is the human/alive presence of the system.

- future presentation is high-quality 2D / Live2D
- roadmap: 2D art → blink/breath/lip-sync/expression → full Live2D
- do not spend prototype effort drawing a fake 3D MIRA
- reserve a coherent presence area and design the surrounding system well enough that the future illustration can become the visual protagonist
- MIRA visual language is softer, alive, human, and violet/pink-accented relative to LAPLACE
- semantic animation commands should stay meaning-level (expression, intensity, attention target, motion type), not raw Live2D parameter numbers

## 12. LAPLACE

LAPLACE is not humanoid.

Allowed language:
- logo / system mark
- waveform
- HUD/data structures
- data lines
- machine report overlay

Normal state is a small indicator such as STANDBY / ANALYZING / RESULT READY. Formal report is a temporary machine/HUD mode; after the report, the interface returns to MIRA/Main.

LAPLACE should feel sharper, colder and more mechanical than MIRA.

## 13. Readability and typography

- major state/task title is immediately readable
- supporting text remains legible; no microscopic filler text
- English system labels may use restrained tracking, but values/body text should not be spaced into unreadability
- typography must not look like a default webpage or cheap game HUD
- visual hierarchy should rely on size, weight, position, depth and graphics, not just many uppercase labels
- Japanese must remain visually strong, not treated as an afterthought

## 14. Implementation constraints

- current target: **Tauri + React + TypeScript + Vite**
- CSS / SVG / DOM first
- no Three.js/WebGL for the main interface
- no always-running canvas render loop
- fixed camera
- source stays split and readable
- GitHub repository `ASTRAUITEST` is the prototype source of truth
- GitHub Pages is only the preview output
- implementation should remain transferable to the real ASTRA desktop UI

## 15. Current implementation priority

Before adding more decorative SF detail:

1. make the information architecture obvious
2. replace text-only state with meaningful visual representation
3. make focus/depth interaction readable
4. remove dead space that has no purpose
5. eliminate overlap / clipping / unreadable text
6. make the Main Terminal feel like one spatial operation workspace rather than a dashboard
7. only then add higher-order lighting, material and motion polish

**A.S.T.R.A. UI DESIGN PRINCIPLE:** Every shape, color, light, shadow, motion and spatial relation must carry meaning while integrating visual guidance, information hierarchy, usability and the SF experience.
