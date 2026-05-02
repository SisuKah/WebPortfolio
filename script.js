// ---------- HERO VIDEO: play once, freeze on last frame ----------
(() => {
  const video = document.getElementById("heroVideo");
  const gate = document.getElementById("enterGate");
  const enterBtn = document.getElementById("enterGateBtn");
  if (!video) return;

  video.addEventListener("ended", () => {
    if (Number.isFinite(video.duration)) {
      try {
        video.currentTime = Math.max(0, video.duration - 0.04);
      } catch (_) {}
    }
    video.pause();
    video.removeAttribute("loop");
  });

  // Lock scrolling while the gate is up.
  if (gate) document.body.style.overflow = "hidden";

  const enter = async () => {
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
    } catch (_) {
      // Last-ditch fallback: play muted so the visual still runs.
      video.muted = true;
      try {
        await video.play();
      } catch (_) {}
    }
    if (gate) {
      gate.classList.add("is-leaving");
      setTimeout(() => {
        gate.remove();
        document.body.style.overflow = "";
      }, 600);
    }
  };

  if (enterBtn) enterBtn.addEventListener("click", enter);
})();

// ---------- PROJECTS DATA ----------
const projects = [
  {
    title: "Hackathon Win — CalHacks ($3000)",
    folder: "Hackathon-Win-3000$",
    cover: "Cal-Hacks-App-V2.png",
    gallery: ["Cal-Hacks-App-V2.png", "Cal-Hacks-App-V1.jpeg"],
    badge: "Award · $3000",
    desc:
      "AI solution for analyzing ad creatives across images, video, and audio — built, pivoted, and rebuilt under hackathon time pressure to win the company challenge.",
    tags: ["AI", "Computer Vision", "Hackathon"],
    size: "wide",
  },
  {
    title: "OuluES — Entrepreneurship Society Platform",
    folder: "OuluES",
    cover: "oulueslanding.jpeg",
    gallery: [
      "oulueslanding.jpeg",
      "Events.jpeg",
      "Board.jpeg",
      "StartUpList.jpeg",
      "AdminPanelCustomPages.jpeg",
      "AdminPanelEditPageContent.jpeg",
    ],
    badge: "Live Platform",
    desc:
      "Official site for Oulu Entrepreneurship Society — landing, events, board, startup directory, plus an internal admin for content & custom pages.",
    tags: ["Next.js", "React", "Firebase", "TypeScript"],
    size: "half",
  },
  {
    title: "StorageRent — Online Storage Rental",
    folder: "StorageRent",
    cover: "front-page.jpeg",
    gallery: [
      "front-page.jpeg",
      "rent-page.jpeg",
      "stripe-connection.jpeg",
      "success-confirmation-page.jpeg",
      "admin-panel.png",
      "customers-controlpanel.jpeg",
      "conditions-page.jpeg",
    ],
    badge: "Full Stack",
    desc:
      "Interactive SVG floor plan, real-time availability, Stripe checkout with flexible durations & deposits, and a Firestore-backed admin flow.",
    tags: ["Next.js", "Stripe", "Firestore", "Tailwind"],
    size: "half",
  },
  {
    title: "CarSeller — Dealership Platform",
    folder: "CarSeller",
    cover: "LandingPage.jpeg",
    gallery: [
      "LandingPage.jpeg",
      "Add-Car.jpeg",
      "your-own-cars-page.jpeg",
      "StripeIntegration.jpeg",
      "ManageStripeSubscriptions.jpeg",
      "seinajokinen.png",
    ],
    badge: "Stripe Subscriptions",
    desc:
      "Car dealer platform with filtering, listing management, user data flows, and Stripe subscription handling for sellers.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    size: "half",
  },
  {
    title: "Yritysvälitys Suomi",
    folder: "yritysvalitys",
    cover: "yritysvalitys.jpeg",
    gallery: ["yritysvalitys.jpeg", "ControlPanel.jpeg"],
    badge: "B2B Marketplace",
    desc:
      "Platform connecting business buyers and sellers in Finland — polished landing plus a dedicated control panel for brokering activities.",
    tags: ["Web Platform", "Finland"],
    size: "half",
  },
  {
    title: "Raimo Rautiola — Campaign Site",
    folder: "Canditate-For-Member-Of-Parlament",
    cover: "LandingPage.jpeg",
    gallery: [
      "LandingPage.jpeg",
      "BlogPost.jpeg",
      "WritePost.jpeg",
      "Admin.jpeg",
      "Login.jpeg",
    ],
    badge: "Politics · CMS",
    desc:
      "Political campaign site with custom CMS — auth, posts, image upload, pinning, deep-linked sharing and SEO/social cards. React + Vite + Supabase.",
    tags: ["React", "Vite", "Supabase"],
    size: "half",
  },
  {
    title: "Qr-Memo — Digital Memorial Service",
    folder: "qr-code-company",
    cover: "frontpage.jpeg",
    gallery: [
      "frontpage.jpeg",
      "profiles.jpeg",
      "example-profiles.jpeg",
      "add-profile.jpeg",
      "edit-profiles.jpeg",
      "profiles-created.jpeg",
      "login-register.jpeg",
    ],
    badge: "Sensitive UX",
    desc:
      "QR-code based digital memorial platform with conservative, trust-first design and a Firebase-backed profile/image system.",
    tags: ["Next.js", "Firebase", "Tailwind"],
    size: "half",
  },
  {
    title: "E-BookShelf — Goodreads Automation",
    folder: "E-BookShelf",
    cover: "Front-Page.png",
    gallery: [
      "Front-Page.png",
      "Book-Desc-From-GoodReads.png",
      "Sorting-Feature.png",
      "Loading-Screen.jpeg",
    ],
    badge: "Scraping · Automation",
    desc:
      "Personal bookshelf that auto-scrapes Goodreads for titles, covers, and genres — turning manual curation into a self-updating library.",
    tags: ["Next.js", "Cheerio", "Vercel"],
    size: "third",
  },
  {
    title: "HackathonChatBot — Junction (3rd Place)",
    folder: "HackathonChatBot",
    cover: "HackathonChatBot.jpeg",
    gallery: ["HackathonChatBot.jpeg", "3rd place price.jpg"],
    badge: "Award · €200",
    desc:
      "Privacy-aware chatbot for handling patient data — built in 48 hours at Oulu × Junction. 3rd place finish.",
    tags: ["Python API", "Next.js", "Firestore"],
    size: "third",
  },
  {
    title: "SmartLock — Product Site",
    folder: "SmartLock",
    cover: "SmartLock-FrontPage.jpeg",
    gallery: ["SmartLock-FrontPage.jpeg"],
    badge: "Marketing Site",
    desc:
      "Conversion-focused product site for a Finnish smart lock company — responsive, clear CTAs, mobile-first.",
    tags: ["Next.js", "Tailwind"],
    size: "third",
  },
  {
    title: "Minecraft Resource Pack Automation",
    folder: "gaming project",
    cover: "My projects.png",
    gallery: ["My projects.png", "feedback.png"],
    badge: "1500+ downloads",
    desc:
      "Python + Pillow scripts that generated 4000+ textures and matching .properties files for a Minecraft armor durability pack.",
    tags: ["Python", "Pillow", "Automation"],
    size: "half",
  },

  // -------- root-level image-only projects --------
  {
    title: "Lahden ProSiivous",
    cover: "LahdenProSiivous.jpeg",
    gallery: ["LahdenProSiivous.jpeg"],
    badge: "Local Business",
    desc: "Marketing site for a Finnish cleaning company — clean local-business presentation.",
    tags: ["Web", "Finland"],
    size: "third",
  },
  {
    title: "AbiNote",
    cover: "AbiNote.jpeg",
    gallery: ["AbiNote.jpeg"],
    badge: "Study Tool",
    desc: "Note-taking and study workflow concept aimed at high school graduates (abi).",
    tags: ["Product", "EdTech"],
    size: "third",
  },
  {
    title: "Cozy Tea",
    cover: "cozytea.jpeg",
    gallery: ["cozytea.jpeg"],
    badge: "Brand · E-com",
    desc: "Warm, calm storefront concept for a cozy tea brand.",
    tags: ["E-commerce", "Branding"],
    size: "third",
  },
  {
    title: "Car Renting",
    cover: "Car-renting.jpeg",
    gallery: ["Car-renting.jpeg"],
    badge: "Concept",
    desc: "Booking-flow concept for a car rental marketplace.",
    tags: ["Web App"],
    size: "third",
  },
  {
    title: "Bank Website Practice",
    cover: "BankWebsitePractise.jpeg",
    gallery: ["BankWebsitePractise.jpeg"],
    badge: "Practice",
    desc: "Self-driven practice build of a modern banking marketing site.",
    tags: ["Practice", "Web"],
    size: "third",
  },
  {
    title: "NH Group",
    cover: "nhGroup.jpeg",
    gallery: ["nhGroup.jpeg"],
    badge: "Corporate",
    desc: "Corporate site concept for NH Group.",
    tags: ["Corporate"],
    size: "third",
  },
  {
    title: "Poliittinen Vaikuttaja",
    cover: "PoliittinenVaikuttaja.png",
    gallery: ["PoliittinenVaikuttaja.png"],
    badge: "Politics",
    desc: "Site concept for a political influencer profile.",
    tags: ["Web"],
    size: "third",
  },
  {
    title: "Baseball AI",
    cover: "baseballAI.png",
    gallery: ["baseballAI.png"],
    badge: "AI · Sports",
    desc: "AI-assisted baseball analytics experiment.",
    tags: ["AI", "Python"],
    size: "third",
  },
  {
    title: "WebNow",
    cover: "webnow.png",
    gallery: ["webnow.png"],
    badge: "Concept",
    desc: "Web product concept exploration.",
    tags: ["Concept"],
    size: "third",
  },
];

// ---------- RENDER ----------
const sizeClass = (s) =>
  s === "wide" ? "project--wide" : s === "third" ? "project--third" : "";

const enc = (segment) => encodeURIComponent(segment);

const buildPath = (project, file) =>
  project.folder
    ? `${enc(project.folder)}/${enc(file)}`
    : enc(file);

const projectsRoot = document.getElementById("projects");
if (projectsRoot) {
  projectsRoot.innerHTML = projects
    .map((p, i) => {
      const cover = buildPath(p, p.cover);
      const tags = p.tags
        .map((t) => `<span>${t}</span>`)
        .join("");
      const thumbs = (p.gallery || [])
        .map(
          (g, idx) =>
            `<div class="project__thumb" data-project="${i}" data-idx="${idx}">
              <img src="${buildPath(p, g)}" alt="${p.title} screenshot ${
              idx + 1
            }" loading="lazy" />
            </div>`
        )
        .join("");
      const moreBtn =
        p.gallery && p.gallery.length > 1
          ? `<button class="project__more" data-project="${i}">View gallery</button>`
          : "";
      return `
        <article class="project ${sizeClass(p.size)} reveal" data-i="${i}">
          <div class="project__media">
            ${
              p.badge
                ? `<span class="project__badge">${p.badge}</span>`
                : ""
            }
            <img src="${cover}" alt="${p.title} cover" loading="lazy" />
          </div>
          <div class="project__body">
            <h3 class="project__title">${p.title}</h3>
            <p class="project__desc">${p.desc}</p>
            <div class="project__tags">${tags}</div>
            ${moreBtn}
          </div>
          <div class="project__gallery">${thumbs}</div>
        </article>`;
    })
    .join("");
}

// ---------- GALLERY TOGGLE ----------
document.querySelectorAll(".project__more").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".project");
    const open = card.classList.toggle("is-open");
    btn.textContent = open ? "Hide gallery" : "View gallery";
  });
});

// ---------- LIGHTBOX ----------
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector(".lightbox__img");
const lbStage = lb.querySelector(".lightbox__stage");
const lbCaption = lb.querySelector(".lightbox__caption");
let lbState = { project: null, idx: 0 };

// ---------- ZOOM & PAN ----------
const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const zoom = { scale: 1, tx: 0, ty: 0 };

const applyZoom = () => {
  lbImg.style.transform = `translate(${zoom.tx}px, ${zoom.ty}px) scale(${zoom.scale})`;
  lbStage.classList.toggle("is-zoomed", zoom.scale > 1.001);
};

const clampPan = () => {
  const sw = lbStage.clientWidth;
  const sh = lbStage.clientHeight;
  const iw = lbImg.clientWidth * zoom.scale;
  const ih = lbImg.clientHeight * zoom.scale;
  if (iw <= sw) {
    zoom.tx = (sw - iw) / 2;
  } else {
    zoom.tx = Math.min(0, Math.max(sw - iw, zoom.tx));
  }
  if (ih <= sh) {
    zoom.ty = (sh - ih) / 2;
  } else {
    zoom.ty = Math.min(0, Math.max(sh - ih, zoom.ty));
  }
};

const resetZoom = () => {
  zoom.scale = 1;
  // Compute centered translation for default state
  if (lbImg.clientWidth && lbStage.clientWidth) {
    zoom.tx = (lbStage.clientWidth - lbImg.clientWidth) / 2;
    zoom.ty = (lbStage.clientHeight - lbImg.clientHeight) / 2;
  } else {
    zoom.tx = 0;
    zoom.ty = 0;
  }
  applyZoom();
};

const zoomAt = (clientX, clientY, newScale) => {
  newScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, newScale));
  const rect = lbStage.getBoundingClientRect();
  // Pointer position relative to stage
  const px = clientX - rect.left;
  const py = clientY - rect.top;
  // Image-space coordinate at the pointer (before scaling)
  const ix = (px - zoom.tx) / zoom.scale;
  const iy = (py - zoom.ty) / zoom.scale;
  zoom.scale = newScale;
  zoom.tx = px - ix * zoom.scale;
  zoom.ty = py - iy * zoom.scale;
  clampPan();
  applyZoom();
};

const openLightbox = (projectIdx, imageIdx) => {
  const p = projects[projectIdx];
  if (!p || !p.gallery) return;
  lbState = { project: projectIdx, idx: imageIdx };
  lbImg.src = buildPath(p, p.gallery[imageIdx]);
  lbImg.alt = `${p.title} — image ${imageIdx + 1}`;
  lbCaption.textContent = `${p.title} — ${imageIdx + 1} / ${p.gallery.length}`;
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  // Reset zoom once image dims are known (handle cached images too)
  const onReady = () => requestAnimationFrame(resetZoom);
  if (lbImg.complete && lbImg.naturalWidth) {
    onReady();
  } else {
    lbImg.onload = onReady;
  }
};

const closeLightbox = () => {
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  lbImg.src = "";
  document.body.style.overflow = "";
  zoom.scale = 1;
  zoom.tx = 0;
  zoom.ty = 0;
};

const stepLightbox = (delta) => {
  const p = projects[lbState.project];
  if (!p) return;
  const len = p.gallery.length;
  lbState.idx = (lbState.idx + delta + len) % len;
  zoom.scale = 1;
  zoom.tx = 0;
  zoom.ty = 0;
  applyZoom();
  openLightbox(lbState.project, lbState.idx);
};

document.querySelectorAll(".project__thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    openLightbox(
      Number(thumb.dataset.project),
      Number(thumb.dataset.idx)
    );
  });
});

// Also: clicking the cover opens the first image
document.querySelectorAll(".project__media").forEach((media) => {
  media.addEventListener("click", () => {
    const card = media.closest(".project");
    const i = Number(card.dataset.i);
    if (projects[i] && projects[i].gallery && projects[i].gallery.length) {
      openLightbox(i, 0);
    }
  });
  media.style.cursor = "zoom-in";
});

lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lb.querySelector(".lightbox__nav--prev").addEventListener("click", () =>
  stepLightbox(-1)
);
lb.querySelector(".lightbox__nav--next").addEventListener("click", () =>
  stepLightbox(1)
);
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") stepLightbox(1);
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "+" || e.key === "=") zoomAt(
    lbStage.getBoundingClientRect().left + lbStage.clientWidth / 2,
    lbStage.getBoundingClientRect().top + lbStage.clientHeight / 2,
    zoom.scale * 1.4
  );
  if (e.key === "-" || e.key === "_") zoomAt(
    lbStage.getBoundingClientRect().left + lbStage.clientWidth / 2,
    lbStage.getBoundingClientRect().top + lbStage.clientHeight / 2,
    zoom.scale / 1.4
  );
  if (e.key === "0") resetZoom();
});

// ---------- LIGHTBOX ZOOM / PAN INTERACTIONS ----------

// Zoom button controls
lb.querySelectorAll(".lightbox__zoom-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const action = btn.dataset.zoom;
    const cx = lbStage.getBoundingClientRect().left + lbStage.clientWidth / 2;
    const cy = lbStage.getBoundingClientRect().top + lbStage.clientHeight / 2;
    if (action === "in") zoomAt(cx, cy, zoom.scale * 1.5);
    else if (action === "out") zoomAt(cx, cy, zoom.scale / 1.5);
    else resetZoom();
  });
});

// Mouse wheel zoom (desktop)
lbStage.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomAt(e.clientX, e.clientY, zoom.scale * factor);
  },
  { passive: false }
);

// Double-click toggle zoom (desktop)
lbImg.addEventListener("dblclick", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (zoom.scale > 1.01) {
    resetZoom();
  } else {
    zoomAt(e.clientX, e.clientY, 2.5);
  }
});

// Pointer-based pan (mouse + single touch) and pinch zoom (two-finger touch)
const activePointers = new Map();
let panStart = null;
let pinchStart = null;

const pinchDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const pinchMidpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

lbStage.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".lightbox__zoom-btn")) return;
  lbStage.setPointerCapture(e.pointerId);
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (activePointers.size === 1) {
    panStart = {
      x: e.clientX,
      y: e.clientY,
      tx: zoom.tx,
      ty: zoom.ty,
      moved: false,
      time: Date.now(),
    };
    pinchStart = null;
  } else if (activePointers.size === 2) {
    const [a, b] = [...activePointers.values()];
    pinchStart = {
      dist: pinchDistance(a, b),
      mid: pinchMidpoint(a, b),
      scale: zoom.scale,
      tx: zoom.tx,
      ty: zoom.ty,
    };
    panStart = null;
    lbStage.classList.add("is-panning");
  }
});

lbStage.addEventListener("pointermove", (e) => {
  if (!activePointers.has(e.pointerId)) return;
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (activePointers.size === 2 && pinchStart) {
    const [a, b] = [...activePointers.values()];
    const newDist = pinchDistance(a, b);
    const newScale = Math.min(
      ZOOM_MAX,
      Math.max(ZOOM_MIN, pinchStart.scale * (newDist / pinchStart.dist))
    );
    // Anchor zoom to original midpoint in image space
    const rect = lbStage.getBoundingClientRect();
    const px = pinchStart.mid.x - rect.left;
    const py = pinchStart.mid.y - rect.top;
    const ix = (px - pinchStart.tx) / pinchStart.scale;
    const iy = (py - pinchStart.ty) / pinchStart.scale;
    zoom.scale = newScale;
    zoom.tx = px - ix * zoom.scale;
    zoom.ty = py - iy * zoom.scale;
    clampPan();
    lbImg.style.transition = "none";
    applyZoom();
  } else if (activePointers.size === 1 && panStart && zoom.scale > 1.001) {
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) panStart.moved = true;
    zoom.tx = panStart.tx + dx;
    zoom.ty = panStart.ty + dy;
    clampPan();
    lbImg.style.transition = "none";
    lbStage.classList.add("is-panning");
    applyZoom();
  } else if (activePointers.size === 1 && panStart) {
    // Track movement so a tap-vs-drag distinction is possible
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) panStart.moved = true;
  }
});

const endPointer = (e) => {
  activePointers.delete(e.pointerId);
  if (activePointers.size < 2) pinchStart = null;
  if (activePointers.size === 0) {
    lbStage.classList.remove("is-panning");
    lbImg.style.transition = "";
    panStart = null;
  }
};

lbStage.addEventListener("pointerup", endPointer);
lbStage.addEventListener("pointercancel", endPointer);
lbStage.addEventListener("pointerleave", endPointer);

// Re-center the image whenever the stage is resized while open
window.addEventListener("resize", () => {
  if (!lb.classList.contains("is-open")) return;
  if (zoom.scale <= 1.001) resetZoom();
  else {
    clampPan();
    applyZoom();
  }
});

// ---------- REVEAL ON SCROLL ----------
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
