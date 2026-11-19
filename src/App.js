import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Pencil, RotateCcw, Trash2, Menu, X, MoveUpRight } from 'lucide-react';
import './App.css';
import FloatingSketches from './FloatingSketches';

const projects = [
  { number: '01', title: 'PetaLux', type: 'PRODUCT DESIGN / MECHANISMS', year: '2026', image: '/flower.gif', note: 'a flower that blooms with light', summary: 'Led an interdisciplinary team in creating a mechanical blooming lamp, from concept and gear-driven motion to the final prototype.', link: 'https://docs.google.com/presentation/d/1veKpVZcJVTOzE55h0ptMOnYDZeinHBmWzTgwCi1aTko/edit?usp=sharing' },
  { number: '02', title: 'Woven shells', type: 'RESEARCH / ADDITIVE MANUFACTURING', year: '2024–26', image: '/shell.gif', note: 'soft structures, new possibilities', summary: 'Exploring the mechanics of 3D-printed woven structures through CAD, FEA, fabrication, and physical testing.', link: 'https://drive.google.com/file/d/1s_JpJRAaWY_l13-_h5D5Hjck3oEBxcoo/view' },
  { number: '03', title: 'ThermoSense', type: 'PRODUCT DESIGN / ELECTRONICS', year: '2026', image: '/thermosense.png', note: 'a smarter desk companion', summary: 'Designed the CAD and electronics housing for a temperature-responsive desktop fan.', link: 'https://docs.google.com/presentation/d/1GGw0YDN4rU4RGcjI4jODf_Td0wIyoUAw/edit?usp=sharing' },
  { number: '04', title: 'FPV drone', type: 'MECHANICAL DESIGN / PROTOTYPING', year: '2025', image: '/drone.avif', note: 'made to move', summary: 'Modeled, built, and tested a custom drone optimized for maneuverability and speed.', link: null },
];

const artwork = [
  { src: '/youmei.avif', title: 'a moment worth keeping', detail: 'traditional drawing' },
  { src: '/jibbies.avif', title: 'the people i love', detail: 'digital portrait' },
  { src: '/kapwa26.png', title: 'kapwa', detail: 'graphic design' },
  { src: '/dial.jpg', title: 'visual explorations', detail: 'graphic design' },
];

function SketchCanvas() {
  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const currentRef = useRef(null);
  const [ink, setInk] = useState('#242424');
  const inkRef = useRef(ink);
  const [strokeCount, setStrokeCount] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const inkColors = [{ name: 'graphite', value: '#242424' }, { name: 'soft gray', value: '#99938f' }, { name: 'pink', value: '#dc7da2' }];

  useEffect(() => { inkRef.current = ink; }, [ink]);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
      for (const stroke of strokesRef.current) {
        context.strokeStyle = stroke.color;
        context.fillStyle = stroke.color;
        context.lineWidth = 2.1;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        const pts = stroke.points;
        if (pts.length === 1) {
          context.beginPath();
          context.arc(pts[0].x * bounds.width, pts[0].y * bounds.height, 1.3, 0, Math.PI * 2);
          context.fill();
        } else {
          context.beginPath();
          pts.forEach((p, i) => i === 0 ? context.moveTo(p.x * bounds.width, p.y * bounds.height) : context.lineTo(p.x * bounds.width, p.y * bounds.height));
          context.stroke();
        }
      }
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render();
    };
    const position = (event) => {
      const r = canvas.getBoundingClientRect();
      return { x: (event.clientX - r.left) / r.width, y: (event.clientY - r.top) / r.height };
    };
    const down = (event) => {
      if (!enabledRef.current || (event.pointerType === 'mouse' && event.button !== 0)) return;
      currentRef.current = { color: inkRef.current, points: [position(event)] };
      strokesRef.current.push(currentRef.current);
      canvas.setPointerCapture(event.pointerId);
      render();
      setStrokeCount(strokesRef.current.length);
    };
    const move = (event) => {
      if (!currentRef.current) return;
      currentRef.current.points.push(position(event));
      render();
    };
    const up = () => { currentRef.current = null; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    resize();
    canvas._renderDrawing = render;
    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      delete canvas._renderDrawing;
    };
  }, []);

  const undo = () => {
    strokesRef.current.pop();
    setStrokeCount(strokesRef.current.length);
    canvasRef.current?._renderDrawing?.();
  };
  const clear = () => {
    strokesRef.current = [];
    setStrokeCount(0);
    canvasRef.current?._renderDrawing?.();
  };

  return (
    <div className="drawing-wrap" id="draw" aria-label="Interactive sketchbook drawing canvas">
      <div className="drawing-head"><span>FIG. 001 — AN OPEN CANVAS</span><span className="drawing-head-right">YOUR TURN TO CREATE ↘</span></div>
      <div className="drawing-stage">
        <canvas ref={canvasRef} className={`drawing-canvas ${enabled ? '' : 'drawing-disabled'}`} aria-label="Draw with your mouse, stylus or finger" />
        <div className="drawing-watermark" aria-hidden="true"><span>leave a little</span><strong>something behind.</strong><span className="drawing-watermark-small">click + drag to draw ✳</span></div>
        <span className="corner-mark corner-tl">+</span><span className="corner-mark corner-tr">+</span><span className="corner-mark corner-bl">+</span><span className="corner-mark corner-br">+</span>
      </div>
      <div className="drawing-toolbar">
        <div className="toolbar-colors" aria-label="Pencil colors">{inkColors.map(c => <button key={c.value} type="button" title={c.name} aria-label={`${c.name} pencil`} aria-pressed={ink === c.value} onClick={() => setInk(c.value)} className={`color-dot ${ink === c.value ? 'selected' : ''}`} style={{ '--swatch': c.value }} />)}</div>
        <span className="toolbar-rule" />
        <button className="tool-button" type="button" onClick={undo} disabled={strokeCount === 0} title="Undo last stroke"><RotateCcw size={15} /> <span>undo</span></button>
        <button className="tool-button" type="button" onClick={clear} disabled={strokeCount === 0} title="Clear drawing"><Trash2 size={15} /> <span>clear</span></button>
        <button className={`tool-button mode-button ${enabled ? 'is-active' : ''}`} type="button" onClick={() => setEnabled(e => !e)} aria-pressed={enabled}><Pencil size={15} /> <span>{enabled ? 'draw on' : 'draw off'}</span></button>
      </div>
    </div>
  );
}

function SectionHeading({ index, kicker, title, note }) {
  return <div className="section-heading"><div><span className="eyebrow">{index} / {kicker}</span><h2>{title}<span className="pink-period">.</span></h2></div><span className="hand-note">{note}</span></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    const onKeyDown = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  useEffect(() => { document.body.style.overflow = lightbox ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [lightbox]);
  return (
    <div className="site-shell">
      <header className="site-header"><a className="wordmark" href="#top" aria-label="Jeia So, back to top">jeia so<span>✳</span></a><nav className={`site-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation"><a onClick={() => setMenuOpen(false)} href="#work">work</a><a onClick={() => setMenuOpen(false)} href="#sketchbook">sketchbook</a><a onClick={() => setMenuOpen(false)} href="#about">about</a><a onClick={() => setMenuOpen(false)} href="mailto:jeia@ucla.edu" className="nav-contact">say hello <ArrowUpRight size={14}/></a></nav><button className="mobile-menu" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button></header>
      <main id="top">
        <section className="hero content-width"><div className="hero-topline"><span>PERSONAL PORTFOLIO — VOL. 01</span><span>ENGINEER × DESIGNER × MAKER</span></div><div className="hero-intro"><FloatingSketches /><div className="hero-copy"><span className="eyebrow">HI THERE, WELCOME TO MY LITTLE CORNER OF THE INTERNET</span><h1>things i've made,<br/><em>and things i'm making<span>.</span></em></h1><p>engineering / design / everything in between</p><div className="hero-actions"><a href="#work" className="primary-link">explore my work <ArrowDown size={16}/></a><a href="#sketchbook" className="quiet-link">or peek at my sketchbook <ArrowUpRight size={15}/></a></div></div></div><div className="hero-bottom"><span>DESIGNED WITH CURIOSITY & A LITTLE PINK</span><span>SCROLL TO EXPLORE ↓</span></div></section>
        <section className="canvas-section content-width"><SketchCanvas /></section>
        <section className="work-section content-width" id="work"><SectionHeading index="01" kicker="SELECTED WORK" title="things i've made" note="from idea → reality"/><div className="projects-grid">{projects.map(p => <article className="project-card" key={p.number}><div className="project-image-wrap"><img src={p.image} alt={`${p.title} project`} loading="lazy" /><span className="project-stamp">{p.number} / {p.year}</span></div><div className="project-meta"><span>{p.type}</span><span>{p.year}</span></div><div className="project-title-row"><h3>{p.title}</h3>{p.link && <a className="round-arrow" href={p.link} target="_blank" rel="noreferrer" aria-label={`View ${p.title} project details`}><ArrowUpRight size={19}/></a>}</div><p className="project-summary">{p.summary}</p><span className="project-scribble">↳ {p.note}</span></article>)}</div><p className="work-footnote">more projects and case studies are coming to the sketchbook soon ✳</p></section>
        <section className="sketchbook-section" id="sketchbook"><div className="content-width"><SectionHeading index="02" kicker="ON PAPER & SCREEN" title="a peek inside" note="made with love ♡"/><p className="section-description">not everything starts in CAD. sometimes it starts with a pencil, a little curiosity, and a blank page.</p><div className="art-grid">{artwork.map((a,i) => <button className={`art-sheet art-sheet-${i+1}`} key={a.src} type="button" onClick={() => setLightbox(a)} aria-label={`View ${a.title}`}><div className="art-image"><img src={a.src} loading="lazy" alt={a.title}/></div><div className="art-caption"><span>{a.title}</span><span>{a.detail} ↗</span></div></button>)}</div><a className="text-link" href="https://www.behance.net/jeiaso" target="_blank" rel="noreferrer">more of my design work on behance <ArrowUpRight size={16}/></a></div></section>
        <section className="about-section content-width" id="about"><SectionHeading index="03" kicker="BEHIND THE PAGES" title="a little about me" note="nice to meet you!"/><div className="about-grid"><div className="about-big">a little bit of <span>engineering</span>, a little bit of <span>art</span>, and a lot of curiosity.</div><div className="about-copy"><p>i'm studying mechanical engineering at UCLA, where i get to explore my interests in robotics, product design, research, and all the things in between.</p><p>i especially love the messy middle of making — sketching, prototyping, breaking things, learning why, and trying again.</p><div className="about-links"><a href="https://github.com/jeiaso" target="_blank" rel="noreferrer"><Github size={17}/> github <ArrowUpRight size={14}/></a><a href="https://linkedin.com/in/jeiaso" target="_blank" rel="noreferrer"><Linkedin size={17}/> linkedin <ArrowUpRight size={14}/></a><a href="mailto:jeia@ucla.edu"><Mail size={17}/> email <ArrowUpRight size={14}/></a></div></div></div></section>
      </main>
      <footer className="site-footer"><div className="content-width footer-inner"><div><span className="footer-title">have an idea? let's make something <em>together.</em></span><a className="footer-email" href="mailto:jeia@ucla.edu">jeia@ucla.edu <MoveUpRight size={22}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JEIA SO</span><span>MADE WITH ♡, CAFFEINE, AND CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}><button type="button" onClick={() => setLightbox(null)} aria-label="Close image" className="lightbox-close"><X size={24}/></button><figure onClick={e => e.stopPropagation()}><img src={lightbox.src} alt={lightbox.title}/><figcaption>{lightbox.title} — {lightbox.detail}</figcaption></figure></div>}
    </div>
  );
}
