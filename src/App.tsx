import { useEffect, useMemo, useState } from 'react'
import { BottomDock, NavRail, TopBar, type ViewId } from './components'
import { MainView } from './views'
import { ObserveSpatialView, RouteSpatialView, SystemSpatialView } from './secondaryViews'

function initialView(): ViewId {
  const value = new URLSearchParams(window.location.search).get('view')
  return value === 'route' || value === 'observe' || value === 'system' || value === 'main' ? value : 'main'
}

export default function App() {
  const [view, setView] = useState<ViewId>(initialView)
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

  const selectView = (next: ViewId) => {
    setView(next)
    const url = new URL(window.location.href)
    if (next === 'main') url.searchParams.delete('view')
    else url.searchParams.set('view', next)
    window.history.replaceState(null, '', url)
  }

  return (
    <div className="app-shell">
      <TopBar time={time} />
      <div className="app-body">
        <NavRail view={view} onView={selectView} />
        <main className="view-host" key={view}>
          {view === 'main' && <MainView onView={selectView} />}
          {view === 'route' && <RouteSpatialView />}
          {view === 'observe' && <ObserveSpatialView />}
          {view === 'system' && <SystemSpatialView />}
        </main>
      </div>
      <BottomDock onOpenPhase={() => setNotice('OPEN PHASE controls will open here.')} />
      {notice && <button className="toast" onClick={() => setNotice(null)}>{notice}<span>CLOSE</span></button>}
    </div>
  )
}
