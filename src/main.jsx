import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { bootLines, impactStats, profile, projects, stackLayers, statusCards, timeline } from './data/portfolio'

const resumeUrl = `${import.meta.env.BASE_URL}atal-upadhyay-resume.pdf`

function useBootText(lines) {
  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {
    const timers = lines.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((current) => [...current, line])
      }, 420 * (index + 1))
    )

    return () => timers.forEach(clearTimeout)
  }, [lines])

  return visibleLines
}

function useScrollReveal() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -72px 0px' }
    )

    revealTargets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])
}

function Navbar() {
  return (
    <header className="nav-shell">
      <a className="brand" href="#boot" aria-label="AtalOS home">
        <span className="brand-pulse" /> AtalOS
      </a>
      <nav>
        <a href="#systems">Systems</a>
        <a href="#architecture">Architecture</a>
        <a href="#stack">Stack</a>
        <a href="#impact">Impact</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function TerminalHero() {
  const visibleLines = useBootText(bootLines)

  return (
    <section id="boot" className="hero section-shell">
      <div className="hero-copy" data-reveal>
        <div className="eyebrow">Engineering Control Room</div>
        <h1>
          {profile.name}
          <span>{profile.role}</span>
        </h1>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button primary" href="#systems">Explore Systems</a>
          <a className="button ghost" href={resumeUrl} target="_blank" rel="noreferrer">View Resume</a>
        </div>
      </div>

      <div className="terminal-card" aria-label="AtalOS boot terminal" data-reveal>
        <div className="terminal-topbar">
          <span /> <span /> <span />
          <strong>atal@control-room:~</strong>
        </div>
        <div className="terminal-body">
          {visibleLines.map((line) => (
            <p key={line}><span>&gt;</span> {line}</p>
          ))}
          <p className="terminal-cursor"><span>&gt;</span> awaiting recruiter command_</p>
        </div>
      </div>
    </section>
  )
}

function StatusDashboard() {
  return (
    <section className="status-grid section-shell" aria-label="System status dashboard">
      {statusCards.map((card, index) => (
        <article className="status-card" key={card.label} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
          <div className="status-line">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
          <p>{card.detail}</p>
        </article>
      ))}
    </section>
  )
}

function ProjectCard({ project, selected, onSelect }) {
  return (
    <button
      className={`project-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(project)}
      aria-pressed={selected}
    >
      <div className="project-meta">
        <span>{project.type}</span>
        <span>{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.impact}</p>
      <div className="tag-row">
        {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="open-link">Open architecture →</div>
    </button>
  )
}

function ArchitectureFlow({ steps }) {
  return (
    <div className="architecture-flow">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flow-node">{step}</div>
          {index < steps.length - 1 && <div className="flow-line">↓</div>}
        </React.Fragment>
      ))}
    </div>
  )
}

function SystemsSection() {
  const [filter, setFilter] = useState('featured')
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const detailRef = useRef(null)

  const selectProject = (project) => {
    setSelectedProject(project)

    if (window.matchMedia('(max-width: 1040px)').matches) {
      window.requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  const filteredProjects = useMemo(() => {
    if (filter === 'featured') return projects.filter((project) => project.featured)
    if (filter === 'ai') return projects.filter((project) => project.tags.some((tag) => ['LangChain', 'OpenAI', 'Hugging Face', 'AI Pipelines', 'Whisper APIs', 'AI Voice'].includes(tag)))
    if (filter === 'cloud') return projects.filter((project) => project.tags.some((tag) => ['AWS ECS', 'AWS Lambda', 'Docker', 'Kubernetes', 'Redis'].includes(tag)))
    return projects
  }, [filter])

  useEffect(() => {
    if (!filteredProjects.some((project) => project.id === selectedProject.id)) {
      setSelectedProject(filteredProjects[0] || projects[0])
    }
  }, [filteredProjects, selectedProject.id])

  return (
    <section id="systems" className="section-shell systems-section">
      <div className="section-heading" data-reveal>
        <div className="eyebrow">/systems</div>
        <h2>Deployed systems, not just projects.</h2>
        <p>Each case study is organized around problem, architecture, ownership, tech choices, and measurable impact.</p>
      </div>

      <div className="command-bar" role="group" aria-label="Project filters" data-reveal>
        {['featured', 'all', 'ai', 'cloud'].map((option) => (
          <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>
            projects --{option}
          </button>
        ))}
      </div>

      <div className="systems-layout">
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={selectedProject.id === project.id}
              onSelect={selectProject}
            />
          ))}
        </div>

        <aside className="project-detail-card" ref={detailRef} data-reveal>
          <div className="detail-header">
            <span>ACTIVE_SYSTEM</span>
            <strong>{selectedProject.role}</strong>
          </div>
          <h3>{selectedProject.title}</h3>
          <div className="detail-block">
            <h4>Problem</h4>
            <p>{selectedProject.problem}</p>
          </div>
          <div className="detail-block">
            <h4>System I Built</h4>
            <p>{selectedProject.solution}</p>
          </div>
          <div className="detail-block">
            <h4>Impact</h4>
            <p>{selectedProject.impact}</p>
          </div>
          <div className="tag-row detail-tags">
            {selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </aside>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const featured = projects.filter((project) => ['bpcl-ev', 'planzookie', 'spotwork'].includes(project.id))

  return (
    <section id="architecture" className="section-shell architecture-section">
      <div className="section-heading compact" data-reveal>
        <div className="eyebrow">/architecture</div>
        <h2>Architecture lab</h2>
        <p>Three systems shown as recruiter-friendly backend flows.</p>
      </div>
      <div className="architecture-grid">
        {featured.map((project, index) => (
          <article className="architecture-card" key={project.id} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
            <div className="project-meta">
              <span>{project.title}</span>
              <span>{project.type}</span>
            </div>
            <ArchitectureFlow steps={project.architecture} />
            <p className="lesson"><strong>Engineering note:</strong> {project.lesson}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function StackSection() {
  return (
    <section id="stack" className="section-shell stack-section">
      <div className="section-heading compact" data-reveal>
        <div className="eyebrow">/stack</div>
        <h2>Technology stack as system layers</h2>
      </div>
      <div className="stack-layers">
        {stackLayers.map((layer, index) => (
          <article className="stack-layer" key={layer.title} data-reveal style={{ '--layer-index': index, '--reveal-delay': `${index * 60}ms` }}>
            <h3>{layer.title}</h3>
            <div className="tool-list">
              {layer.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section id="impact" className="section-shell impact-section">
      <div className="section-heading compact" data-reveal>
        <div className="eyebrow">/impact</div>
        <h2>Impact wall</h2>
        <p>Numbers that convert resume claims into a quick visual proof-of-work.</p>
      </div>
      <div className="impact-grid">
        {impactStats.map((stat, index) => (
          <article className="impact-card" key={`${stat.number}-${stat.label}`} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
            <small>{stat.source}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section className="section-shell timeline-section">
      <div className="section-heading compact" data-reveal>
        <div className="eyebrow">/career-log</div>
        <h2>Career mission log</h2>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article className="timeline-item" key={`${item.company}-${item.period}`} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
            <div>
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <strong>{item.company}</strong>
            </div>
            <p>{item.highlight}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="section-shell contact-section">
      <div className="contact-card" data-reveal>
        <div>
          <div className="eyebrow">/contact</div>
          <h2>Want to build something production-ready?</h2>
          <p>Open to backend, AI platform, cloud, microservices, and automation-heavy engineering roles.</p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={`mailto:${profile.email}`}>Email Me</a>
          <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="button ghost" href={resumeUrl} target="_blank" rel="noreferrer">Resume PDF</a>
        </div>
      </div>
    </section>
  )
}

function App() {
  useScrollReveal()

  return (
    <main>
      <div className="background-grid" />
      <Navbar />
      <TerminalHero />
      <StatusDashboard />
      <SystemsSection />
      <ArchitectureSection />
      <StackSection />
      <ImpactSection />
      <TimelineSection />
      <ContactSection />
      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built as AtalOS — Engineering Control Room</span>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
