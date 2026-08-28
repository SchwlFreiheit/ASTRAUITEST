import { useState } from 'react'
import { ActionButton, DetailSheet, MiraPresence, QuickJump, SectionLabel, Surface, type ViewId } from './components'
import { mock } from './mock'

export function MainView({ onView }: { onView: (view: ViewId) => void }) {
  const [detail, setDetail] = useState<'directive' | 'frame' | null>(null)

  return (
    <div className="view view--main">
      <div className="main-primary-stack">
        <Surface className="directive-cluster surface--ghost">
          <div className="plane plane--near plane--headline">
            <div>
              <SectionLabel>PRIMARY DIRECTIVE</SectionLabel>
              <h1>{mock.directive.title}</h1>
              <p className="lead-copy">{mock.directive.objective}</p>
            </div>
            <div className="priority-tag">ACTIVE // PRIORITY 01</div>
          </div>

          <div className="plane plane--base plane--metric-grid">
            <Metric label="START" value={mock.directive.start} />
            <Metric label="DURATION" value={mock.directive.duration} />
            <Metric label="STATUS" value={mock.directive.status} accent />
          </div>

          <div className="plane plane--far telemetry-strip directive-telemetry">
            <div className="telemetry-unit telemetry-unit--wide">
              <SectionLabel>MISSION STAGES</SectionLabel>
              <PhaseTrack />
            </div>
            <div className="telemetry-unit telemetry-unit--meter">
              <SectionLabel>SESSION LOAD</SectionLabel>
              <RingMeter value={64} label="64%" sub="57 / 90" tone="cyan" compact />
            </div>
            <div className="telemetry-unit telemetry-unit--nodes">
              <SectionLabel>READINESS</SectionLabel>
              <NodeMatrix active={7} total={9} tone="green" compact />
            </div>
          </div>

          <div className="plane plane--base plane--actions">
            <ActionButton tone="success">START</ActionButton>
            <ActionButton>TALK</ActionButton>
            <ActionButton>DONE</ActionButton>
            <ActionButton tone="primary" onClick={() => setDetail('directive')}>EXPAND</ActionButton>
          </div>
        </Surface>

        <Surface className="frame-cluster surface--ghost">
          <div className="plane plane--near plane--frame-head">
            <div>
              <SectionLabel>CURRENT FRAME</SectionLabel>
              <h2>{mock.frame.title}</h2>
            </div>
            <RingMeter value={mock.frame.confidence} label={`${mock.frame.confidence}%`} sub="CONF." tone="cyan" compact />
          </div>

          <div className="plane plane--base plane--metric-grid plane--metric-grid-compact">
            <Metric label="ELAPSED" value={mock.frame.elapsed} />
            <Metric label="APP" value={mock.frame.app} />
            <Metric label="FOCUS" value={mock.frame.focus} accent />
          </div>

          <div className="plane plane--far telemetry-strip frame-telemetry">
            <div className="telemetry-unit telemetry-unit--wide">
              <SectionLabel>FOCUS PROFILE</SectionLabel>
              <FocusBars values={[28, 56, 92, 72, 44, 65, 86, 53]} />
            </div>
            <div className="telemetry-unit">
              <SectionLabel>INPUT FLOW</SectionLabel>
              <TinyWave values={[22, 45, 78, 54, 33, 62, 90, 61, 46, 72]} tone="violet" compact />
            </div>
            <div className="telemetry-unit telemetry-unit--nodes">
              <SectionLabel>SOURCE LOCK</SectionLabel>
              <NodeMatrix active={5} total={6} tone="cyan" compact />
            </div>
          </div>

          <div className="plane plane--base plane--actions">
            <ActionButton tone="primary" onClick={() => setDetail('frame')}>EXPAND</ActionButton>
            <ActionButton>CORRECT</ActionButton>
            <ActionButton onClick={() => onView('observe')}>OPEN OBSERVE</ActionButton>
          </div>
        </Surface>
      </div>

      <div className="main-presence-stack">
        <MiraPresence />
        <Surface className="next-directive-surface surface--ghost surface--compact">
          <SectionLabel>NEXT DIRECTIVE</SectionLabel>
          <strong>{mock.directive.next}</strong>
          <MiniRouteTrack />
          <span>Route continuity remains flexible</span>
          <ActionButton tone="warning" onClick={() => onView('route')}>OPEN ROUTE</ActionButton>
        </Surface>
        <AutoInfoStrip />
      </div>

      <aside className="quick-jump-stack" aria-label="Context shortcuts">
        <QuickJump
          label="UPCOMING"
          value="Open Window · 00:30"
          meta="Next fixed / important state"
          tone="amber"
          onClick={() => onView('route')}
          visual={<MiniRouteTrack compact />}
        />
        <QuickJump
          label="SENTRY"
          value={`${mock.sentry.activeUnits} Units Active`}
          meta={mock.sentry.summary}
          onClick={() => onView('observe')}
          visual={<NodeMatrix active={3} total={4} tone="cyan" compact />}
        />
        <QuickJump
          label="LAPLACE"
          value={mock.laplace.state}
          meta={mock.laplace.note}
          tone="violet"
          onClick={() => onView('system')}
          visual={<TinyWave values={[26, 62, 40, 74, 56, 82, 49]} tone="violet" compact />}
        />
        <QuickJump
          label="SUB INTELLIGENCE"
          value={`${mock.subIntelligence.running} Running · ${mock.subIntelligence.ready} Ready`}
          meta="Background queue"
          tone="green"
          onClick={() => onView('system')}
          visual={<QueueBars values={[2, 5, 3, 4]} tone="green" />}
        />
      </aside>

      {detail === 'directive' && (
        <DetailSheet title="PRIMARY DIRECTIVE" onClose={() => setDetail(null)}>
          <DetailRows rows={[
            ['Current objective', mock.directive.objective],
            ['Recommended start', mock.directive.start],
            ['Target duration', mock.directive.duration],
            ['Current status', mock.directive.status],
            ['Next directive', mock.directive.next],
          ]} />
        </DetailSheet>
      )}
      {detail === 'frame' && (
        <DetailSheet title="CURRENT FRAME" onClose={() => setDetail(null)}>
          <DetailRows rows={[
            ['Activity', mock.frame.title],
            ['Elapsed', mock.frame.elapsed],
            ['Application', mock.frame.app],
            ['Focus', mock.frame.focus],
            ['Confidence', `${mock.frame.confidence}%`],
            ['Provenance', mock.frame.provenance],
          ]} />
        </DetailSheet>
      )}
    </div>
  )
}

export function RouteView() {
  return (
    <div className="view view--route">
      <ViewIntro eyebrow="TRAJECTORY / ROUTING" title="Today Route" copy="予定を全部同じ重さで見せず、現在・次・後続を明確に分ける。" />
      <div className="route-grid">
        {mock.route.map((item, index) => (
          <Surface key={item.time} className={`route-item route-item--${item.state}`}>
            <span className="route-index">0{index + 1}</span>
            <strong className="route-time">{item.time}</strong>
            <h2>{item.title}</h2>
            <MiniRouteTrack compact />
            <span className="route-state">{item.state.toUpperCase()}</span>
            <ActionButton>{item.state === 'now' ? 'CURRENT' : 'OPEN'}</ActionButton>
          </Surface>
        ))}
      </div>
      <Surface className="route-summary">
        <SectionLabel>TODAY ROUTE</SectionLabel>
        <div className="summary-stats">
          <Metric label="BLOCKS" value="7" />
          <Metric label="COMPLETED" value="3" />
          <Metric label="FLEXIBLE" value="2" />
          <Metric label="NEXT FIXED" value="23:40" accent />
        </div>
      </Surface>
    </div>
  )
}

export function ObserveView() {
  return (
    <div className="view view--observe">
      <ViewIntro eyebrow="REALITY / OBSERVATION" title="Observe" copy="現在の覂測と、その栺捯だけをここほ険約する。" />
      <div className="observe-grid">
        <Surface className="observe-primary">
          <SectionLabel>CURRENT FRAME</SectionLabel>
          <h1>{mock.frame.title}</h1>
          <div className="large-confidence"><strong>{mock.frame.confidence}%</strong><span>CLASSIFICATION CONFIDENCE</span></div>
          <div className="observe-visuals">
            <div className="visual-card visual-card--wide">
              <SectionLabel>ATTENTION HEAT</SectionLabel>
              <FocusBars values={[30, 48, 58, 82, 96, 74, 49, 32, 21]} />
            </div>
            <div className="visual-card">
              <SectionLabel>SCAN FLOW</SectionLabel>
              <TinyWave values={[18, 24, 57, 66, 89, 72, 58, 44]} tone="cyan" />
            </div>
          </div>
          <div className="summary-stats">
            <Metric label="ELAPSED" value={mock.frame.elapsed} />
            <Metric label="APPLICATION" value={mock.frame.app} />
            <Metric label="FOCUS" value={mock.frame.focus} accent />
            <Metric label="PROVENANCE" value={mock.frame.provenance} />
          </div>
          <div className="action-row">
            <ActionButton tone="primary">SCAN</ActionButton>
            <ActionButton>CORRECT</ActionButton>
            <ActionButton>FRAME HISTORY</ActionButton>
          </div>
        </Surface>
        <Surface className="sentry-surface">
          <SectionLabel>SENTRY</SectionLabel>
          <h2>{mock.sentry.activeUnits} Units Active</h2>
          <p>{mock.sentry.summary}</p>
          <NodeMatrix active={3} total={4} tone="cyan" />
          <div className="sentry-units">
            <StatusTile title="ROOM" value="PASSIVE" />
            <StatusTile title="NETWORK" value="ACTIVE" />
            <StatusTile title="ENVIRONMENT" value="ACTIVE" />
          </div>
          <ActionButton>OPEN SENTRY DETAIL</ActionButton>
        </Surface>
      </div>
    </div>
  )
}

export function SystemView() {
  return (
    <div className="view view--system">
      <ViewIntro eyebrow="SYSTEM / INTELLIGENCE" title="System" copy="LAPLACE、Sub Intelligence、Speech Modeなどの状態と操作を通常画面から分離する。" />
      <div className="system-grid">
        <Surface className="system-card system-card--laplace">
          <SectionLabel>LAPLACE</SectionLabel>
          <h2>{mock.laplace.state}</h2>
          <TinyWave values={[22, 38, 65, 44, 76, 58, 84, 47, 28]} tone="violet" />
          <p>{mock.laplace.note}</p>
          <div className="action-row"><ActionButton tone="primary">REQUEST ANALYSIS</ActionButton><ActionButton>LAST REPORT</ActionButton></div>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SUB INTELLIGENCE</SectionLabel>
          <h2>{mock.subIntelligence.running} Running · {mock.subIntelligence.ready} Ready</h2>
          <QueueBars values={[2, 5, 3, 4]} tone="green" />
          <p>長い処理はMAIN Conversationを塞がない。</p>
          <ActionButton>OPEN QUEUE</ActionButton>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SPEECH / OPERATION MODE</SectionLabel>
          <div className="mode-grid mode-grid--panel">
            <ActionButton tone="primary">NORMAL</ActionButton>
            <ActionButton>QUIET / VOICE</ActionButton>
            <ActionButton>QUIET / TEXT</ActionButton>
            <ActionButton>DND</ActionButton>
          </div>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SYSTEM HEALTH</SectionLabel>
          <div className="system-health-visual">
            <NodeMatrix active={4} total={4} tone="green" />
            <RingMeter value={91} label="91%" sub="STABILITY" tone="green" compact />
          </div>
          <div className="summary-stats">
            <Metric label="CORE" value="READY" accent />
            <Metric label="SENTRY" value="ACTIVE" />
            <Metric label="AFS" value="STANDBY" />
            <Metric label="GPU MODE" value="NORMAL" />
          </div>
        </Surface>
      </div>
    </div>
  )
}

function AutoInfoStrip() {
  return (
    <section className="auto-info" aria-label="Ambient information">
      <div><span>WEATHER</span><strong>26°</strong><small>CLEAR</small></div>
      <div><span>GPU</span><strong>32%</strong><i style={{ ['--fill' as string]: '32%' }} /></div>
      <div><span>AFS</span><strong>STANDBY</strong><small>BACKGROUND</small></div>
      <div><span>UPTIME</span><strong>02:14</strong><small>08</small></div>
    </section>
  )
}

function ViewIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="view-intro"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p>{copy}</p></header>
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return <div className="metric"><span>{label}</span><strong className={accent ? 'text-ok' : ''}>{value}</strong></div>
}

function StatusTile({ title, value }: { title: string; value: string }) {
  return <div className="status-tile"><span>{title}</span><strong>{value}</strong></div>
}

function DetailRows({ rows }: { rows: Array<[string, string]> }) {
  return <div className="detail-rows">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
}

function PhaseTrack() {
  const steps = [
    { label: 'FOUNDATION', state: 'done' },
    { label: 'PRACTICE', state: 'active' },
    { label: 'INTEGRATE', state: 'next' },
    { label: 'RECAP', state: 'future' },
  ]

  return (
    <div className="phase-track" aria-hidden="true">
      {steps.map((step, index) => (
        <div key={step.label} className={`phase-step phase-step--${step.state}`}>
          <span className="phase-step__index">0{index + 1}</span>
          <div className="phase-step__dot" />
          <strong>{step.label}</strong>
        </div>
      ))}
    </div>
  )
}

function RingMeter({ value, label, sub, tone, compact = false }: { value: number; label: string; sub: string; tone: 'cyan' | 'amber' | 'green' | 'violet'; compact?: boolean }) {
  return (
    <div className={`ring-meter ring-meter--${tone}${compact ? ' ring-meter--compact' : ''}`} style={{ ['--progress' as string]: `${value}%` }}>
      <div className="ring-meter__core">
        <strong>{label}</strong>
        <span>{sub}</span>
      </div>
    </div>
  )
}

function FocusBars({ values }: { values: number[] }) {
  return <div className="focus-bars">{values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}</div>
}

function TinyWave({ values, tone, compact = false }: { values: number[]; tone: 'cyan' | 'violet' | 'green'; compact?: boolean }) {
  return <div className={`tiny-wave tiny-wave--${tone}${compact ? ' tiny-wave--compact' : ''}`}>{values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}</div>
}

function NodeMatrix({ active, total, tone, compact = false }: { active: number; total: number; tone: 'cyan' | 'green'; compact?: boolean }) {
  return <div className={`node-matrix node-matrix--${tone}${compact ? ' node-matrix--compact' : ''}`}>{Array.from({ length: total }).map((_, index) => <span key={index} className={index < active ? 'is-active' : ''} />)}</div>
}

function MiniRouteTrack({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mini-route${compact ? ' mini-route--compact' : ''}`} aria-hidden="true">
      <span className="is-done" />
      <span className="is-done" />
      <span className="is-now" />
      <span className="is-next" />
      <span />
      <span />
    </div>
  )
}

function QueueBars({ values, tone }: { values: number[]; tone: 'green' | 'violet' }) {
  return <div className={`queue-bars queue-bars--${tone}`}>{values.map((value, index) => <span key={index} style={{ ['--cols' as string]: String(value) }} />)}</div>
}
