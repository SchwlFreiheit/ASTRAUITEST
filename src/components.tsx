import { useState, type ReactNode } from 'react'

export type ViewId = 'main' | 'route' | 'observe' | 'system'

export function TopBar({ time }: { time: string }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <strong>A.S.T.R.A.</strong>
        <span>TACTICAL CORE // HOLOGRAPHIC ORBIT</span>
      </div>
      <TopDatum label="LOCAL TIME" value={time} />
      <TopDatum label="DATE" value="AUG 28 · FRI" />
      <TopDatum label="NEXT FIXED EVENT" value="23:40 · OPEN WINDOW" wide />
      <TopDatum label="LAPLACE" value="STANDBY" />
      <TopDatum label="SYSTEM" value="NOMINAL" accent />
    </header>
  )
}

function TopDatum({ label, value, wide, accent }: { label: string; value: string; wide?: boolean; accent?: boolean }) {
  return (
    <div className={`top-datum${wide ? ' top-datum--wide' : ''}`}>
      <span>{label}</span>
      <strong className={accent ? 'text-ok' : ''}>{value}</strong>
    </div>
  )
}

export function NavRail({ view, onView }: { view: ViewId; onView: (view: ViewId) => void }) {
  const items: Array<{ id: ViewId; title: string; subtitle: string }> = [
    { id: 'main', title: 'MAIN', subtitle: 'NOW / ACTION' },
    { id: 'route', title: 'ROUTE', subtitle: 'TODAY / NEXT' },
    { id: 'observe', title: 'OBSERVE', subtitle: 'FRAME / SENTRY' },
    { id: 'system', title: 'SYSTEM', subtitle: 'LAPLACE / SUB' },
  ]

  return (
    <nav className="nav-rail" aria-label="Primary views">
      {items.map((item) => (
        <button key={item.id} className={`nav-tile${view === item.id ? ' is-active' : ''}`} onClick={() => onView(item.id)}>
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </button>
      ))}
    </nav>
  )
}

export function ActionButton({ children, tone = 'default', onClick, pressed }: { children: ReactNode; tone?: 'default' | 'primary' | 'success' | 'warning'; onClick?: () => void; pressed?: boolean }) {
  return <button className={`action-button action-button--${tone}${pressed ? ' is-pressed' : ''}`} aria-pressed={pressed} onClick={onClick}>{children}</button>
}

export function Surface({ children, className = '', interactive = false, onClick }: { children: ReactNode; className?: string; interactive?: boolean; onClick?: () => void }) {
  return (
    <section className={`surface ${interactive ? 'surface--interactive' : ''} ${className}`} onClick={onClick}>
      {children}
    </section>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label">{children}</div>
}

export function MiraPresence() {
  return (
    <section className="mira-presence" aria-label="MIRA Live2D reserved area">
      <span className="corner corner--tl" />
      <span className="corner corner--tr" />
      <span className="corner corner--bl" />
      <span className="corner corner--br" />

      <PresenceState className="presence-state--voice" label="VOICE" value="READY" />
      <PresenceState className="presence-state--context" label="CONTEXT" value="SYNCED" />
      <PresenceState className="presence-state--route" label="ROUTE" value="LINKED" />
      <PresenceState className="presence-state--sentry" label="SENTRY" value="PASSIVE" />

      <div className="mira-presence__content">
        <strong>MIRA</strong>
        <span>ONLINE</span>
        <small>LIVE2D PRESENCE SLOT // RESERVED</small>
      </div>
    </section>
  )
}

function PresenceState({ className, label, value }: { className: string; label: string; value: string }) {
  return <div className={`presence-state ${className}`}><span>{label}</span><strong>{value}</strong></div>
}

export function QuickJump({ label, value, meta, onClick, tone = 'cyan' }: { label: string; value: string; meta: string; onClick: () => void; tone?: 'cyan' | 'violet' | 'green' | 'amber' }) {
  return (
    <button className={`quick-jump quick-jump--${tone}`} onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
      <b>OPEN</b>
    </button>
  )
}

export function BottomDock({ onOpenPhase }: { onOpenPhase: () => void }) {
  const [listening, setListening] = useState(false)
  const [modeOpen, setModeOpen] = useState(false)
  const [mode, setMode] = useState('NORMAL')
  const modes = ['NORMAL', 'QUIET / VOICE', 'QUIET / TEXT', 'DND']

  const stopListening = () => setListening(false)

  return (
    <footer className={`bottom-dock${listening ? ' is-listening' : ''}`}>
      <button
        className={`ptt-button${listening ? ' is-listening' : ''}`}
        aria-label="Push to talk"
        onPointerDown={() => setListening(true)}
        onPointerUp={stopListening}
        onPointerCancel={stopListening}
        onPointerLeave={stopListening}
      >PTT</button>

      <div className="voice-state">
        <span>MIRA</span>
        <strong>{listening ? 'LISTENING' : 'READY'}</strong>
      </div>

      <label className="text-entry">
        <span>MAIN THREAD / TEXT INPUT</span>
        <input placeholder="MIRAに話す、またはメッセージを入力…" />
      </label>

      <div className="dock-actions">
        <div className="mode-selector-wrap">
          <button className="mode-selector" aria-expanded={modeOpen} onClick={() => setModeOpen((value) => !value)}>
            <span>MODE</span>
            <strong>{mode}</strong>
            <b>CHANGE</b>
          </button>
          {modeOpen && (
            <div className="mode-menu" role="menu" aria-label="Speech mode">
              {modes.map((item) => (
                <button
                  key={item}
                  className={`mode-menu__item${item === mode ? ' is-selected' : ''}`}
                  onClick={() => { setMode(item); setModeOpen(false) }}
                >
                  <span>{item}</span>
                  <small>{item === mode ? 'CURRENT' : 'SELECT'}</small>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="open-phase-button" onClick={onOpenPhase}>OPEN PHASE</button>
      </div>
    </footer>
  )
}

export function DetailSheet({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="detail-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="detail-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <div>
            <span className="section-label">FOCUSED INFORMATION</span>
            <h2>{title}</h2>
          </div>
          <button className="close-button" onClick={onClose}>CLOSE</button>
        </header>
        <div className="detail-sheet__body">{children}</div>
      </aside>
    </div>
  )
}
