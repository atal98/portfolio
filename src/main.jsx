import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './styles.css'
import { impactStats, profile, projects, stackLayers, timeline } from './data/portfolio'
import ExperienceShell from './experience/ExperienceShell'

gsap.registerPlugin(ScrollTrigger)

const resumeUrl = `${import.meta.env.BASE_URL}atal-upadhyay-resume.pdf`
const featuredProjects = projects.filter((project) => ['bpcl-ev', 'spotwork', 'planzookie'].includes(project.id))
const supportingProjects = projects.filter((project) => !featuredProjects.includes(project))

function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -48px 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
}

function useMatrixInteraction() {
  useMotionSystem()
  useSystemCanvas()
  useEffect(() => {
    if (!document.querySelector('main')) return undefined
    if (!window.matchMedia('(hover:hover)').matches) return undefined
    const main = document.querySelector('main')
    const targetSelector = 'a, button, h1, h2, h3, .hero-copy p, .section-title p, .case-study, .more-work article, .capability-grid article, .timeline article, .contact'
    let timer
    const setPosition = (event, name) => {
      document.documentElement.style.setProperty(`--${name}-x`, `${(event.clientX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty(`--${name}-y`, `${(event.clientY / window.innerHeight) * 100}%`)
    }
    const onMove = (event) => {
      setPosition(event, 'pointer')
      if (event.target.closest(targetSelector)) { setPosition(event, 'matrix'); main?.classList.add('matrix-engaged') } else main?.classList.remove('matrix-engaged')
    }
    const onClick = (event) => {
      if (!event.target.closest(targetSelector)) return
      setPosition(event, 'matrix'); main?.classList.add('matrix-pulse')
      clearTimeout(timer); timer = setTimeout(() => main?.classList.remove('matrix-pulse'), 520)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('click', onClick, { passive: true })
    return () => { clearTimeout(timer); window.removeEventListener('pointermove', onMove); window.removeEventListener('click', onClick) }
  }, [])
}

function useMotionSystem() {
  useEffect(() => {
    if (!document.querySelector('.hero')) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 })
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    lenis.on('scroll', ScrollTrigger.update)
    const context = gsap.context(() => {
      gsap.utils.toArray('.section-title').forEach((title) => gsap.fromTo(title,
        { y: 34, opacity: 0.2 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 82%', once: true } }
      ))
      gsap.to('.signal-field', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    })
    ScrollTrigger.refresh()
    return () => { context.revert(); lenis.destroy(); gsap.ticker.remove(tick) }
  }, [])
}

function useSystemCanvas() {
  const canvasRef = React.useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current || document.createElement('canvas')
    const host = document.querySelector('.signal-field')
    if (!host) return undefined
    if (!canvas.parentNode && host) host.prepend(canvas)
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover)').matches) return undefined
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 6
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    const group = new THREE.Group()
    scene.add(group)
    const points = [[0, 0, 0], [-1.85, 1.05, 0.15], [1.7, 1.15, -0.2], [1.15, -1.45, 0.3], [-1.2, -1.35, -0.25]]
    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points.flat(), 3))
    group.add(new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x99e5ba, size: 0.09, transparent: true, opacity: 0.9 })))
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points.slice(1).flatMap(([x, y, z]) => [0, 0, 0, x, y, z]), 3))
    group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x71d7fa, transparent: true, opacity: 0.35 })))
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.72, 0.74, 64), new THREE.MeshBasicMaterial({ color: 0x71d7fa, transparent: true, opacity: 0.65, side: THREE.DoubleSide }))
    group.add(ring)
    const target = new THREE.Vector2()
    const pointer = new THREE.Vector2()
    const resize = () => { const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix() }
    const move = (event) => { target.x = (event.clientX / window.innerWidth - 0.5) * 0.35; target.y = (event.clientY / window.innerHeight - 0.5) * -0.25 }
    const startedAt = performance.now()
    let frame
    const render = () => { pointer.lerp(target, 0.04); group.rotation.y = ((performance.now() - startedAt) / 1000) * 0.08 + pointer.x; group.rotation.x = pointer.y; ring.rotation.z += 0.004; renderer.render(scene, camera); frame = requestAnimationFrame(render) }
    resize(); render(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); pointGeometry.dispose(); lineGeometry.dispose(); renderer.dispose() }
  }, [])
}

function SectionTitle({ kicker, title, children }) { return <div className="section-title" data-reveal><span className="kicker">{kicker}</span><h2>{title}</h2>{children && <p>{children}</p>}</div> }
function FlowMap({ steps }) { return <div className="flow-map" aria-label="System architecture">{steps.map((step, index) => <React.Fragment key={step}><span className="flow-step">{step}</span>{index < steps.length - 1 && <i aria-hidden="true" />}</React.Fragment>)}</div> }
function MatrixField() { const streams = Array.from({ length: 24 }, (_, index) => '01アイウエオ<>[]{}*/'.slice(index % 6) + '0101100101010010010101'); return <div className="matrix-field" aria-hidden="true">{streams.map((stream, index) => <span key={index} style={{ '--column': index, '--speed': `${9 + (index % 6) * 2}s`, '--offset': `${-index * 1.7}s` }}>{stream}</span>)}</div> }
function Header() { return <header className="site-header"><a className="brand" href="#top" aria-label="Atal Upadhyay home"><b /> atal<span>OS</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#journey">Journey</a><a href="#contact">Contact</a></nav><a className="header-cta" href={resumeUrl} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a></header> }
function Hero() { return <section id="top" className="hero shell"><div className="hero-copy" data-reveal><p className="availability"><span /> Available for engineering roles</p><p className="hero-chapter">Chapter 01 <i /> The engineer behind the system</p><h1>I turn complex systems into <em>reliable</em> products.</h1><p className="hero-lede">{profile.summary} Based in {profile.location}.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a><a className="text-link" href={`mailto:${profile.email}`}>Start a conversation <span aria-hidden="true">↗</span></a></div></div><div className="signal-field" data-reveal aria-label="A visual representation of connected engineering systems"><div className="depth-layer depth-grid" /><div className="depth-layer depth-halo" /><div className="signal-label"><span>LIVE SYSTEM MAP</span><strong>01 / 03</strong></div><div className="orb orb-one" /><div className="orb orb-two" /><div className="orb orb-three" /><div className="system-node core">Reliable<br />systems</div><div className="system-node node-ai">AI<br />workflows</div><div className="system-node node-cloud">Cloud<br />delivery</div><div className="system-node node-data">Data<br />pipelines</div><svg viewBox="0 0 600 480" aria-hidden="true"><path d="M302 235 L145 125 M302 235 L468 138 M302 235 L438 360" /><path className="dash" d="M302 235 L145 125 M302 235 L468 138 M302 235 L438 360" /></svg><p>Architecture, automation, and delivery—connected by deliberate engineering decisions.</p></div></section> }
function Proof() { return <section id="proof" className="proof shell" aria-label="Selected outcomes">{impactStats.map((stat, index) => <article key={stat.label} data-reveal style={{ '--delay': `${index * 70}ms` }}><strong>{stat.number}</strong><span>{stat.label}</span><small>{stat.source}</small></article>)}</section> }
function Work() { const [active, setActive] = useState(featuredProjects[0]); return <section id="work" className="work-section shell"><SectionTitle kicker="Selected work" title="Every system starts with a hard question.">These are not feature lists. They are stories of constraints, decisions, and the outcomes that followed.</SectionTitle><div className="case-tabs" role="tablist" aria-label="Selected projects">{featuredProjects.map((project, index) => <button key={project.id} role="tab" aria-selected={active.id === project.id} className={active.id === project.id ? 'active' : ''} onClick={() => setActive(project)}><small>0{index + 1}</small>{project.title}</button>)}</div><article className="case-study" data-reveal><div className="case-intro"><p className="kicker">{active.type}</p><p className="story-index">Case file / 0{featuredProjects.indexOf(active) + 1}</p><h3>{active.title}</h3><p className="case-impact">{active.impact}</p><dl><div><dt>My role</dt><dd>{active.role}</dd></div><div><dt>Scope</dt><dd>{active.status}</dd></div></dl></div><div className="case-story"><div><span>01 / The tension</span><p>{active.problem}</p></div><div><span>02 / The response</span><p>{active.solution}</p></div><div><span>03 / What mattered</span><p>{active.lesson}</p></div></div><div className="architecture"><span>The system I connected</span><FlowMap steps={active.architecture} /></div><div className="case-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article><div className="more-work" data-reveal><p className="kicker">More systems shipped</p>{supportingProjects.map((project) => <article key={project.id}><span>{project.type}</span><h3>{project.title}</h3><p>{project.impact}</p></article>)}</div></section> }
function Capabilities() { const descriptions = ['Grounded AI workflows with clear feedback loops.', 'APIs and services designed around reliable boundaries.', 'Data that arrives cleanly, on time, and ready to act on.', 'Delivery systems built for resilience and observability.', 'Repeatable releases, containers, and operational discipline.', 'Background work, events, and integrations that keep systems moving.']; return <section id="capabilities" className="capabilities shell"><SectionTitle kicker="How I work" title="A platform mindset from first request to production.">Tools support the work. The point is a system that is observable, maintainable, and useful.</SectionTitle><div className="capability-grid">{stackLayers.map((layer, index) => <article key={layer.title} data-reveal style={{ '--delay': `${index * 65}ms` }}><small>0{index + 1}</small><h3>{layer.title}</h3><p>{descriptions[index]}</p><div>{layer.tools.slice(0, 5).map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div></section> }
function Journey() { return <section id="journey" className="journey shell"><SectionTitle kicker="Career trajectory" title="Growing scope, one system at a time." /><div className="timeline">{timeline.map((item, index) => <article key={`${item.company}-${item.period}`} data-reveal style={{ '--delay': `${index * 55}ms` }}><span>{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong></div><p>{item.highlight}</p></article>)}</div></section> }
function Contact() { return <section id="contact" className="contact shell" data-reveal><p className="kicker">Let’s build</p><h2>Looking for an engineer who enjoys the hard parts?</h2><p>I’m open to backend, AI platform, cloud, microservices, and automation-heavy engineering roles.</p><div><a className="button button-primary" href={`mailto:${profile.email}`}>Email me <span aria-hidden="true">↗</span></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></section> }
function App() {
  const [showExperience, setShowExperience] = useState(true)
  useScrollReveal()
  useMatrixInteraction()
  if (showExperience) return <ExperienceShell onExit={() => setShowExperience(false)} />
  return <main><MatrixField /><div className="page-noise" /><Header /><Hero /><Proof /><Work /><Capabilities /><Journey /><Contact /><footer className="shell"><span>© {new Date().getFullYear()} {profile.name}</span><span>AtalOS / Engineering systems, clearly told.</span></footer></main>
}
createRoot(document.getElementById('root')).render(<App />)
