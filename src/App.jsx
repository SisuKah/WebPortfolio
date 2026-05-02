import { useEffect, useRef, useState } from "react";
import { projects, buildPath, sizeClass } from "./projects.js";

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;

export default function App() {
  const [gateOpen, setGateOpen] = useState(true);
  const [gateLeaving, setGateLeaving] = useState(false);
  const [scrollCueVisible, setScrollCueVisible] = useState(false);
  const [openCards, setOpenCards] = useState({});
  const [lightbox, setLightbox] = useState(null); // { project, idx }
  const videoRef = useRef(null);

  useEffect(() => {
    if (gateOpen) document.body.style.overflow = "hidden";
    return () => {
      if (!lightbox) document.body.style.overflow = "";
    };
  }, [gateOpen, lightbox]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => {
      if (Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.04);
        } catch (_) {}
      }
      video.pause();
      video.removeAttribute("loop");
      setScrollCueVisible(true);
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .project").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleEnter = async () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
      } catch (_) {
        video.muted = true;
        try {
          await video.play();
        } catch (_) {}
      }
    }
    setGateLeaving(true);
    setTimeout(() => {
      setGateOpen(false);
      document.body.style.overflow = "";
    }, 600);
  };

  const toggleCard = (i) =>
    setOpenCards((s) => ({ ...s, [i]: !s[i] }));

  const openLightbox = (projectIdx, imageIdx) => {
    const p = projects[projectIdx];
    if (!p || !p.gallery) return;
    setLightbox({ project: projectIdx, idx: imageIdx });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const stepLightbox = (delta) => {
    setLightbox((s) => {
      if (!s) return s;
      const p = projects[s.project];
      const len = p.gallery.length;
      return { project: s.project, idx: (s.idx + delta + len) % len };
    });
  };

  return (
    <>
      {gateOpen && (
        <div
          className={`enter-gate${gateLeaving ? " is-leaving" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="enter-gate__inner">
            <p className="enter-gate__eyebrow">Sisu Kahilakoski</p>
            <h2 className="enter-gate__title">Portfolio</h2>
            <p className="enter-gate__sub">Best experienced with sound on.</p>
            <button
              type="button"
              className="enter-gate__btn"
              onClick={handleEnter}
            >
              Enter
            </button>
          </div>
        </div>
      )}

      <section id="top" className="hero">
        <video
          ref={videoRef}
          id="heroVideo"
          className="hero__video"
          playsInline
          preload="auto"
        >
          <source src="/PortfolioHero.mp4" type="video/mp4" />
        </video>
        <a
          href="#about"
          className={`hero__scroll${scrollCueVisible ? " is-visible" : ""}`}
          aria-label="Scroll down"
        >
          <span className="hero__scroll-label">Scroll</span>
          <span className="hero__scroll-arrow" aria-hidden="true"></span>
        </a>
      </section>

      <main>
        <section id="about" className="about">
          <div className="container about__grid">
            <div className="about__lead">
              <figure className="about__portrait">
                <img
                  src="/face.jpg"
                  alt="Sisu Kahilakoski pitching on stage"
                  loading="lazy"
                />
              </figure>
              <p className="eyebrow">About</p>
              <h2>
                I design and ship products end-to-end &mdash; from the first
                landing page to live Stripe checkouts.
              </h2>
            </div>
            <div className="about__body">
              <p>
                I am a developer and ICT student from Finland who enjoys
                turning ideas into working products with modern web
                technologies and AI-powered workflows. My work spans full-stack
                web apps, automation pipelines, and hackathon-tempo prototypes.
              </p>
              <ul className="about__highlights">
                <li>
                  <span>10,000+</span>downloads on a gaming-related product
                </li>
                <li>
                  <span>$3,000</span>hackathon win at CalHacks, San Francisco
                </li>
                <li>
                  <span>3</span>conferences attended &mdash; VivaTech, Slush,
                  TechCrunch Disrupt
                </li>
              </ul>
              <div className="about__stack">
                <span>Next.js</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>Tailwind</span>
                <span>Firebase</span>
                <span>Supabase</span>
                <span>Stripe</span>
                <span>Python</span>
                <span>YOLO</span>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Selected Work</p>
              <h2>Projects, prototypes &amp; platforms.</h2>
            </div>

            <div className="projects" id="projects">
              {projects.map((p, i) => (
                <ProjectCard
                  key={i}
                  project={p}
                  index={i}
                  isOpen={!!openCards[i]}
                  onToggle={() => toggleCard(i)}
                  onOpenImage={(idx) => openLightbox(i, idx)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container contact__inner">
            <img
              src="/thinking.png"
              className="contact__thinking"
              alt=""
              aria-hidden="true"
            />
            <p className="eyebrow">Contact</p>
            <h2>Let's build something with sisu.</h2>
            <p className="contact__text">
              Open to freelance, internship, and collaboration opportunities.
            </p>
            <div className="contact__links">
              <a href="mailto:sisu.kahilakoski@gmail.com">
                sisu.kahilakoski@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/sisu-kahilakoski-0226a1369/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__inner">
            <span>© 2026 Sisu Kahilakoski</span>
            <span>Built with sisu.</span>
          </div>
        </footer>
      </main>

      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}
    </>
  );
}

function ProjectCard({ project, index, isOpen, onToggle, onOpenImage }) {
  const cover = buildPath(project, project.cover);
  return (
    <article
      className={`project ${sizeClass(project.size)} reveal${isOpen ? " is-open" : ""}`}
      data-i={index}
    >
      <div
        className="project__media"
        style={{ cursor: "zoom-in" }}
        onClick={() => onOpenImage(0)}
      >
        {project.badge && (
          <span className="project__badge">{project.badge}</span>
        )}
        <img src={cover} alt={`${project.title} cover`} loading="lazy" />
      </div>
      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__desc">{project.desc}</p>
        <div className="project__tags">
          {project.tags.map((t, idx) => (
            <span key={idx}>{t}</span>
          ))}
        </div>
        {project.gallery && project.gallery.length > 1 && (
          <button
            className="project__more"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isOpen ? "Hide gallery" : "View gallery"}
          </button>
        )}
      </div>
      <div className="project__gallery">
        {(project.gallery || []).map((g, idx) => (
          <div
            key={idx}
            className="project__thumb"
            onClick={() => onOpenImage(idx)}
          >
            <img
              src={buildPath(project, g)}
              alt={`${project.title} screenshot ${idx + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </article>
  );
}

function Lightbox({ state, onClose, onStep }) {
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const hintRef = useRef(null);
  const hintTextRef = useRef(null);
  const hintTimerRef = useRef(null);
  const zoomRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pointersRef = useRef(new Map());
  const panStartRef = useRef(null);
  const pinchStartRef = useRef(null);

  const project = projects[state.project];
  const src = buildPath(project, project.gallery[state.idx]);
  const caption = `${project.title} — ${state.idx + 1} / ${project.gallery.length}`;

  const showHint = (mode) => {
    const hint = hintRef.current;
    const text = hintTextRef.current;
    if (!hint || !text) return;
    clearTimeout(hintTimerRef.current);
    text.textContent = mode === "scroll" ? "Scroll to zoom" : "Drag to pan";
    hint.classList.add("is-visible");
    hintTimerRef.current = setTimeout(
      () => hint.classList.remove("is-visible"),
      mode === "scroll" ? 3000 : 2200
    );
  };

  const hidePanHint = () => {
    const hint = hintRef.current;
    if (!hint) return;
    clearTimeout(hintTimerRef.current);
    hint.classList.remove("is-visible");
  };

  const applyZoom = () => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;
    const z = zoomRef.current;
    const wasZoomed = stage.classList.contains("is-zoomed");
    const isZoomed = z.scale > 1.001;
    img.style.transform = `translate(${z.tx}px, ${z.ty}px) scale(${z.scale})`;
    stage.classList.toggle("is-zoomed", isZoomed);
    if (isZoomed && !wasZoomed) showHint("pan");
    if (!isZoomed && wasZoomed) hidePanHint();
  };

  const clampPan = () => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;
    const z = zoomRef.current;
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    const iw = img.clientWidth * z.scale;
    const ih = img.clientHeight * z.scale;
    if (iw <= sw) z.tx = (sw - iw) / 2;
    else z.tx = Math.min(0, Math.max(sw - iw, z.tx));
    if (ih <= sh) z.ty = (sh - ih) / 2;
    else z.ty = Math.min(0, Math.max(sh - ih, z.ty));
  };

  const resetZoom = () => {
    const stage = stageRef.current;
    const img = imgRef.current;
    const z = zoomRef.current;
    z.scale = 1;
    if (img && img.clientWidth && stage && stage.clientWidth) {
      z.tx = (stage.clientWidth - img.clientWidth) / 2;
      z.ty = (stage.clientHeight - img.clientHeight) / 2;
    } else {
      z.tx = 0;
      z.ty = 0;
    }
    applyZoom();
  };

  const zoomAt = (clientX, clientY, newScale) => {
    const stage = stageRef.current;
    if (!stage) return;
    const z = zoomRef.current;
    newScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, newScale));
    const rect = stage.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const ix = (px - z.tx) / z.scale;
    const iy = (py - z.ty) / z.scale;
    z.scale = newScale;
    z.tx = px - ix * z.scale;
    z.ty = py - iy * z.scale;
    clampPan();
    applyZoom();
  };

  // Reset zoom when image changes
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const onReady = () => requestAnimationFrame(resetZoom);
    if (img.complete && img.naturalWidth) onReady();
    else img.onload = onReady;
    showHint("scroll");
  }, [state.project, state.idx]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "+" || e.key === "=") {
        const stage = stageRef.current;
        const r = stage.getBoundingClientRect();
        zoomAt(r.left + stage.clientWidth / 2, r.top + stage.clientHeight / 2, zoomRef.current.scale * 1.4);
      } else if (e.key === "-" || e.key === "_") {
        const stage = stageRef.current;
        const r = stage.getBoundingClientRect();
        zoomAt(r.left + stage.clientWidth / 2, r.top + stage.clientHeight / 2, zoomRef.current.scale / 1.4);
      } else if (e.key === "0") {
        resetZoom();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // Window resize
  useEffect(() => {
    const onResize = () => {
      if (zoomRef.current.scale <= 1.001) resetZoom();
      else {
        clampPan();
        applyZoom();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Wheel zoom on stage (non-passive)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomAt(e.clientX, e.clientY, zoomRef.current.scale * factor);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  const pinchDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const pinchMidpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  const onPointerDown = (e) => {
    if (e.target.closest(".lightbox__zoom-btn")) return;
    const stage = stageRef.current;
    stage.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const z = zoomRef.current;

    if (pointersRef.current.size === 1) {
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        tx: z.tx,
        ty: z.ty,
        moved: false,
        time: Date.now(),
      };
      pinchStartRef.current = null;
    } else if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()];
      pinchStartRef.current = {
        dist: pinchDistance(a, b),
        mid: pinchMidpoint(a, b),
        scale: z.scale,
        tx: z.tx,
        ty: z.ty,
      };
      panStartRef.current = null;
      stage.classList.add("is-panning");
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const stage = stageRef.current;
    const img = imgRef.current;
    const z = zoomRef.current;

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const ps = pinchStartRef.current;
      const [a, b] = [...pointersRef.current.values()];
      const newDist = pinchDistance(a, b);
      const newScale = Math.min(
        ZOOM_MAX,
        Math.max(ZOOM_MIN, ps.scale * (newDist / ps.dist))
      );
      const rect = stage.getBoundingClientRect();
      const px = ps.mid.x - rect.left;
      const py = ps.mid.y - rect.top;
      const ix = (px - ps.tx) / ps.scale;
      const iy = (py - ps.ty) / ps.scale;
      z.scale = newScale;
      z.tx = px - ix * z.scale;
      z.ty = py - iy * z.scale;
      clampPan();
      img.style.transition = "none";
      applyZoom();
    } else if (pointersRef.current.size === 1 && panStartRef.current && z.scale > 1.001) {
      const ps = panStartRef.current;
      const dx = e.clientX - ps.x;
      const dy = e.clientY - ps.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) ps.moved = true;
      z.tx = ps.tx + dx;
      z.ty = ps.ty + dy;
      clampPan();
      img.style.transition = "none";
      stage.classList.add("is-panning");
      applyZoom();
    } else if (pointersRef.current.size === 1 && panStartRef.current) {
      const ps = panStartRef.current;
      const dx = e.clientX - ps.x;
      const dy = e.clientY - ps.y;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) ps.moved = true;
    }
  };

  const onPointerEnd = (e) => {
    pointersRef.current.delete(e.pointerId);
    const stage = stageRef.current;
    const img = imgRef.current;
    if (pointersRef.current.size < 2) pinchStartRef.current = null;
    if (pointersRef.current.size === 0) {
      stage.classList.remove("is-panning");
      img.style.transition = "";
      panStartRef.current = null;
    }
  };

  const onDblClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (zoomRef.current.scale > 1.01) resetZoom();
    else zoomAt(e.clientX, e.clientY, 2.5);
  };

  const onZoomBtn = (action) => (e) => {
    e.stopPropagation();
    const stage = stageRef.current;
    const r = stage.getBoundingClientRect();
    const cx = r.left + stage.clientWidth / 2;
    const cy = r.top + stage.clientHeight / 2;
    if (action === "in") zoomAt(cx, cy, zoomRef.current.scale * 1.5);
    else if (action === "out") zoomAt(cx, cy, zoomRef.current.scale / 1.5);
    else resetZoom();
  };

  return (
    <div
      className="lightbox is-open"
      role="dialog"
      aria-modal="true"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.classList.contains("lightbox")) onClose();
      }}
    >
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        aria-label="Previous"
        onClick={() => onStep(-1)}
      >
        ‹
      </button>
      <div
        ref={stageRef}
        className="lightbox__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        <img
          ref={imgRef}
          className="lightbox__img"
          alt={`${project.title} — image ${state.idx + 1}`}
          src={src}
          draggable="false"
          onDoubleClick={onDblClick}
        />
      </div>
      <button
        className="lightbox__nav lightbox__nav--next"
        aria-label="Next"
        onClick={() => onStep(1)}
      >
        ›
      </button>
      <div ref={hintRef} className="lightbox__hint" aria-hidden="true">
        <span className="lightbox__hint-icon" aria-hidden="true"></span>
        <span ref={hintTextRef} className="lightbox__hint-text"></span>
      </div>
      <div className="lightbox__zoom" aria-label="Zoom controls">
        <button
          className="lightbox__zoom-btn"
          aria-label="Zoom out"
          onClick={onZoomBtn("out")}
        >
          −
        </button>
        <button
          className="lightbox__zoom-btn"
          aria-label="Reset zoom"
          onClick={onZoomBtn("reset")}
        >
          ⟳
        </button>
        <button
          className="lightbox__zoom-btn"
          aria-label="Zoom in"
          onClick={onZoomBtn("in")}
        >
          +
        </button>
      </div>
      <div className="lightbox__caption">{caption}</div>
    </div>
  );
}
