import { useState, type ReactNode } from 'react'

export type ViewId = 'main' | 'route' | 'observe' | 'system'

type ModeId = 'NORMAL' | 'QUIET / VOICE' | 'QUIET / TEXT' | 'DND'

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

export function ActionButton({ children, tone = 'default', onClick }: { children: ReactNode; tone?: 'default' | 'primary' | 'success' | 'warning'; onClick?: () => void }) {
  return <button className={`action-button action-button--${tone}`} onClick={onClick}>{children}</button>
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

      <div className="mira-band mira-band--top">
        <StatusPill label="VOICE" value="READY" />
        <StatusPill label="CONTEXT" value="SYNCED" align="end" />
      </div>

      <div className="mira-presence__content">
        <div className="presence-lattice" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, index) => <span key={index} />)}
        </div>
        <strong>MIRA</strong>
        <span>ONLINE</span>
        <small>LIVE2D PRESENCE SLOT // RESERVED</small>
      </div>

      <div className="mira-band mira-band--bottom">
        <StatusPill label="ROUTE" value="LINKED" />
        <StatusPill label="SENTRY" value="PASSIVE" align="end" />
      </div>
    </section>
  )
}

function StatusPill({ label, value, align }: { label: string; value: string; align?: 'start' | 'end' }) {
  return (
    <div className={`status-pill${align === 'end' ? ' status-pill--end' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function QuickJump({ label, value, meta, onClick, tone = 'cyan', visual }: { label: string; value: string; meta: string; onClick: () => void; tone?: 'cyan' | 'violet' | 'green' | 'amber'; visual?: ReactNode }) {
  return (
    <button className={`quick-jump quick-jump--${tone}`} onClick={onClick}>
      <div className="quick-jump__copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
      {visual && <div className="quick-jump__visual">{visual}</div>}
      <b>OPEN</b>
    </button>
  )
}

export function BottomDock({ onOpenPhase }: { onOpenPhase: () => void }) {
  const [mode, setMode] = useState<ModeId>('NORMAL')
  const [modeMenuOpen, setModeMenuOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const modes: ModeId[] = ['NORMAL', 'QUIET / VOICE', 'QUIET / TEXT', 'DND']

  return (
    <footer className="bottom-dock">
      <button
        className={`ptt-button${listening ? ' is-listening' : ''}`}
        aria-label="Push to talk"
        onMouseDown={() => setListening(true)}
        onMouseUp={() => setListening(false)}
        onMouseLeave={() => setListening(false)}
        onTouchStart={() => setListening(true)}
        onTouchEnd={() => setListening(false)}
      >
        {listening ? 'LIVE' : 'PTT'}
      </button>
      <div className="voice-state">
        <span>MIRA</span>
        <strong>{listening ? 'LISTENING' : 'READY'}</strong>
      </div>
      <label className="text-entry">
        <span>MAIN THREAD / TEXT INPUT</span>
        <input placeholder="MIRAに話す、またはメッセージを入力…" />
      </label>
      <div className="speech-controls">
        <div className="mode-stack">
          <button className="mode-summary" onClick={() => setModeMenuOpen((open) => !open)}>
            <span>MODE</span>
            <strong>{mode}</strong>
            <b>CHANGE</b>
          </button>
          {modeMenuOpen && (
            <div className="mode-menu" role="menu" aria-label="Speech mode">
              {modes.map((item) => (
                <button
                  key={item}
                  className={`mode-menu__item${mode === item ? ' is-selected' : ''}`}
                  onClick={() => {
                    setMode(item)
                    setModeMenuOpen(false)
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="mode-button mode-button--accent" onClick={onOpenPhase}>OPEN PHASE</button>
      </div>
    </footer>
  )
}

export function DetailSheet({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const [pinned, setPinned] = useState(false)
  const [spread, setSpread] = useState(true)

  return (
    <div
      className={`detail-backdrop${pinned ? ' is-pinned' : ''}`}
      role="presentation"
      onMouseDown={(event) => !pinned && event.target === event.currentTarget && onClose()}
    >
      <aside className={`detail-sheet${spread ? ' is-spread' : ' is-compact'}`} role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <div>
            <span className="section-label">FOCUSED INFORMATION</span>
            <h2>{title}</h2>
          </div>
          <div className="detail-operations" aria-label="Spatial information operations">
            <button className={`detail-op${pinned ? ' is-active' : ''}`} onClick={() => setPinned((value) => !value)}>
              {pinned ? 'UNPIN' : 'PIN'}
            </button>
            <button className={`detail-op${spread ? ' is-active' : ''}`} onClick={() => setSpread((value) => !value)}>
              {spread ? 'COMPACT' : 'SPREAD'}
            </button>
            <button className="close-button" onClick={onClose}>COLLAPSE</button>
          </div>
        </header>
        <div className="detail-sheet__body">{children}</div>
      </aside>
    </div>
  )
}
