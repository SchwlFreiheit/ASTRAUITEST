export const mock = {
  directive: {
    title: 'Python Study',
    objective: '基礎を体系的に固め、次の情報系学習へ接続する。',
    start: '23:00',
    duration: '90 MIN',
    status: 'READY',
    next: 'Open Window · 00:30',
  },
  frame: {
    title: 'Python Study',
    elapsed: '00:36:24',
    app: 'VS Code',
    focus: 'HIGH',
    confidence: 94,
    provenance: 'OBSERVED',
  },
  route: [
    { time: '21:00', title: 'Open Phase', state: 'done' },
    { time: '23:00', title: 'Python Study', state: 'now' },
    { time: '00:30', title: 'Open Window', state: 'next' },
    { time: '01:00', title: 'Recovery Sequence', state: 'later' },
  ],
  sentry: {
    activeUnits: 3,
    summary: 'Room · Network · Environment',
  },
  laplace: {
    state: 'STANDBY',
    note: 'Formal analysis available',
  },
  subIntelligence: {
    running: 0,
    ready: 2,
  },
} as const
