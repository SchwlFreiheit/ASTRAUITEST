import type { ReactNode } from 'react'

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
      <div className="mira-presence__content">
        <strong>MIRA</strong>
        <span>ONLINE</span>
        <small>LIVE2D PRESENCE SLOT // RESERVED</small>
      </div>
    </section>
  )
}

export function QuickJump({ label, value, meta, onClick, tone = 'cyan' }: { label: string; value: string; meta: string; onClick: () => void; tone?: 'cyan' | 'violet' | 'green' | 'amber' }) {
  return (
    <button className={`quick-jump quick-jump--${tone}`} onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
      <b>OPEN →</b>
    </button>
  )
}

export function BottomDock({ onOpenPhase }: { onOpenPhase: () => void }) {
  return (
    <footer className="bottom-dock">
      <button className="ptt-button" aria-label="Push to talk">PTT</button>
      <div className="voice-state">
        <span>MIRA</span>
        <strong>READY</strong>
      </div>
      <label className="text-entry">
        <span>MAIN THREAD / TEXT INPUT</span>
        <input placeholder="MIRAに話す、またはメッセージを入力…" />
      </label>
      <div className="speech-controls">
        <button className="mode-button is-selected">NORMAL</button>
        <button className="mode-button">QUIET / VOICE</button>
        <button className="mode-button">QUIET / TEXT</button>
        <button className="mode-button">DND</button>
        <button className="mode-button mode-button--accent" onClick={onOpenPhase}>OPEN PHASE</button>
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
