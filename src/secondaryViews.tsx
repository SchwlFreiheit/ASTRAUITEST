import { useMemo, useState } from 'react'
import { ActionButton, SectionLabel } from './components'
import { mock } from './mock'

type RoutePoint = (typeof mock.route)[number]

type SensorState = 'ACTIVE' | 'PASSIVE' | 'STANDBY'

export function RouteSpatialView() {
  const [selected, setSelected] = useState<number>(0)
  const current = mock.route[selected]

  return (
    <div className="secondary-space route-space">
      <SecondaryHeader
        eyebrow="TRAJECTORY / ROUTING"
        title="Today Route"
        copy="現在を基準点に、確定・可変・後続の距離を航路として扱う。"
        status="ROUTE LINK // STABLE"
      />

      <section className="route-horizon" aria-label="Today route trajectory">
        <div className="route-horizon__axis" aria-hidden="true" />
        <div className="route-horizon__origin" aria-hidden="true"><span>NOW</span></div>
        {mock.route.map((item, index) => (
          <RouteNode
            key={`${item.time}-${item.title}`}
            item={item}
            index={index}
            selected={selected === index}
            onSelect={() => setSelected(index)}
          />
        ))}
      </section>

      <section className="route-context-plane">
        <div className="route-context-plane__head">
          <div>
            <SectionLabel>{current.state === 'now' ? 'CURRENT DIRECTIVE' : 'ROUTE POINT'}</SectionLabel>
            <h2>{current.title}</h2>
          </div>
          <strong className={`route-state route-state--${current.state}`}>{current.state.toUpperCase()}</strong>
        </div>
        <div className="route-context-plane__data">
          <Metric label="START" value={current.time} />
          <Metric label="RELATION" value={routeRelation(selected)} />
          <Metric label="FLEX" value={selected === 1 ? 'FIXED' : selected > 1 ? 'FLEXIBLE' : 'ACTIVE'} accent={selected === 0} />
        </div>
        <div className="route-context-plane__actions">
          <ActionButton tone={selected === 0 ? 'success' : 'primary'}>{selected === 0 ? 'CURRENT' : 'FOCUS'}</ActionButton>
          <ActionButton>DETAIL</ActionButton>
          <ActionButton tone="warning">ADJUST</ActionButton>
        </div>
      </section>

      <aside className="route-strategy-strip" aria-label="Route strategic summary">
        <SectionLabel>ROUTE SUMMARY</SectionLabel>
        <div className="route-strategy-strip__stats">
          <Metric label="BLOCKS" value="07" />
          <Metric label="COMPLETE" value="03" />
          <Metric label="FLEXIBLE" value="02" />
          <Metric label="NEXT FIXED" value="23:40" />
        </div>
        <div className="route-density" aria-label="Today route density">
          {[82, 64, 48, 74, 38, 26, 52, 31, 18, 12].map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}
        </div>
        <small>Density is schedule occupancy, not decoration.</small>
      </aside>
    </div>
  )
}

function RouteNode({ item, index, selected, onSelect }: { item: RoutePoint; index: number; selected: boolean; onSelect: () => void }) {
  return (
    <button
      className={`route-node route-node--${item.state}${selected ? ' is-selected' : ''}`}
      style={{ ['--node-index' as string]: index }}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="route-node__marker" />
      <span className="route-node__time">{item.time}</span>
      <strong>{item.title}</strong>
      <small>{routeRelation(index)}</small>
    </button>
  )
}

function routeRelation(index: number) {
  if (index === 0) return 'NOW'
  if (index === 1) return 'NEXT FIXED'
  if (index === 2) return 'LATER / FLEX'
  return 'NEXT OPERATION DAY'
}

export function ObserveSpatialView() {
  const [sensor, setSensor] = useState('NETWORK')
  const sensors = useMemo(() => [
    { name: 'ROOM', state: 'PASSIVE' as SensorState, confidence: 62 },
    { name: 'NETWORK', state: 'ACTIVE' as SensorState, confidence: 96 },
    { name: 'ENVIRONMENT', state: 'ACTIVE' as SensorState, confidence: 88 },
  ], [])

  return (
    <div className="secondary-space observe-space">
      <SecondaryHeader
        eyebrow="REALITY / OBSERVATION"
        title="Observe"
        copy="観測結果と根拠だけを前景化し、推測と事実を同じ見た目にしない。"
        status="SENTRY // OBSERVING"
      />

      <section className="observe-frame-field">
        <span className="observe-frame-field__lock observe-frame-field__lock--tl" />
        <span className="observe-frame-field__lock observe-frame-field__lock--tr" />
        <span className="observe-frame-field__lock observe-frame-field__lock--bl" />
        <span className="observe-frame-field__lock observe-frame-field__lock--br" />
        <div className="observe-frame-field__head">
          <div>
            <SectionLabel>CURRENT FRAME</SectionLabel>
            <h2>{mock.frame.title}</h2>
          </div>
          <ConfidenceDial value={mock.frame.confidence} />
        </div>
        <div className="observe-frame-field__metrics">
          <Metric label="ELAPSED" value={mock.frame.elapsed} />
          <Metric label="APPLICATION" value={mock.frame.app} />
          <Metric label="FOCUS" value={mock.frame.focus} accent />
          <Metric label="PROVENANCE" value={mock.frame.provenance} />
        </div>
        <div className="observe-signal-plane">
          <div className="observe-signal-plane__attention">
            <SectionLabel>ATTENTION PROFILE</SectionLabel>
            <SignalBars values={[28, 46, 58, 81, 95, 76, 63, 42, 30, 18]} />
          </div>
          <div className="observe-signal-plane__source">
            <SectionLabel>SOURCE CHAIN</SectionLabel>
            <SourceChain />
          </div>
        </div>
        <div className="observe-frame-field__actions">
          <ActionButton tone="primary">SCAN</ActionButton>
          <ActionButton>CORRECT</ActionButton>
          <ActionButton>FRAME HISTORY</ActionButton>
        </div>
      </section>

      <aside className="sentry-deck">
        <header>
          <div><SectionLabel>SENTRY SYSTEM</SectionLabel><h2>{mock.sentry.activeUnits} UNITS LINKED</h2></div>
          <span className="sentry-deck__scan-state">LIVE SCAN</span>
        </header>
        <div className="sensor-lanes">
          {sensors.map((item) => (
            <button
              key={item.name}
              className={`sensor-lane${sensor === item.name ? ' is-focused' : ''}`}
              onClick={() => setSensor(item.name)}
            >
              <span className={`sensor-lane__state sensor-lane__state--${item.state.toLowerCase()}`} />
              <div><strong>{item.name}</strong><small>{item.state}</small></div>
              <i style={{ ['--confidence' as string]: `${item.confidence}%` }} />
              <b>{item.confidence}%</b>
            </button>
          ))}
        </div>
        <div className="sentry-deck__detail">
          <SectionLabel>FOCUSED SENSOR</SectionLabel>
          <strong>{sensor}</strong>
          <p>{sensor === 'NETWORK' ? 'Application activity and connectivity events are being correlated.' : sensor === 'ROOM' ? 'Room observer remains passive until context requires it.' : 'Environment state is stable and contributes ambient context.'}</p>
        </div>
        <ActionButton>OPEN SENTRY DETAIL</ActionButton>
      </aside>
    </div>
  )
}

export function SystemSpatialView() {
  const [mode, setMode] = useState('NORMAL')
  const modes = ['NORMAL', 'QUIET / VOICE', 'QUIET / TEXT', 'DND']

  return (
    <div className="secondary-space system-space">
      <SecondaryHeader
        eyebrow="SYSTEM / INTELLIGENCE"
        title="System"
        copy="人格ではなく、解析・処理・健全性・動作モードを機械的な構造として扱う。"
        status="CORE // NOMINAL"
      />

      <section className="laplace-field">
        <header>
          <div><SectionLabel>LAPLACE</SectionLabel><h2>{mock.laplace.state}</h2></div>
          <span>ANALYSIS LINK // IDLE</span>
        </header>
        <LaplaceSignal />
        <div className="laplace-field__foot">
          <p>{mock.laplace.note}</p>
          <div><ActionButton tone="primary">REQUEST ANALYSIS</ActionButton><ActionButton>LAST REPORT</ActionButton></div>
        </div>
      </section>

      <section className="subintelligence-field">
        <header><SectionLabel>SUB INTELLIGENCE</SectionLabel><strong>{mock.subIntelligence.running} RUNNING · {mock.subIntelligence.ready} READY</strong></header>
        <ProcessingLanes />
        <p>Background work stays separated from MAIN conversation.</p>
        <ActionButton>OPEN QUEUE</ActionButton>
      </section>

      <section className="health-topology">
        <header><SectionLabel>SYSTEM HEALTH</SectionLabel><strong>91% STABILITY</strong></header>
        <HealthTopology />
        <div className="health-topology__legend">
          <Metric label="CORE" value="READY" accent />
          <Metric label="SENTRY" value="ACTIVE" />
          <Metric label="AFS" value="STANDBY" />
          <Metric label="GPU" value="NORMAL" />
        </div>
      </section>

      <section className="operation-mode-field">
        <SectionLabel>SPEECH / OPERATION MODE</SectionLabel>
        <div className="operation-mode-field__choices">
          {modes.map((item) => (
            <button key={item} className={mode === item ? 'is-selected' : ''} onClick={() => setMode(item)}>
              <span>{item}</span><small>{modeCopy(item)}</small>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function SecondaryHeader({ eyebrow, title, copy, status }: { eyebrow: string; title: string; copy: string; status: string }) {
  return (
    <header className="secondary-header">
      <div><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p>{copy}</p></div>
      <span>{status}</span>
    </header>
  )
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="secondary-metric"><span>{label}</span><strong className={accent ? 'text-ok' : ''}>{value}</strong></div>
}

function ConfidenceDial({ value }: { value: number }) {
  return <div className="confidence-dial" style={{ ['--confidence' as string]: `${value}%` }}><div><strong>{value}%</strong><span>CONF.</span></div></div>
}

function SignalBars({ values }: { values: number[] }) {
  return <div className="signal-bars" aria-hidden="true">{values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}</div>
}

function SourceChain() {
  return (
    <div className="source-chain" aria-label="Source provenance chain">
      <span className="is-source">SENTRY</span><i /><span>CLASSIFY</span><i /><span className="is-result">FRAME</span>
    </div>
  )
}

function LaplaceSignal() {
  const values = [18, 27, 46, 64, 38, 72, 51, 83, 43, 59, 31, 68, 42, 24, 19]
  return (
    <div className="laplace-signal" aria-label="Laplace analysis signal idle">
      <span className="laplace-signal__baseline" />
      <div>{values.map((value, index) => <i key={index} style={{ height: `${value}%` }} />)}</div>
      <b>STANDBY</b>
    </div>
  )
}

function ProcessingLanes() {
  const lanes = [
    { label: 'CONTEXT', state: 'READY', value: 100 },
    { label: 'ARCHIVE', state: 'READY', value: 100 },
    { label: 'RETRIEVAL', state: 'IDLE', value: 24 },
    { label: 'SYNTHESIS', state: 'IDLE', value: 12 },
  ]
  return <div className="processing-lanes">{lanes.map((lane) => <div key={lane.label}><span>{lane.label}</span><i style={{ ['--load' as string]: `${lane.value}%` }} /><strong>{lane.state}</strong></div>)}</div>
}

function HealthTopology() {
  const nodes = ['CORE', 'VOICE', 'MIRA', 'SENTRY', 'ROUTE', 'AFS', 'SYNC']
  return (
    <div className="health-map" aria-label="System health topology">
      <span className="health-map__link health-map__link--a" /><span className="health-map__link health-map__link--b" /><span className="health-map__link health-map__link--c" />
      {nodes.map((node, index) => <div key={node} className={`health-node health-node--${index}`}><i /><span>{node}</span></div>)}
    </div>
  )
}

function modeCopy(mode: string) {
  if (mode === 'NORMAL') return 'Voice + proactive'
  if (mode === 'QUIET / VOICE') return 'Voice on request'
  if (mode === 'QUIET / TEXT') return 'Text only'
  return 'Explicit silence'
}
