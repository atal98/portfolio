import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Badge, Tabs, TextField, Theme } from '@radix-ui/themes'
import L from 'leaflet'
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import '@radix-ui/themes/styles.css'
import 'leaflet/dist/leaflet.css'
import './styles.css'
import { profile, projects } from './data/portfolio'

const resumeUrl = `${import.meta.env.BASE_URL}atal-upadhyay-resume.pdf`
const initialProject = projects[0]
const iocRoute = [[25.0657, 55.1713], [23.7, 60.2], [21.6, 65.8], [19.35, 70.3], [18.9388, 72.8354]]
const iocRouteBounds = [[18.2, 54.2], [25.8, 73.8]]
const navigationIcon = (routeState) => L.divIcon({
  className: `leaflet-navigation-icon is-${routeState}`,
  html: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle class="navigation-disc" cx="20" cy="20" r="15"/><path class="navigation-arrow" d="m20 8 8 21-8-4-8 4 8-21Z"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
})

function projectFromUrl() {
  const projectId = new URLSearchParams(window.location.search).get('project')
  return projects.find((project) => project.id === projectId) ?? initialProject
}

const storyMeta = {
  'bpcl-ev': {
    mode: 'event-route',
    label: 'Event route',
    decision: 'Async orchestration',
    detail: 'Temporal workflows keep protocol events, retries, and charging-session state in order.',
    decisionIndex: 3,
    outcome: 'A faster, more dependable charging-session start.'
  },
  planzookie: {
    mode: 'context-pipeline',
    label: 'Grounded context pipeline',
    decision: 'Data before generation',
    detail: 'Census, transport, and parcel data are assembled before the LLM is allowed to create a planning section.',
    decisionIndex: 1,
    outcome: 'Structured reports rooted in a real planning context.'
  },
  'audiobook-ai': {
    mode: 'content-loop',
    label: 'Content loop',
    decision: 'Feedback at the product edge',
    detail: 'Playback, subtitles, and AI interactions feed one observable experience rather than isolated endpoints.',
    decisionIndex: 3,
    outcome: 'Faster AI responses across a cohesive listening experience.'
  },
  spotwork: {
    mode: 'trust-boundary',
    label: 'Trust-boundary map',
    decision: 'Tenant isolation',
    detail: 'Identity, resolution, and data boundaries are explicit before services scale on ECS.',
    decisionIndex: 4,
    outcome: 'A SaaS foundation built around trust, not only tables.'
  },
  rvin: {
    mode: 'knowledge-router',
    label: 'Knowledge router',
    decision: 'Merchant-specific knowledge',
    detail: 'Every channel is routed through a constrained knowledge boundary before an AI reply is produced.',
    decisionIndex: 2,
    outcome: 'Faster support without losing business context.'
  },
  'ioc-logistics': {
    mode: 'operations-line',
    label: 'Data-to-operations line',
    decision: 'Resilient ETL',
    detail: 'External vessel data is normalized and made dependable before it reaches operating teams.',
    decisionIndex: 1,
    outcome: 'Operational visibility with less manual reporting.'
  }
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" /></svg>
}

function BoltIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m11.5 2-6 9h4l-1 7 6-9h-4l1-7Z" /></svg>
}

function interpolateRoute(progress) {
  const scaled = progress * (iocRoute.length - 1)
  const index = Math.min(Math.floor(scaled), iocRoute.length - 2)
  const remainder = scaled - index
  const [fromLat, fromLng] = iocRoute[index]
  const [toLat, toLng] = iocRoute[index + 1]
  return [fromLat + (toLat - fromLat) * remainder, fromLng + (toLng - fromLng) * remainder]
}

function splitIocRoute(progress) {
  const scaled = progress * (iocRoute.length - 1)
  const index = Math.min(Math.floor(scaled), iocRoute.length - 2)
  const position = interpolateRoute(progress)

  return {
    position,
    completed: [...iocRoute.slice(0, index + 1), position],
    remaining: [position, ...iocRoute.slice(index + 1)]
  }
}

function RouteNavigationMarker({ position, routeState }) {
  return <Marker position={position} icon={navigationIcon(routeState)} keyboard={false} aria-label="Point B: MV Horizon current position">
    <Tooltip permanent direction="right" offset={[18, 0]}>B · MV Horizon</Tooltip>
  </Marker>
}

function IocRouteMap() {
  const [routeState, setRouteState] = useState('moving')
  const [progress, setProgress] = useState(.42)
  const reducedMotion = useReducedMotion()
  const route = splitIocRoute(progress)
  const isHolding = routeState === 'holding'

  useEffect(() => {
    if (reducedMotion || isHolding) return undefined
    const timer = window.setInterval(() => setProgress((current) => current >= .7 ? .42 : current + .003), 90)
    return () => window.clearInterval(timer)
  }, [isHolding, reducedMotion])

  const forwardColor = isHolding ? 'var(--route-hold)' : 'var(--route-forward)'
  const status = isHolding ? 'On hold at point B' : 'Heading to point C'
  const detail = isHolding ? 'Cargo clearance · next update 14:20 UTC' : 'Mumbai · ETA 14:20 UTC'

  return <>
    <div className="shipping-route" role="region" aria-label={`Route tracker from point A, Jebel Ali, through point B, MV Horizon, to point C, Mumbai. Status: ${status}.`}>
      <MapContainer className="ioc-map" bounds={iocRouteBounds} zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={route.completed} pathOptions={{ color: 'var(--accent)', weight: 3 }} />
        <Polyline positions={route.remaining} pathOptions={{ color: forwardColor, weight: 3, dashArray: isHolding ? '2 7' : '7 6' }} />
        <CircleMarker center={iocRoute[0]} radius={5} pathOptions={{ color: 'var(--accent)', fillColor: 'var(--surface)', fillOpacity: 1, weight: 2 }}><Tooltip permanent direction="bottom" offset={[0, 10]}>A · Jebel Ali</Tooltip></CircleMarker>
        <CircleMarker center={iocRoute[iocRoute.length - 1]} radius={5} pathOptions={{ color: forwardColor, fillColor: 'var(--surface)', fillOpacity: 1, weight: 2 }}><Tooltip permanent direction="top" offset={[0, -8]}>C · Mumbai</Tooltip></CircleMarker>
        <RouteNavigationMarker position={route.position} routeState={routeState} />
      </MapContainer>
      <div className="route-live-status" aria-live="polite"><strong>{status}</strong><span>{detail}</span></div>
      <div className="route-state-switch" role="group" aria-label="Route state">
        <button type="button" className={!isHolding ? 'is-active' : ''} aria-pressed={!isHolding} onClick={() => setRouteState('moving')}>In transit</button>
        <button type="button" className={isHolding ? 'is-active is-holding' : ''} aria-pressed={isHolding} onClick={() => setRouteState('holding')}>Hold</button>
      </div>
    </div>
    <div className="route-key" aria-label="Route tracker key">
      <span><i className="route-key-completed" />A → B · covered</span>
      <span><i className={isHolding ? 'route-key-holding' : 'route-key-forward'} />B → C · {isHolding ? 'on hold' : 'heading'}</span>
      <span>Point B is the live tracker.</span>
    </div>
  </>
}

function SystemStory({ project, compact = false }) {
  const story = storyMeta[project.id]
  const isDecision = (index) => index === story.decisionIndex

  return <figure className={`system-story story-${story.mode} ${compact ? 'is-compact' : ''}`} aria-labelledby={`story-title-${project.id}`}>
    <figcaption className="story-topline">
      <span id={`story-title-${project.id}`}>{story.label}</span>
      <span>{project.type}</span>
    </figcaption>
    <div key={project.id} className="story-canvas" role="img" aria-label={`${project.title}: ${project.architecture.join(', ')}. Key engineering decision: ${story.decision}.`}>
      <div className="story-route-line" aria-hidden="true" />
      <ol className="story-nodes">
        {project.architecture.map((layer, index) => <li key={layer} className={isDecision(index) ? 'is-decision' : ''} style={{ '--story-step': index }}>
          <span className="story-node-index">{String(index + 1).padStart(2, '0')}</span>
          <strong>{layer}</strong>
        </li>)}
      </ol>
    </div>
    <div className="story-caption">
      <p><span>Decision</span>{story.decision}</p>
      <p><span>Why it matters</span>{story.detail}</p>
      <p className="story-outcome"><span>Outcome</span>{story.outcome}</p>
    </div>
  </figure>
}

function SceneFrame({ project, children }) {
  const story = storyMeta[project.id]

  return <figure className={`project-scene scene-${project.id}`} aria-labelledby={`scene-title-${project.id}`}>
    <figcaption className="scene-topline">
      <span id={`scene-title-${project.id}`}>Illustrative system scene</span>
      <span>{story.label}</span>
    </figcaption>
    <div className="scene-surface">
      {children}
    </div>
    <div className="scene-note">
      <span>Engineering focus</span>
      <strong>{story.decision}</strong>
      <p>{story.outcome}</p>
    </div>
  </figure>
}

function BpclScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Charge network</strong><Badge color="blue" variant="soft">Live session</Badge></div>
    <div className="scene-search">
      <TextField.Root size="1" aria-label="Search location" value="Bandra, Mumbai" readOnly />
      <Badge color="gray" variant="outline">12 nearby</Badge>
    </div>
    <div className="charger-grid">
      <article><span className="charger-icon"><BoltIcon /></span><strong>CHR-1044</strong><small>50 kW · Available</small></article>
      <article className="is-active"><span className="charger-icon"><BoltIcon /></span><strong>CHR-2048</strong><small>Session in progress</small><div className="session-progress"><span /></div></article>
      <article><span className="charger-icon"><BoltIcon /></span><strong>CHR-1181</strong><small>22 kW · Available</small></article>
    </div>
    <div className="scene-event-line"><span>Start request</span><i /><span>Temporal workflow</span><i /><span>OCPI update</span></div>
  </SceneFrame>
}

function PlanzookieScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Planning workspace</strong><Badge color="blue" variant="soft">Draft report</Badge></div>
    <div className="planning-layout">
      <aside className="dataset-stack"><span>Grounded context</span><b>Census 2024</b><b>Transit access</b><b>Parcel data</b><small>3 sources selected</small></aside>
      <div className="planning-main">
        <TextField.Root size="1" aria-label="Planning brief" value="Neighbourhood mobility brief" readOnly />
        <div className="report-sheet"><small>Section 02 · Mobility</small><strong>Access improves along the eastern corridor.</strong><p>Transit coverage and parcel density were used to structure this recommendation.</p><div className="map-preview" aria-label="Illustrative planning map"><span /><span /><span /></div></div>
      </div>
    </div>
  </SceneFrame>
}

function SpotworkScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Spotwork</strong><Badge color="blue" variant="soft">Acme tenant</Badge></div>
    <Tabs.Root className="scene-tabs" defaultValue="roles">
      <Tabs.List aria-label="Tenant workspace views"><Tabs.Trigger value="roles">Roles</Tabs.Trigger><Tabs.Trigger value="jobs">Jobs</Tabs.Trigger><Tabs.Trigger value="data">Data</Tabs.Trigger></Tabs.List>
      <Tabs.Content value="roles" className="tenant-content">
        <div><span>Signed in as</span><strong>Operations admin</strong><small>Role-based access</small></div>
        <div className="tenant-boundary"><span>Tenant resolver</span><strong>acme.jobs</strong><small>Isolated data boundary</small></div>
      </Tabs.Content>
      <Tabs.Content value="jobs" className="tenant-content"><div><span>Open jobs</span><strong>24 active</strong><small>Acme workspace</small></div></Tabs.Content>
      <Tabs.Content value="data" className="tenant-content"><div><span>Database</span><strong>acme-prod</strong><small>Tenant isolated</small></div></Tabs.Content>
    </Tabs.Root>
  </SceneFrame>
}

function AudiobookScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Listen</strong><Badge color="blue" variant="soft">AI subtitle</Badge></div>
    <div className="audio-layout">
      <div className="cover-art" aria-hidden="true"><span>07</span></div>
      <div className="player-copy"><small>The design of everyday systems</small><strong>Chapter seven</strong><div className="waveform" aria-hidden="true">||||||||||||||||||||</div><div className="playback-line"><span>12:48</span><i /><span>36:10</span></div></div>
    </div>
    <div className="subtitle-state"><Badge color="gray" variant="outline">EN subtitle</Badge><span>“The route becomes useful when it is visible.”</span></div>
  </SceneFrame>
}

function RvinScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Merchant support</strong><Badge color="blue" variant="soft">3 channels</Badge></div>
    <div className="support-layout">
      <aside className="channel-list"><b>WhatsApp</b><b>Instagram</b><b>Email</b></aside>
      <div className="conversation"><small>Customer · 10:42</small><p>“Can I change the delivery address?”</p><div className="knowledge-answer"><Badge color="blue" variant="soft">Merchant policy</Badge><strong>Address changes are available before dispatch.</strong><small>Response ready for approval</small></div></div>
    </div>
  </SceneFrame>
}

function IocScene({ project }) {
  return <SceneFrame project={project}>
    <div className="scene-appbar"><strong>Vessel operations</strong><Badge color="blue" variant="soft">Route tracker</Badge></div>
    <IocRouteMap />
    <div className="vessel-table" role="table" aria-label="Illustrative vessel operations table">
      <div role="row" className="vessel-heading"><span role="columnheader">Vessel</span><span role="columnheader">ETA</span><span role="columnheader">Status</span></div>
      <div role="row"><strong role="cell">MV Horizon</strong><span role="cell">14:20</span><Badge role="cell" color="blue" variant="soft">On route</Badge></div>
      <div role="row"><strong role="cell">MV Coastline</strong><span role="cell">16:40</span><Badge role="cell" color="gray" variant="outline">ETL review</Badge></div>
      <div role="row"><strong role="cell">MV Meridian</strong><span role="cell">18:10</span><Badge role="cell" color="blue" variant="soft">Docked</Badge></div>
    </div>
  </SceneFrame>
}

function InterfaceScene({ project }) {
  const scenes = {
    'bpcl-ev': BpclScene,
    planzookie: PlanzookieScene,
    spotwork: SpotworkScene,
    'audiobook-ai': AudiobookScene,
    rvin: RvinScene,
    'ioc-logistics': IocScene
  }
  const Scene = scenes[project.id]
  return <Scene key={project.id} project={project} />
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reducedMotion
}

function useReveal(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return undefined
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.revealed = 'true'
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
    const targets = document.querySelectorAll('[data-reveal]')
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [reducedMotion])
}

function Intro({ reducedMotion }) {
  const [visible, setVisible] = useState(!reducedMotion)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false)
      return undefined
    }
    if (!visible) return undefined
    const leaveTimer = window.setTimeout(() => setLeaving(true), 850)
    const removeTimer = window.setTimeout(() => setVisible(false), 1150)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [reducedMotion, visible])

  if (!visible) return null

  return <div className={`intro ${leaving ? 'is-leaving' : ''}`} aria-label="Portfolio entry sequence">
    <div className="intro-inner">
      <p role="status">Loading selected work</p>
      <div className="intro-progress" aria-hidden="true"><span /></div>
      <span className="intro-number">00—100</span>
      <button type="button" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  </div>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <header className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
    <a className="brand" href="#top" onClick={closeMenu} aria-label="Atal Upadhyay, back to top">
      <span className="brand-full">ATAL / UPADHYAY</span>
      <span className="brand-compact" aria-hidden="true">AU</span>
    </a>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
      {menuOpen ? 'Close menu' : 'Open menu'}
    </button>
    <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
      <a href="#work" onClick={closeMenu}>Work</a>
      <a href="#contact" onClick={closeMenu}>Contact</a>
    </nav>
    <a className="resume-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowIcon /></a>
  </header>
}

function Hero({ project }) {
  return <section id="top" className="hero" aria-labelledby="portfolio-title">
    <div className="hero-copy" data-reveal>
      <p className="eyebrow">Software engineer · Mumbai, India</p>
      <h1 id="portfolio-title">Atal<br />Upadhyay</h1>
      <p className="hero-lede">I build reliable backend systems where AI, data, and cloud infrastructure meet.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#work">View selected work <ArrowIcon /></a>
        <a className="text-link" href={`mailto:${profile.email}`}>Start a conversation <ArrowIcon /></a>
      </div>
    </div>
    <div className="hero-map" data-reveal>
      <p className="hero-map-label">Currently selected</p>
      <InterfaceScene project={project} />
    </div>
    <div className="hero-footer" aria-label="Portfolio summary">
      <span>Work-first portfolio / 2026</span>
      <span>AI · backend · cloud systems</span>
    </div>
  </section>
}

function WorkNavigator({ activeProject, onSelect }) {
  const changeProject = (project) => {
    onSelect(project)
  }

  const onProjectKeyDown = (event, currentIndex) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? projects.length - 1
        : (currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + projects.length) % projects.length
    const nextProject = projects[nextIndex]
    changeProject(nextProject)
    document.getElementById(`project-tab-${nextProject.id}`)?.focus()
  }

  return <section id="work" className="work-navigator section-shell" aria-labelledby="work-heading">
    <div className="work-navigator-intro" data-reveal>
      <div className="section-label"><span>01</span><p>Work navigator</p></div>
      <h2 id="work-heading">Selected work, in context.</h2>
      <p className="section-lede">Choose a project to follow the operational problem, the engineering decision, and the system behind it.</p>
    </div>
    <div className="work-navigator-layout">
      <aside className="work-index-rail" aria-label="Project index">
        <div className="work-rail-context">
          <p className="eyebrow">Projects / {String(projects.length).padStart(2, '0')}</p>
          <p>Choose a case to update the full engineering story.</p>
        </div>
        <div className="work-project-list" role="tablist" aria-label="Project index">
          {projects.map((project, index) => <button
            id={`project-tab-${project.id}`}
            key={project.id}
            type="button"
            role="tab"
            aria-selected={project.id === activeProject.id}
            aria-controls="selected-project-panel"
            tabIndex={project.id === activeProject.id ? 0 : -1}
            onClick={() => changeProject(project)}
            onKeyDown={(event) => onProjectKeyDown(event, index)}
          >
            <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="project-index-copy"><strong>{project.title}</strong><small>{project.type}</small></span>
            <ArrowIcon />
          </button>)}
        </div>
      </aside>
      <div id="selected-project-panel" className="work-case-panel" role="tabpanel" aria-labelledby={`project-tab-${activeProject.id}`} aria-live="polite" tabIndex="-1">
        <article className="case-stage" key={activeProject.id}>
          <div className="case-heading">
            <div>
              <p className="case-number">Case {String(projects.indexOf(activeProject) + 1).padStart(2, '0')} / Selected</p>
              <p className="eyebrow">{activeProject.role}</p>
              <h3>{activeProject.title}</h3>
            </div>
            <p className="project-impact">{activeProject.impact}</p>
          </div>
          <div className="case-body">
            <p className="case-problem">{activeProject.problem}</p>
            <div className="selected-detail">
              <div className="detail-row"><span>System decision</span><p>{activeProject.solution}</p></div>
              <div className="detail-row"><span>Technical focus</span><p>{activeProject.tags.join(' · ')}</p></div>
              <div className="detail-row"><span>Engineering lesson</span><p>{activeProject.lesson}</p></div>
            </div>
          </div>
          <div className="case-system-practice">
            <div>
              <p className="eyebrow">System practice</p>
              <h4>Make the system legible before making it larger.</h4>
              <p>The work moves from the operational boundary to the internal flow, then back to an observable outcome.</p>
            </div>
            <div className="practice-panel">
              <p className="panel-project">{activeProject.title}</p>
              <SystemStory project={activeProject} compact />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
}

function Contact() {
  return <section id="contact" className="contact" aria-labelledby="contact-heading">
    <div className="section-shell contact-layout">
      <div data-reveal>
        <p className="eyebrow">Open to the next system</p>
        <h2 id="contact-heading">Let’s make the difficult part work.</h2>
        <p className="section-lede">Available for backend, AI workflow, and platform engineering conversations.</p>
      </div>
      <div className="contact-actions" data-reveal>
        <a className="button button-primary" href={`mailto:${profile.email}`}>Email Atal <ArrowIcon /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
        <a href={resumeUrl} target="_blank" rel="noreferrer">Read résumé <ArrowIcon /></a>
      </div>
    </div>
  </section>
}

function Portfolio() {
  const reducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(projectFromUrl)
  useReveal(reducedMotion)

  useEffect(() => {
    const syncProjectWithHistory = () => setActiveProject(projectFromUrl())
    window.addEventListener('popstate', syncProjectWithHistory)
    return () => window.removeEventListener('popstate', syncProjectWithHistory)
  }, [])

  const selectProject = (project) => {
    if (project.id === activeProject.id) return
    setActiveProject(project)
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.set('project', project.id)
    window.history.pushState({ project: project.id }, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
  }

  return <Theme accentColor="blue" grayColor="gray" radius="medium" scaling="95%">
    <Intro reducedMotion={reducedMotion} />
    <a className="skip-link" href="#work">Skip to work navigator</a>
    <Header />
    <main>
      <Hero project={activeProject} />
      <WorkNavigator activeProject={activeProject} onSelect={selectProject} />
      <Contact />
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>Software engineer · systems, made clearer.</span></footer>
  </Theme>
}

createRoot(document.getElementById('root')).render(<Portfolio />)
