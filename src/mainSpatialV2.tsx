import { useState } from 'react'
import { mock } from './mock'
import type { ViewId } from './components'

type FocusId = 'directive' | 'frame' | 'route' | 'sentry' | 'laplace' | null

function initialFocus(): FocusId {
  const value = new URLSearchParams(window.location.search).get('focus')
  return value === 'directive' || value === 'frame' || value === 'route' || value === 'sentry' || value === 'laplace' ? value : null
}

export function MainSpatialV2({ onView }: { onView: (view: ViewId) => void }) {
  const [focus, setFocus] = useState<FocusId>(initialFocus)

  const setSpatialFocus = (next: FocusId) => {
    setFocus(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('focus', next)
    else url.searchParams.delete('focus')
    window.history.replaceState(null, '', url)
  }
  const toggle = (next: Exclude<FocusId, null>) => setSpatialFocus(focus === next ? null : next)

  return (
    <div className="holo-main" data-focus={focus ?? 'none'}>
      <div className="holo-ambient holo-ambient--cyan" aria-hidden="true" />
      <div className="holo-ambient holo-ambient--violet" aria-hidden="true" />

      <div className="holo-route-axis" aria-label="Current vector">
        <span className="holo-route-axis__label">CURRENT VECTOR</span>
        <i className="holo-route-axis__line" />
        <i className="holo-route-axis__pulse" />
        <div className="holo-route-axis__node holo-route-axis__node--now"><b /> <span>NOW</span></div>
        <div className="holo-route-axis__node holo-route-axis__node--next"><b /> <span>NEXT</span></div>
        <div className="holo-route-axis__node holo-route-axis__node--later"><b /> <span>LATER</span></div>
      </div>

      <button className="holo-layer holo-directive" onClick={() => toggle('directive')} aria-pressed={focus === 'directive'}>
        <span className="holo-layer__depth">INTENT // FOREGROUND</span>
        <div className="holo-layer__head"><span>PRIMARY DIRECTIVE</span><strong>PRIORITY 01</strong></div>
        <h1>{mock.directive.title}</h1>
        <p>{mock.directive.objective}</p>
        <div className="holo-progress" aria-label="session progress 64 percent"><i style={{ width: '64%' }} /></div>
        <div className="holo-layer__summary">
          <span><small>START</small><strong>{mock.directive.start}</strong></span>
          <span><small>DURATION</small><strong>{mock.directive.duration}</strong></span>
          <span><small>STATE</small><strong className="is-green">{mock.directive.status}</strong></span>
        </div>
        <div className="holo-layer__expanded">
          <div className="mission-track"><span className="is-done">FOUNDATION</span><span className="is-now">PRACTICE</span><span>INTEGRATE</span><span>RECAP</span></div>
          <div className="holo-actions"><button type="button" className="is-primary" onClick={(event) => event.stopPropagation()}>START</button><button type="button" onClick={(event) => event.stopPropagation()}>TALK</button><button type="button" onClick={(event) => event.stopPropagation()}>DONE</button></div>
        </div>
        <span className="holo-corner holo-corner--a" /><span className="holo-corner holo-corner--b" />
      </button>

      <button className="holo-layer holo-frame" onClick={() => toggle('frame')} aria-pressed={focus === 'frame'}>
        <span className="holo-layer__depth">REALITY // OBSERVED</span>
        <div className="holo-layer__head"><span>CURRENT FRAME</span><strong>{mock.frame.confidence}% CONF.</strong></div>
        <h2>{mock.frame.title}</h2>
        <div className="frame-pulse-line"><i /></div>
        <div className="holo-layer__summary"><span><small>ELAPSED</small><strong>{mock.frame.elapsed}</strong></span><span><small>APP</small><strong>{mock.frame.app}</strong></span><span><small>FOCUS</small><strong className="is-green">{mock.frame.focus}</strong></span></div>
        <div className="holo-layer__expanded">
          <div className="focus-profile" aria-hidden="true">{[28,44,71,92,67,83,55,34,61,78,49].map((value,index)=><i key={index} style={{height:`${value}%`}} />)}</div>
          <div className="holo-actions"><button type="button" className="is-primary" onClick={(event) => { event.stopPropagation(); onView('observe') }}>OPEN OBSERVE</button><button type="button" onClick={(event) => event.stopPropagation()}>CORRECT</button></div>
        </div>
        <span className="scan-line" aria-hidden="true" />
        <span className="holo-corner holo-corner--a" /><span className="holo-corner holo-corner--b" />
      </button>

      <section className="holo-mira" aria-label="MIRA presence reserved for Live2D">
        <div className="holo-mira__field" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <span className="holo-mira__label">MIRA PRESENCE</span><strong>MIRA</strong><span className="holo-mira__state">ONLINE</span><small>LIVE2D SLOT // RESERVED</small>
        <div className="holo-mira__status"><span>VOICE <b>READY</b></span><span>CONTEXT <b>SYNCED</b></span></div>
      </section>

      <button className="holo-route-portal" onClick={() => toggle('route')} aria-pressed={focus === 'route'}>
        <span>NEXT DIRECTIVE</span><strong>{mock.directive.next}</strong>
        <div className="route-mini">{mock.route.map((item,index)=><i key={item.time} className={index===0?'is-now':index===1?'is-next':''}><b>{item.time}</b><small>{item.title}</small></i>)}</div>
        <div className="route-portal-expanded"><p>NOWを基準に、後続は距離として保持。</p><button type="button" onClick={(event)=>{event.stopPropagation();onView('route')}}>OPEN ROUTE</button></div>
      </button>

      <aside className="holo-edge-deck" aria-label="Subsystem edge deck">
        <button className="edge-anchor edge-anchor--sentry" onClick={() => toggle('sentry')} aria-pressed={focus === 'sentry'}><span>SENTRY</span><strong>{mock.sentry.activeUnits} LINKED</strong><i><b /><b /><b /></i><small>{mock.sentry.summary}</small></button>
        <button className="edge-anchor edge-anchor--laplace" onClick={() => toggle('laplace')} aria-pressed={focus === 'laplace'}><span>LAPLACE</span><strong>{mock.laplace.state}</strong><i className="laplace-wave">{[22,51,34,72,43,64,29].map((v,i)=><b key={i} style={{height:`${v}%`}} />)}</i><small>{mock.laplace.note}</small></button>
        <button className="edge-anchor edge-anchor--sub" onClick={() => onView('system')}><span>SUB INTELLIGENCE</span><strong>{mock.subIntelligence.running} RUNNING / {mock.subIntelligence.ready} READY</strong><i className="queue-dots"><b/><b/><b/><b/></i><small>BACKGROUND QUEUE</small></button>
      </aside>

      {focus === 'sentry' && <section className="focus-deployment focus-deployment--cyan"><header><span>SENTRY / FOCUSED</span><button onClick={() => setSpatialFocus(null)}>COLLAPSE</button></header><strong>3 OBSERVATION CHANNELS</strong><div className="deployment-lanes"><i><b style={{width:'62%'}}/></i><i><b style={{width:'96%'}}/></i><i><b style={{width:'88%'}}/></i></div><button onClick={() => onView('observe')}>OPEN OBSERVE</button></section>}
      {focus === 'laplace' && <section className="focus-deployment focus-deployment--violet"><header><span>LAPLACE / MACHINE ANALYSIS</span><button onClick={() => setSpatialFocus(null)}>COLLAPSE</button></header><strong>STANDBY</strong><div className="deployment-signal">{[18,35,70,42,86,54,31,74,45,62,26].map((v,i)=><i key={i} style={{height:`${v}%`}} />)}</div><button onClick={() => onView('system')}>OPEN SYSTEM</button></section>}

      <div className="holo-instruction" aria-live="polite">{focus === null ? 'SELECT INFORMATION // ELEMENT MOVES TO FOREGROUND' : 'FOCUS DEPLOYED // SELECT AGAIN TO COLLAPSE'}</div>
    </div>
  )
}
