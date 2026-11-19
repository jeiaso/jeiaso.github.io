import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Menu, X, ChevronRight } from 'lucide-react';
import './App.css';
import FloatingSketches from './FloatingSketches';
import SharedSketchWall from './SharedSketchWall';
import originalContent from './originalContent';

const { items, design_intro, art_intro, design_images, art_images, about_intro, about_current, more_link, behance } = originalContent;
const researchItems = items.filter(item => item.category === 'Research' && !item.archived);
const projectItems = items.filter(item => item.category === 'Projects' && !item.archived);
const archivedItems = items.filter(item => item.archived);

function Links({ links }) {
  if (!links || !links.length) return null;
  return <div className="original-links">{links.map(({url,label},i)=><a key={i} href={url} target="_blank" rel="noopener noreferrer">{label} <ArrowUpRight size={15}/></a>)}</div>;
}

function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown',onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown',onKey); };
  }, [project, onClose]);
  if (!project) return null;
  return <div className="detail-overlay" onMouseDown={onClose} role="presentation">
    <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={event=>event.stopPropagation()}>
      <button className="detail-close" onClick={onClose} aria-label="Close project"><X size={22}/></button>
      <span className="eyebrow">{project.category}{project.archived ? ' / previously hidden in original code' : ''}</span>
      <h2 id="detail-title">{project.title}</h2><p className="detail-subtitle">{project.date}</p>
      {project.images.map((image,i)=><img className="detail-image" src={image.startsWith('/')?image:`/${image}`} alt={`${project.title} ${i+1}`} key={image}/>)}
      <h3>Original project description</h3>
      <p className="original-description">{project.description}</p>
      {project.award && <p className="project-award">{project.award}</p>}
      {project.note && <p className="project-note">{project.note}</p>}
      <Links links={project.links}/>
    </section>
  </div>;
}

function Gallery({ images, onOpen, design=false }) {
  return <div className="art-grid">{images.map((item,i)=><button key={i} className={`art-sheet art-sheet-${i % 4}`} onClick={()=>onOpen(item)} aria-label={`View image ${i+1}`}>
    <div className="art-image"><img src={item.src.startsWith('/')?item.src:`/${item.src}`} alt={item.label} loading="lazy"/></div>
    <div className="art-caption"><strong>{design?`Design study ${String(i+1).padStart(2,'0')}`:item.label}</strong>{design&&<span>{item.label}</span>}</div>
  </button>)}</div>;
}


function ProjectGrid({ entries, onSelect }) {
  return (
        <div className="projects-grid">{entries.map((project,i)=><article className={`project-card project-card-${i % 4}`} key={project.title}>
          <button className="project-cover" onClick={()=>onSelect(project)} aria-label={`Read ${project.title}`}>
            {project.images.length?<img src={project.images[0].startsWith('/')?project.images[0]:`/${project.images[0]}`} alt={project.title} loading="lazy"/>:<div className="project-placeholder"><span>{project.category.toUpperCase()} / {String(i+1).padStart(2,'0')}</span><strong>{project.title}</strong><small>Read the original project details</small></div>}
            <span className="cover-index">no. {String(i+1).padStart(2,'0')}</span>
          </button>
          <div className="project-category">{project.category}{project.archived && ' / ARCHIVE'}<span>{project.date}</span></div>
          <button className="project-name" onClick={()=>onSelect(project)}><span>{project.title}</span><ArrowUpRight size={22}/></button>
          <p className="project-intro">{project.description}</p>
          {project.award && <p className="project-award">{project.award}</p>}
          {project.note && <p className="project-note">{project.note}</p>}
          <Links links={project.links}/>
          <button className="read-more" onClick={()=>onSelect(project)}>View complete entry <ChevronRight size={16}/></button>
        </article>)}</div>
  );
}

export default function App() {
  const [selected,setSelected] = useState(null);
  const [art,setArt] = useState(null);
  const [menu,setMenu] = useState(false);
  useEffect(()=>{const onKey=e=>{if(e.key==='Escape')setArt(null)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);

  return <div className="site-shell">
    <header className="site-header">
      <a href="#top" className="wordmark">jeia so<span>♡</span></a>
      <button className="mobile-menu" aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      <nav className={menu?'site-nav nav-open':'site-nav'}>
        <a href="#research" onClick={()=>setMenu(false)}>research</a>
        <a href="#projects" onClick={()=>setMenu(false)}>projects</a>
        <a href="#design" onClick={()=>setMenu(false)}>design</a>
        <a href="#art" onClick={()=>setMenu(false)}>art</a>
        <a href="#wall" onClick={()=>setMenu(false)}>guestbook</a>
        <a href="#about" onClick={()=>setMenu(false)}>about</a>
        <a className="nav-contact" href="mailto:jeia@ucla.edu">get in touch <ArrowUpRight size={15}/></a>
      </nav>
    </header>
    <main id="top">
      <section className="hero content-width" aria-label="Welcome to my scrapbook">
        <div className="notebook-topline"><span>JEIA'S LITTLE CORNER OF THE INTERNET</span><span>VOL. 01 · A WORK IN PROGRESS</span></div>
        <div className="hero-intro">
          <FloatingSketches/>
          <div className="hero-copy">
            <div className="hello-note">hello, welcome in! <span>♡</span></div>
            <h1>things i've made,<br/><em>and things i'm making.</em></h1>
            <p className="hero-description">A scrapbook of little ideas, big projects, half-finished sketches, and everything in between.</p>
            <div className="hero-actions"><a className="primary-link" href="#research">flip through my work <ArrowDown size={17}/></a><a className="quiet-link" href="#wall">leave a doodle <ArrowUpRight size={16}/></a></div>
          </div>
          <aside className="hero-sticky" aria-label="A note from Jeia"><span>TO DO:</span><p>make something<br/>just because ♡</p><small>— jeia</small></aside>
        </div>
        <div className="hero-bottom"><span>engineer / designer / collector of ideas</span><span>↓ keep scrolling</span></div>
      </section>
      <section className="work-section content-width" id="research">
        <div className="section-heading"><div><span className="eyebrow">CHAPTER ONE · QUESTIONS & EXPERIMENTS</span><h2>research <span>✳</span></h2></div><p>Notes from the lab, things I tested, and what I learned along the way.</p></div>
        <ProjectGrid entries={researchItems} onSelect={setSelected}/>
      </section>

      <section className="work-section projects-section content-width" id="projects">
        <div className="section-heading"><div><span className="eyebrow">CHAPTER TWO · MADE BY HAND</span><h2>projects <span>✳</span></h2></div><p>A collection of projects, prototypes, and things that (mostly) worked.</p></div>
        <ProjectGrid entries={projectItems} onSelect={setSelected}/>
        <a className="text-link" href={more_link} target="_blank" rel="noopener noreferrer">Explore more technical projects from high school <ArrowUpRight size={16}/></a>
      </section>

      <section className="archive-section content-width" id="archive">
        <details className="archive-details"><summary>Previously hidden projects <span>({archivedItems.length})</span></summary><p>These entries existed in the original source code but were commented out.</p><ProjectGrid entries={archivedItems} onSelect={setSelected}/></details>
      </section>

      <section className="wall-section content-width" id="wall"><div className="section-heading"><div><span className="eyebrow">A LITTLE GUESTBOOK</span><h2>leave a mark <span>♡</span></h2></div><p>Before you go, leave a tiny drawing for whoever visits next.</p></div><SharedSketchWall/></section>

      <section className="sketchbook-section" id="design"><div className="content-width">
        <div className="section-heading"><div><span className="eyebrow">CHAPTER THREE · OUTSIDE THE LAB</span><h2>design work <span>✳</span></h2></div></div>
        <p className="section-original-intro">{design_intro}</p><Gallery images={design_images} onOpen={setArt} design/>
        <a className="text-link" href={behance} target="_blank" rel="noopener noreferrer">Explore my full graphic design portfolio <ArrowUpRight size={16}/></a>
      </div></section>

      <section className="sketchbook-section art-personal-section" id="art"><div className="content-width">
        <div className="section-heading"><div><span className="eyebrow">THE PAGES I KEEP FOR MYSELF</span><h2>personal art <span>♡</span></h2></div></div>
        <p className="section-original-intro">{art_intro}</p><Gallery images={art_images} onOpen={setArt}/>
      </div></section>

      <section className="about-section content-width" id="about"><div className="section-heading"><div><span className="eyebrow">LAST PAGE · A LITTLE ABOUT ME</span><h2>hi, i'm jeia <span>♡</span></h2></div></div>
        <div className="about-grid"><div><img className="about-headshot" src="/JeiaSo_Headshot.jpg" alt="Jeia So"/></div><div className="about-copy">
          <p>{about_intro}</p><p>{about_current}</p>
          <div className="about-links"><a href="mailto:jeia@ucla.edu"><Mail size={18}/> jeia@ucla.edu</a><a href="https://linkedin.com/in/jeiaso" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn</a><a href="https://github.com/jeiaso" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a></div>
        </div></div>
      </section>
    </main>
    <footer className="site-footer"><div className="content-width"><span className="footer-kicker">THAT'S ALL FOR NOW · THANKS FOR READING ♡</span><h2>let's make something <em>together.</em></h2><a href="mailto:jeia@ucla.edu" className="footer-email">jeia@ucla.edu <ArrowUpRight/></a><div className="footer-bottom"><span>© {new Date().getFullYear()} JEIA SO</span><span>MADE WITH LOVE & TOO MANY TABS OPEN</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    <ProjectDetail project={selected} onClose={()=>setSelected(null)}/>
    {art && <div className="art-lightbox" onMouseDown={()=>setArt(null)} role="presentation"><button onClick={()=>setArt(null)} aria-label="Close artwork"><X/></button><img src={art.src.startsWith('/')?art.src:`/${art.src}`} alt={art.label} onMouseDown={e=>e.stopPropagation()}/></div>}
  </div>;
}
