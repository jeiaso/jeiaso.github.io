import React, { useEffect, useRef } from 'react';
import './FloatingSketches.css';

// Swap these filenames for your own transparent sketches when you're ready.
const sketches = [
  { src: '/sketches/robot-head.svg', label: 'robot head concept', className: 'float-robot', strength: 0.9 },
  { src: '/sketches/flower-study.svg', label: 'flower mechanism study', className: 'float-flower', strength: -0.7 },
  { src: '/sketches/mechanism.svg', label: 'gear mechanism study', className: 'float-gear', strength: 0.6 },
];

export default function FloatingSketches() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const nodes = [...layer.querySelectorAll('.floating-sketch')];
    const positions = nodes.map(() => ({ x: 0, y: 0, rotation: 0 }));
    const cursor = { x: -10000, y: -10000 };
    let frame;

    const move = (e) => { cursor.x = e.clientX; cursor.y = e.clientY; };
    const leave = () => { cursor.x = -10000; cursor.y = -10000; };

    const animate = () => {
      nodes.forEach((node, i) => {
        const box = node.parentElement.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const dx = cx - cursor.x;
        const dy = cy - cursor.y;
        const distance = Math.hypot(dx, dy);
        const falloff = Math.pow(Math.max(0, 1 - distance / 210), 2);
        const pushX = distance ? (dx / distance) * falloff * 28 : 0;
        const pushY = distance ? (dy / distance) * falloff * 28 : 0;
        const parallaxX = cursor.x > -1000 ? (cursor.x / window.innerWidth - 0.5) * 16 * sketches[i].strength : 0;
        const parallaxY = cursor.y > -1000 ? (cursor.y / window.innerHeight - 0.5) * 16 * sketches[i].strength : 0;
        const p = positions[i];
        p.x += (pushX + parallaxX - p.x) * 0.075;
        p.y += (pushY + parallaxY - p.y) * 0.075;
        p.rotation += (falloff * sketches[i].strength * 7 - p.rotation) * 0.075;
        node.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
      });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', leave);
    document.addEventListener('pointerleave', leave);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', leave);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="floating-sketch-layer" ref={layerRef} aria-hidden="true">
      {sketches.map((sketch) => (
        <div className={`floating-sketch-anchor ${sketch.className}`} key={sketch.src}>
          <img className="floating-sketch" src={sketch.src} alt="" draggable="false" />
        </div>
      ))}
    </div>
  );
}
