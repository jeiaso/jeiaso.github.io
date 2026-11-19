import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';

const URL = (process.env.REACT_APP_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || '';
const CONFIGURED = Boolean(URL && KEY);
const COLORS = [
  { name: 'graphite', value: '#242424' },
  { name: 'soft gray', value: '#99938f' },
  { name: 'pink', value: '#dc7da2' },
];
const MAX_STROKES = 70;
const MAX_POINTS = 2000;

function validStrokes(strokes) {
  if (!Array.isArray(strokes)) return [];
  return strokes.slice(0, MAX_STROKES).map((stroke) => ({
    color: COLORS.some(c => c.value === stroke?.color) ? stroke.color : '#242424',
    points: Array.isArray(stroke?.points)
      ? stroke.points.slice(0, MAX_POINTS).filter(p =>
          p && Number.isFinite(p.x) && Number.isFinite(p.y) &&
          p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1)
      : [],
  })).filter(s => s.points.length > 0);
}

async function requestSketches(query = '', options = {}) {
  const response = await fetch(`${URL}/rest/v1/sketches${query}`, {
    ...options,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    let detail = '';
    try { const data = await response.json(); detail = data.message || ''; } catch (_) {}
    throw new Error(detail || `HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

function DrawingPreview({ strokes }) {
  const safe = validStrokes(strokes);
  return (
    <svg viewBox="0 0 600 400" role="img" aria-label="Visitor sketch" preserveAspectRatio="xMidYMid meet">
      {safe.map((stroke, index) => {
        const pts = stroke.points.map(p => `${(p.x * 600).toFixed(1)},${(p.y * 400).toFixed(1)}`).join(' ');
        return stroke.points.length === 1
          ? <circle key={index} cx={stroke.points[0].x * 600} cy={stroke.points[0].y * 400} r="2.1" fill={stroke.color}/>
          : <polyline key={index} points={pts} fill="none" stroke={stroke.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>;
      })}
    </svg>
  );
}

export default function SharedSketchWall() {
  const canvasRef = useRef(null);
  const strokes = useRef([]);
  const current = useRef(null);
  const inkRef = useRef(COLORS[0].value);
  const [ink, setInk] = useState(COLORS[0].value);
  const [revision, setRevision] = useState(0);
  const [saved, setSaved] = useState([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(0);

  const load = useCallback(async () => {
    if (!CONFIGURED) return;
    setLoading(true);
    try {
      const data = await requestSketches('?select=id,strokes,created_at&order=created_at.desc&limit=24');
      setSaved(Array.isArray(data) ? data : []);
    } catch (e) { setStatus(`could not load sketches: ${e.message}`); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { inkRef.current = ink; }, [ink]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function render() {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 2.5;
      strokes.current.forEach(stroke => {
        ctx.strokeStyle = stroke.color; ctx.fillStyle = stroke.color;
        const pts = stroke.points;
        ctx.beginPath();
        pts.forEach((p, i) => {
          if (!i) ctx.moveTo(p.x * width, p.y * height);
          else ctx.lineTo(p.x * width, p.y * height);
        });
        if (pts.length === 1) { ctx.arc(pts[0].x * width, pts[0].y * height, 1.5, 0, Math.PI * 2); ctx.fill(); }
        else ctx.stroke();
      });
    }
    function resize() {
      const r = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(r.width * ratio);
      canvas.height = Math.round(r.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      render();
    }
    function point(e) {
      const r = canvas.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      };
    }
    function down(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (strokes.current.length >= MAX_STROKES) return;
      current.current = { color: inkRef.current, points: [point(e)] };
      strokes.current.push(current.current);
      canvas.setPointerCapture(e.pointerId);
      setRevision(v => v + 1);
      render();
    }
    function move(e) {
      if (!current.current) return;
      if (current.current.points.length >= MAX_POINTS) return;
      current.current.points.push(point(e));
      render();
    }
    function up() { current.current = null; setRevision(v => v + 1); }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    resize();
    canvas._redraw = render;
    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      delete canvas._redraw;
    };
  }, []);

  function updateDrawing() { setRevision(v => v + 1); canvasRef.current?._redraw?.(); }
  function undo() { strokes.current.pop(); updateDrawing(); }
  function clear() { strokes.current = []; updateDrawing(); }

  async function publish() {
    if (!CONFIGURED) { setStatus('Site owner: connect Supabase using .env.local and redeploy to enable public sketch sharing.'); return; }
    if (busy || !strokes.current.length) return;
    if (Date.now() - lastPost < 60000) { setStatus('please wait a minute before posting again.'); return; }
    const payload = validStrokes(strokes.current);
    if (!payload.length) return;
    if (JSON.stringify(payload).length > 90000) { setStatus('your sketch is too detailed; try a simpler drawing.'); return; }
    setBusy(true); setStatus('pinning your sketch...');
    try {
      await requestSketches('', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ strokes: payload }),
      });
      setLastPost(Date.now());
      clear();
      setStatus('your sketch is on the wall! ♡');
      await load();
    } catch (e) { setStatus(`could not save sketch: ${e.message}`); }
    finally { setBusy(false); }
  }

  return (
    <div id="draw" className="sketchwall">
      <div className="drawing-wrap">
        <div className="drawing-head"><span>FIG. 001 — LEAVE YOUR MARK</span><span className="drawing-head-right">A LITTLE PIECE OF YOU ↘</span></div>
        <div className="drawing-stage">
          <canvas ref={canvasRef} className="drawing-canvas" aria-label="Draw your sketch with mouse, pen, or finger" />
          {revision === 0 && <div className="drawing-watermark" aria-hidden="true"><span>draw something</span><strong>for the wall.</strong><span className="drawing-watermark-small">your sketch will stay after you leave ♡</span></div>}
        </div>
        <div className="drawing-toolbar">
          <div className="toolbar-colors" aria-label="Pencil colors">
            {COLORS.map(c => <button key={c.value} type="button" aria-label={`${c.name} pencil`} title={c.name} aria-pressed={ink === c.value} onClick={() => setInk(c.value)} className={`color-dot ${ink === c.value ? 'selected' : ''}`} style={{ '--swatch': c.value }} />)}
          </div>
          <span className="toolbar-rule"/>
          <button className="tool-button" onClick={undo} disabled={!strokes.current.length} type="button"><RotateCcw size={16}/> undo</button>
          <button className="tool-button" onClick={clear} disabled={!strokes.current.length} type="button"><Trash2 size={16}/> clear</button>
          <button className="sketchwall-publish" type="button" disabled={busy || !strokes.current.length} onClick={publish}>{busy ? 'pinning...' : !CONFIGURED ? 'connect wall to pin ↗' : 'pin to wall ↗'}</button>
        </div>
        {!CONFIGURED && <div className="sketchwall-setup" role="note"><strong>Shared wall is not connected yet.</strong>The site owner must create the Supabase sketches table, add the project URL and publishable key to .env.local, and redeploy. Drawings cannot be shared until this is configured.</div>}
        <p className="sketchwall-note">sketches are <strong>public</strong> once pinned. please be kind. ♥ </p>
        {status && <p className="sketchwall-status" role="status">{status}</p>}
      </div>
      <div className="sketchwall-gallery" id="visitor-sketches">
        <div className="sketchwall-gallery-heading"><h3>left behind by visitors ♡</h3><button className="sketchwall-refresh" type="button" disabled={!CONFIGURED || loading} onClick={load}>{loading ? 'loading...' : 'refresh ↻'}</button></div>
        {saved.length === 0 ? <p className="sketchwall-empty">{CONFIGURED ? 'no sketches yet. yours could be the first!' : 'connect the database to see visitor sketches here.'}</p> :
          <div className="sketchwall-grid">{saved.map((item, i) => <article className="sketchwall-card" key={item.id}><DrawingPreview strokes={item.strokes}/><div className="sketchwall-card-footer"><span>sketch no. {String(i + 1).padStart(2, '0')}</span><span>{new Date(item.created_at).toLocaleDateString()}</span></div></article>)}</div>
        }
      </div>
    </div>
  );
}
