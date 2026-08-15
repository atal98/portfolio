import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { impactStats, profile, projects, stackLayers, timeline } from './data/portfolio'

const resumeUrl = `${import.meta.env.BASE_URL}atal-upadhyay-resume.pdf`
const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

function ArrowIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" /></svg>
}

function SparkIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m8 1 .9 5.1L14 8l-5.1.9L8 14l-.9-5.1L2 8l5.1-.9L8 1Z" /></svg>
}

function CanopyGraphic() {
  return <div className="canopy-graphic" aria-label="An abstract map of connected engineering systems" role="img">
    <div className="canopy-aura canopy-aura-one" />
    <div className="canopy-aura canopy-aura-two" />
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <path className="canopy-branch canopy-branch-main" d="M311 599C298 481 322 410 351 340c29-72 47-143 9-256C337 28 284 24 244 37" />
      <path className="canopy-branch" d="M343 365c-81-20-153-4-209 45-42 37-63 82-69 127" />
      <path className="canopy-branch" d="M337 376c75-30 152-23 213 21 42 31 67 76 80 125" />
      <path className="canopy-branch" d="M325 285c-75-26-126-72-152-140" />
      <path className="canopy-branch" d="M345 286c62-22 109-68 129-135" />
      <path className="canopy-branch canopy-branch-fine" d="M120 501c64 10 125-18 172-75M492 503c-58 1-111-25-153-77M232 132c44 23 78 58 99 107M449 135c-41 22-75 58-97 106" />
      <circle className="canopy-ring" cx="340" cy="369" r="73" />
      <circle className="canopy-ring canopy-ring-small" cx="340" cy="369" r="29" />
      <circle className="canopy-node canopy-node-core" cx="340" cy="369" r="9" />
      <circle className="canopy-node" cx="119" cy="502" r="7" />
      <circle className="canopy-node" cx="490" cy="504" r="7" />
      <circle className="canopy-node" cx="230" cy="132" r="7" />
      <circle className="canopy-node" cx="451" cy="135" r="7" />
    </svg>
    <span className="canopy-annotation canopy-annotation-one">01 / CONTEXT</span>
    <span className="canopy-annotation canopy-annotation-two">02 / SYSTEM</span>
    <span className="canopy-annotation canopy-annotation-three">03 / OUTCOME</span>
  </div>
}

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    document.documentElement.classList.add('motion-ready')
    const targets = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -32px 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Atal Upadhyay home" onClick={closeMenu}>atalos<span>.</span></a>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
      <span>{menuOpen ? 'Close' : 'Menu'}</span>
    </button>
    <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
      <a href="#work" onClick={closeMenu}>Work</a>
      <a href="#approach" onClick={closeMenu}>Approach</a>
      <a href="#journey" onClick={closeMenu}>Journey</a>
      <a href="#contact" onClick={closeMenu}>Contact</a>
    </nav>
    <a className="resume-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowIcon /></a>
  </header>
}

function Hero() {
  return <section id="top" className="hero">
    <div className="hero-copy" data-reveal>
      <p className="eyebrow"><span /> Field notes / 01</p>
      <h1>Useful systems, made <em>alive.</em></h1>
      <p className="hero-lede">{profile.summary} Based in {profile.location}.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#work">Explore the work <ArrowIcon /></a>
        <a className="text-link" href={`mailto:${profile.email}`}>Start a conversation <ArrowIcon /></a>
      </div>
    </div>
    <CanopyGraphic />
    <div className="hero-footer" data-reveal>
      <span>ENGINEERING PORTFOLIO / 2026</span>
      <span>SCROLL TO FOLLOW THE WORK <ArrowIcon /></span>
    </div>
  </section>
}

function Outcomes() {
  return <section className="outcomes section-shell" aria-label="Selected outcomes">
    <div className="section-rule"><span>01.</span><p>What changes when the system works</p><small>OUTCOMES</small></div>
    <div className="outcome-list">
      {impactStats.slice(0, 3).map((stat, index) => <article key={stat.label} data-reveal>
        <span>0{index + 1}</span><strong>{stat.number}</strong><div><b>{stat.label}</b><p>{stat.source}</p></div>
      </article>)}
    </div>
  </section>
}

function Work() {
  const [activeId, setActiveId] = useState(featuredProjects[0].id)
  const active = featuredProjects.find((project) => project.id === activeId) ?? featuredProjects[0]
  return <section id="work" className="work section-shell">
    <div className="section-rule"><span>02.</span><p>Selected systems</p><small>WORK</small></div>
    <div className="work-intro" data-reveal><h2>Complexity is only useful when it <em>clears</em> the path.</h2><p>Projects selected for the technical decisions behind them—not just the tools used to ship them.</p></div>
    <div className="work-layout" data-reveal>
      <div className="project-index" role="tablist" aria-label="Selected projects">
        {featuredProjects.map((project, index) => <button key={project.id} type="button" role="tab" aria-selected={project.id === active.id} className={project.id === active.id ? 'is-active' : ''} onClick={() => setActiveId(project.id)}>
          <span>0{index + 1}</span><b>{project.title}</b><i aria-hidden="true"><ArrowIcon /></i>
        </button>)}
      </div>
      <article className="project-feature" role="tabpanel" aria-live="polite">
        <div className="project-feature-top"><p className="eyebrow"><span /> {active.type}</p><span>{active.status}</span></div>
        <h3>{active.title}</h3>
        <p className="project-impact">{active.impact}</p>
        <div className="project-story"><div><span>The tension</span><p>{active.problem}</p></div><div><span>The response</span><p>{active.solution}</p></div></div>
        <div className="project-tags" aria-label="Technologies used">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </article>
    </div>
  </section>
}

function Approach() {
  return <section id="approach" className="approach section-shell">
    <div className="section-rule"><span>03.</span><p>How the work takes shape</p><small>APPROACH</small></div>
    <div className="approach-lede" data-reveal><h2>Every layer needs a clear <em>reason</em> to exist.</h2><p>I work from the boundary inward: understand the humans and systems involved, design reliable connections, and then make the result observable in production.</p></div>
    <ol className="approach-list">
      {stackLayers.map((layer, index) => <li key={layer.title} data-reveal><span>0{index + 1}</span><div><h3>{layer.title}</h3><p>{layer.tools.slice(0, 4).join(' · ')}</p></div><SparkIcon /></li>)}
    </ol>
  </section>
}

function Journey() {
  return <section id="journey" className="journey section-shell">
    <div className="section-rule"><span>04.</span><p>Growing scope through delivery</p><small>JOURNEY</small></div>
    <div className="journey-grid"><h2 data-reveal>Built through the <em>hard parts.</em></h2><div className="timeline">
      {timeline.map((item) => <article key={`${item.company}-${item.period}`} data-reveal><span>{item.period}</span><div><h3>{item.role}</h3><b>{item.company}</b><p>{item.highlight}</p></div></article>)}
    </div></div>
  </section>
}

function Contact() {
  return <section id="contact" className="contact">
    <div className="contact-copy" data-reveal><p className="eyebrow"><span /> Open to the next system</p><h2>Let’s make the difficult part <em>work.</em></h2><p>I’m open to software engineering roles involving backend systems, AI platforms, cloud infrastructure, and automation-heavy products.</p><a className="button button-light" href={`mailto:${profile.email}`}>Email me <ArrowIcon /></a></div>
    <div className="contact-links" data-reveal><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowIcon /></a></div>
  </section>
}

function Portfolio() {
  useReveal()
  return <main>
    <a className="skip-link" href="#work">Skip to selected work</a>
    <Header />
    <Hero />
    <Outcomes />
    <Work />
    <Approach />
    <Journey />
    <Contact />
    <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>AtalOS / Systems with a human edge.</span></footer>
  </main>
}

function App() { return <Portfolio /> }

createRoot(document.getElementById('root')).render(<App />)
