import { useState } from 'react'
import { ActionButton, MiraPresence, QuickJump, SectionLabel, Surface, type ViewId } from './components'
import { mock } from './mock'

export function MainView({ onView }: { onView: (view: ViewId) => void }) {
  const [focus, setFocus] = useState<'directive' | 'frame' | null>(null)

  return (
    <div className={`view view--main${focus ? ` is-focus-${focus}` : ''}`}>
      <div className="main-primary-stack">
        <Surface className={`directive-surface spatial-surface${focus === 'directive' ? ' is-focused' : ''}`}>
          <div className="cluster-heading">
            <SectionLabel>PRIMARY DIRECTIVE</SectionLabel>
            <span className="cluster-state">ACTIVE // PRIORITY 01</span>
          </div>
          <h1>{mock.directive.title}</h1>
          <p className="lead-copy">{mock.directive.objective}</p>

          <div className="metric-row">
            <Metric label="START" value={mock.directive.start} />
            <Metric label="DURATION" value={mock.directive.duration} />
            <Metric label="STATUS" value={mock.directive.status} accent />
          </div>

          <div className="action-row">
            <ActionButton tone="success">START</ActionButton>
            <ActionButton>TALK</ActionButton>
            <ActionButton>DONE</ActionButton>
            <ActionButton tone="primary" pressed={focus === 'directive'} onClick={() => setFocus(focus === 'directive' ? null : 'directive')}>
              {focus === 'directive' ? 'COLLAPSE' : 'EXPAND'}
            </ActionButton>
          </div>

          {focus === 'directive' && (
            <div className="focus-extension focus-extension--directive">
              <FocusDatum label="NEXT DIRECTIVE" value={mock.directive.next} />
              <FocusDatum label="EST. COMPLETE" value="00:30" />
              <FocusDatum label="CLEARANCE" value="OPEN PHASE AVAILABLE" tone="amber" />
              <ActionButton onClick={() => onView('route')}>OPEN ROUTE</ActionButton>
            </div>
          )}
        </Surface>

        <Surface className={`frame-surface spatial-surface${focus === 'frame' ? ' is-focused' : ''}`}>
          <div className="frame-heading">
            <div>
              <SectionLabel>CURRENT FRAME</SectionLabel>
              <h2>{mock.frame.title}</h2>
            </div>
            <div className="confidence-badge"><strong>{mock.frame.confidence}%</strong><span>CONF.</span></div>
          </div>

          <div className="metric-row metric-row--compact">
            <Metric label="ELAPSED" value={mock.frame.elapsed} />
            <Metric label="APP" value={mock.frame.app} />
            <Metric label="FOCUS" value={mock.frame.focus} accent />
          </div>

          <div className="action-row">
            <ActionButton tone="primary" pressed={focus === 'frame'} onClick={() => setFocus(focus === 'frame' ? null : 'frame')}>
              {focus === 'frame' ? 'COLLAPSE' : 'EXPAND'}
            </ActionButton>
            <ActionButton>CORRECT</ActionButton>
            <ActionButton onClick={() => onView('observe')}>OPEN OBSERVE</ActionButton>
          </div>

          {focus === 'frame' && (
            <div className="focus-extension focus-extension--frame">
              <FocusDatum label="PROVENANCE" value={mock.frame.provenance} />
              <FocusDatum label="CLASSIFICATION" value="STUDY" />
              <FocusDatum label="CONFIDENCE" value={`${mock.frame.confidence}%`} tone="cyan" />
              <ActionButton onClick={() => onView('observe')}>OBSERVATION DETAIL</ActionButton>
            </div>
          )}
        </Surface>
      </div>

      <div className="main-presence-stack">
        <MiraPresence />
        <button className="next-directive-blade" onClick={() => onView('route')}>
          <span>NEXT DIRECTIVE</span>
          <strong>{mock.directive.next}</strong>
          <small>Route continuity remains flexible</small>
          <b>OPEN ROUTE</b>
        </button>
      </div>

      <aside className="quick-jump-stack" aria-label="Context shortcuts">
        <QuickJump label="UPCOMING" value="Open Window · 00:30" meta="Next fixed / important state" tone="amber" onClick={() => onView('route')} />
        <QuickJump label="SENTRY" value={`${mock.sentry.activeUnits} Units Active`} meta={mock.sentry.summary} onClick={() => onView('observe')} />
        <QuickJump label="LAPLACE" value={mock.laplace.state} meta={mock.laplace.note} tone="violet" onClick={() => onView('system')} />
        <QuickJump label="SUB INTELLIGENCE" value={`${mock.subIntelligence.running} Running · ${mock.subIntelligence.ready} Ready`} meta="Background queue" tone="green" onClick={() => onView('system')} />
      </aside>
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
      <ViewIntro eyebrow="REALITY / OBSERVATION" title="Observe" copy="現在の観測と、その根拠だけをここへ集約する。" />
      <div className="observe-grid">
        <Surface className="observe-primary">
          <SectionLabel>CURRENT FRAME</SectionLabel>
          <h1>{mock.frame.title}</h1>
          <div className="large-confidence"><strong>{mock.frame.confidence}%</strong><span>CLASSIFICATION CONFIDENCE</span></div>
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
          <p>{mock.laplace.note}</p>
          <div className="action-row"><ActionButton tone="primary">REQUEST ANALYSIS</ActionButton><ActionButton>LAST REPORT</ActionButton></div>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SUB INTELLIGENCE</SectionLabel>
          <h2>{mock.subIntelligence.running} Running · {mock.subIntelligence.ready} Ready</h2>
          <p>長い処理はMAIN Conversationを塞がない。</p>
          <ActionButton>OPEN QUEUE</ActionButton>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SPEECH / OPERATION MODE</SectionLabel>
          <div className="mode-grid">
            <ActionButton tone="primary">NORMAL</ActionButton>
            <ActionButton>QUIET / VOICE</ActionButton>
            <ActionButton>QUIET / TEXT</ActionButton>
            <ActionButton>DND</ActionButton>
          </div>
        </Surface>
        <Surface className="system-card">
          <SectionLabel>SYSTEM HEALTH</SectionLabel>
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

function ViewIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="view-intro"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p>{copy}</p></header>
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return <div className="metric"><span>{label}</span><strong className={accent ? 'text-ok' : ''}>{value}</strong></div>
}

function FocusDatum({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'amber' | 'cyan' }) {
  return <div className={`focus-datum focus-datum--${tone}`}><span>{label}</span><strong>{value}</strong></div>
}

function StatusTile({ title, value }: { title: string; value: string }) {
  return <div className="status-tile"><span>{title}</span><strong>{value}</strong></div>
}
