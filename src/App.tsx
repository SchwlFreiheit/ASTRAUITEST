import { useEffect, useMemo, useState } from 'react'
import { BottomDock, NavRail, TopBar, type ViewId } from './components'
import { MainSpatialV2 } from './mainSpatialV2'
import { ObserveSpatialView, RouteSpatialView, SystemSpatialView } from './secondaryViews'
import { SceneView, type SceneId } from './sceneViews'

function initialView(): ViewId {
  const value = new URLSearchParams(window.location.search).get('view')
  return value === 'route' || value === 'observe' || value === 'system' || value === 'main' ? value : 'main'
}

function initialScene(): SceneId | null {
  const value = new URLSearchParams(window.location.search).get('scene')
  return value === 'recovery' || value === 'reactivation' || value === 'report' || value === 'open' ? value : null
}

export default function App() {
  const [view, setView] = useState<ViewId>(initialView)
  const [scene, setScene] = useState<SceneId | null>(initialScene)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const time = useMemo(
    () => now.toLocaleTimeString('ja-JP', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    [now],
  )

  const selectView = (next: ViewId) => {
    setScene(null)
    setView(next)
    const url = new URL(window.location.href)
    url.searchParams.delete('scene')
    if (next === 'main') url.searchParams.delete('view')
    else url.searchParams.set('view', next)
    window.history.replaceState(null, '', url)
  }

  const selectScene = (next: SceneId | null) => {
    setScene(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('scene', next)
    else url.searchParams.delete('scene')
    window.history.replaceState(null, '', url)
  }

  if (scene) {
    return <SceneView scene={scene} onExit={() => selectScene(null)} onScene={(next) => selectScene(next)} />
  }

  return (
    <div className="app-shell">
      <TopBar time={time} />
      <div className="app-body">
        <NavRail view={view} onView={selectView} />
        <main className="view-host" key={view}>
          {view === 'main' && <MainSpatialV2 onView={selectView} />}
          {view === 'route' && <RouteSpatialView />}
          {view === 'observe' && <ObserveSpatialView />}
          {view === 'system' && <SystemSpatialView />}
        </main>
      </div>
      <BottomDock onOpenPhase={() => selectScene('open')} />
      <button className="scene-peek" onClick={() => selectScene('recovery')}>RECOVERY</button>
    </div>
  )
}
