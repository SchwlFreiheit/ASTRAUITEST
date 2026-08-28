import { useState } from 'react'
import { ActionButton, SectionLabel } from './components'

export type SceneId = 'recovery' | 'reactivation' | 'report' | 'open'

export function SceneView({ scene, onExit, onScene }: { scene: SceneId; onExit: () => void; onScene: (scene: SceneId) => void }) {
  if (scene === 'recovery') return <RecoveryScene onExit={onExit} onReactivate={() => onScene('reactivation')} />
  if (scene === 'reactivation') return <ReactivationScene onExit={onExit} onReport={() => onScene('report')} />
  if (scene === 'report') return <LaplaceReportScene onExit={onExit} />
  return <OpenPhaseScene onExit={onExit} />
}

function RecoveryScene({ onExit, onReactivate }: { onExit: () => void; onReactivate: () => void }) {
  const [holding, setHolding] = useState(false)

  return (
    <div className="scene-space recovery-scene">
      <SceneTop label="RECOVERY STATE" meta="LOW POWER // PASSIVE SYSTEM" onExit={onExit} />
      <section className="recovery-core-field">
        <div className="recovery-core" aria-label="A.S.T.R.A. core dormant">
          <span className="recovery-core__halo recovery-core__halo--outer" />
          <span className="recovery-core__halo recovery-core__halo--inner" />
          <div className="recovery-core__center">
            <SectionLabel>A.S.T.R.A. CORE</SectionLabel>
            <strong>DORMANT</strong>
            <span>SYSTEM RECOVERY</span>
          </div>
        </div>
        <p>コアは低輝度で呼吸し、システムは停止せず必要な観測だけを維持する。</p>
      </section>
      <aside className="recovery-status recovery-status--left">
        <SectionLabel>PASSIVE STATUS</SectionLabel>
        <StatusLine label="SENTRY" value="PASSIVE" />
        <StatusLine label="VOICE" value="SUSPENDED" />
        <StatusLine label="NETWORK" value="WATCH" />
      </aside>
      <aside className="recovery-status recovery-status--right">
        <SectionLabel>AUTO FUSION SYSTEM</SectionLabel>
        <StatusLine label="AFS" value="STANDBY" />
        <StatusLine label="ARCHIVE" value="SYNCED" />
        <StatusLine label="NEXT CHECK" value="06:50" />
      </aside>
      <div className="recovery-clock"><span>LOCAL TIME</span><strong>23:18:42</strong><small>AUG 28 · FRI</small></div>
      <button
        className={`reactivate-control${holding ? ' is-holding' : ''}`}
        onMouseDown={() => setHolding(true)}
        onMouseUp={() => { setHolding(false); onReactivate() }}
        onMouseLeave={() => setHolding(false)}
        onTouchStart={() => setHolding(true)}
        onTouchEnd={() => { setHolding(false); onReactivate() }}
      >
        <i />
        <span>INITIATE REACTIVATION</span>
        <small>HOLD TO WAKE CORE</small>
      </button>
    </div>
  )
}

function ReactivationScene({ onExit, onReport }: { onExit: () => void; onReport: () => void }) {
  const steps = [
    ['01', 'INITIALIZATION', 'complete'],
    ['02', 'CORE WAKE', 'complete'],
    ['03', 'MIRA LINK', 'complete'],
    ['04', 'MIRA MORNING CHECK', 'complete'],
    ['05', 'LAPLACE ANALYSIS', 'active'],
    ['06', 'FORMAL REPORT', 'pending'],
    ['07', 'DAILY VECTOR', 'pending'],
    ['08', 'MAIN TERMINAL', 'pending'],
  ] as const

  return (
    <div className="scene-space reactivation-scene">
      <SceneTop label="REACTIVATION SEQUENCE" meta="ATTENTION LEVEL 03 // SYNCHRONIZATION" onExit={onExit} />
      <section className="reactivation-core-field">
        <div className="sync-core" style={{ ['--reactivation-progress' as string]: '72%' }}>
          <span className="sync-ring sync-ring--a" />
          <span className="sync-ring sync-ring--b" />
          <span className="sync-ring sync-ring--c" />
          <div><strong>72%</strong><span>REACTIVATION</span><small>IN PROGRESS</small></div>
        </div>
        <div className="convergence-field" aria-label="Data convergence in progress">
          {Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ ['--particle-index' as string]: index }} />)}
          <span>DATA CONVERGENCE</span>
        </div>
      </section>
      <section className="reactivation-steps">
        {steps.map(([id, label, state]) => (
          <div key={id} className={`reactivation-step reactivation-step--${state}`}>
            <span>{id}</span><i /><strong>{label}</strong><small>{state.toUpperCase()}</small>
          </div>
        ))}
      </section>
      <aside className="reactivation-agents">
        <div><SectionLabel>MIRA LINK</SectionLabel><strong>ONLINE</strong><small>PRESENCE STABLE</small></div>
        <div><SectionLabel>LAPLACE</SectionLabel><strong>ANALYZING</strong><small>VECTOR SYNTHESIS</small></div>
      </aside>
      <ActionButton tone="primary" onClick={onReport}>PREVIEW FORMAL REPORT</ActionButton>
    </div>
  )
}

function LaplaceReportScene({ onExit }: { onExit: () => void }) {
  return (
    <div className="scene-space report-scene">
      <SceneTop label="LAPLACE FORMAL REPORT" meta="MACHINE REPORT // DEPLOYED" onExit={onExit} />
      <section className="report-machine-field">
        <div className="report-machine-field__mark"><span /><span /><span /><b>L</b></div>
        <header><SectionLabel>DAILY VECTOR ANALYSIS</SectionLabel><h1>Operational Brief</h1><span>REPORT // 08-28-A</span></header>
        <div className="report-signal"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="report-findings">
          <ReportFinding index="01" title="PRIMARY VECTOR" value="Python Study" note="Priority maintained. Start window remains valid." tone="cyan" />
          <ReportFinding index="02" title="LOAD BALANCE" value="NOMINAL" note="No route correction required before next fixed event." tone="green" />
          <ReportFinding index="03" title="ATTENTION" value="WATCH" note="Protect focus through the current 90 minute block." tone="amber" />
        </div>
        <footer><span>LAPLACE // ANALYSIS COMPLETE</span><strong>RECOMMENDATION: EXECUTE CURRENT VECTOR</strong></footer>
      </section>
      <button className="report-return" onClick={onExit}>RETURN TO MIRA / MAIN</button>
    </div>
  )
}

function OpenPhaseScene({ onExit }: { onExit: () => void }) {
  return (
    <div className="scene-space open-phase-scene">
      <SceneTop label="OPEN PHASE" meta="AUTHORIZED FREE WINDOW" onExit={onExit} />
      <section className="open-phase-presence">
        <span className="open-phase-presence__bracket open-phase-presence__bracket--tl" />
        <span className="open-phase-presence__bracket open-phase-presence__bracket--tr" />
        <div><SectionLabel>MIRA</SectionLabel><strong>OPEN PHASE</strong><span>“自由時間だよ。次だけ忘れなければ大丈夫。”</span></div>
      </section>
      <section className="clearance-field">
        <SectionLabel>TEMPORARY CLEARANCE</SectionLabel>
        <div className="clearance-time"><strong>00:42:18</strong><span>AVAILABLE</span></div>
        <div className="clearance-vector"><span>NOW</span><i /><strong>OPEN</strong><i /><span>NEXT</span></div>
        <div className="clearance-next"><span>NEXT DIRECTIVE</span><strong>Recovery · 00:30</strong></div>
      </section>
      <aside className="open-phase-ambient">
        <StatusLine label="SENTRY" value="PASSIVE" />
        <StatusLine label="MIRA" value="AVAILABLE" />
        <StatusLine label="LAPLACE" value="STANDBY" />
        <StatusLine label="AFS" value="NORMAL" />
      </aside>
      <div className="open-phase-actions"><ActionButton tone="primary">TALK TO MIRA</ActionButton><ActionButton onClick={onExit}>RETURN MAIN</ActionButton></div>
    </div>
  )
}

function SceneTop({ label, meta, onExit }: { label: string; meta: string; onExit: () => void }) {
  return <header className="scene-top"><div><span>PROJECT: A.S.T.R.A.</span><strong>{label}</strong></div><div><small>{meta}</small><button onClick={onExit}>EXIT SCENE</button></div></header>
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return <div className="scene-status-line"><span>{label}</span><i /><strong>{value}</strong></div>
}

function ReportFinding({ index, title, value, note, tone }: { index: string; title: string; value: string; note: string; tone: 'cyan' | 'green' | 'amber' }) {
  return <div className={`report-finding report-finding--${tone}`}><span>{index}</span><div><small>{title}</small><strong>{value}</strong><p>{note}</p></div></div>
}
