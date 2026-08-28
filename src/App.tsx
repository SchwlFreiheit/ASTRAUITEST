import { useEffect, useMemo, useState } from 'react'
import { BottomDock, NavRail, TopBar, type ViewId } from './components'
import { MainView, ObserveView, RouteView, SystemView } from './views'

export default function App() {
  const [view, setView] = useState<ViewId>('main')
  const [now, setNow] = useState(() => new Date())
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    setNotice(null)
  }, [view])

  const time = useMemo(
    () => now.toLocaleTimeString('ja-JP', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    [now],
  )

  return (
    <div className="app-shell">
      <TopBar time={time} />
      <div className="app-body">
        <NavRail view={view} onView={setView} />
        <main className="view-host" key={view}>
          {view === 'main' && <MainView onView={setView} />}
          {view === 'route' && <RouteView />}
          {view === 'observe' && <ObserveView />}
          {view === 'system' && <SystemView />}
        </main>
      </div>
      <BottomDock onOpenPhase={() => setNotice('OPEN PHASE controls will open here.')} />
      {notice && <button className="toast" onClick={() => setNotice(null)}>{notice}<span>CLOSE</span></button>}
    </div>
  )
}
