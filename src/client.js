const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    const label = open ? menuButton.dataset.openLabel : menuButton.dataset.closeLabel;
    menuButton.setAttribute("aria-label", label);
    menuButton.innerHTML = `${open ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'}<span class="sr-only">${label}</span>`;
    mobileMenu.hidden = open;
    document.body.classList.toggle("menu-open", !open);
    if (!open) header?.classList.remove("site-header--hidden");
  });
}

let lastY = 0;
addEventListener("scroll", () => {
  const y = window.scrollY;
  header?.classList.toggle("site-header--scrolled", y > 16);
  if (y < 120 || y < lastY) header?.classList.remove("site-header--hidden");
  else if (y > lastY + 8 && !document.body.classList.contains("menu-open")) header?.classList.add("site-header--hidden");
  lastY = y;
}, { passive: true });

for (const detail of document.querySelectorAll(".faq-list details")) {
  detail.addEventListener("toggle", () => {
    if (detail.open) document.querySelectorAll(".faq-list details[open]").forEach((item) => item !== detail && item.removeAttribute("open"));
  });
}

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const cursorAura = document.querySelector("[data-cursor-aura]");

if (cursorAura && !reducedMotion.matches && matchMedia("(pointer: fine)").matches) {
  let cursorX = -100;
  let cursorY = -100;
  let cursorTargetX = -100;
  let cursorTargetY = -100;

  const renderCursor = () => {
    cursorX += (cursorTargetX - cursorX) * .19;
    cursorY += (cursorTargetY - cursorY) * .19;
    cursorAura.style.setProperty("--cursor-x", `${cursorX.toFixed(1)}px`);
    cursorAura.style.setProperty("--cursor-y", `${cursorY.toFixed(1)}px`);
    requestAnimationFrame(renderCursor);
  };

  addEventListener("pointermove", (event) => {
    cursorTargetX = event.clientX;
    cursorTargetY = event.clientY;
    cursorAura.classList.add("is-visible");
    cursorAura.classList.toggle("is-active", Boolean(event.target instanceof Element && event.target.closest("a, button, .interactive-surface, [data-digital-orbit]")));
  }, { passive: true });
  addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) cursorAura.classList.remove("is-visible");
  }, { passive: true });
  requestAnimationFrame(renderCursor);
}

const intro = document.querySelector("[data-site-intro]");

if (intro) {
  let introSeen = false;
  try { introSeen = sessionStorage.getItem("linkedlab-intro-seen") === "1"; } catch {}

  const hideIntro = (immediate = false) => {
    if (intro.classList.contains("is-exiting") || intro.classList.contains("is-hidden")) return;
    try { sessionStorage.setItem("linkedlab-intro-seen", "1"); } catch {}
    document.body.classList.remove("intro-active");
    if (immediate || reducedMotion.matches) {
      intro.classList.add("is-hidden");
      return;
    }
    intro.classList.add("is-exiting");
    setTimeout(() => intro.classList.add("is-hidden"), 1050);
  };

  if (introSeen || reducedMotion.matches) hideIntro(true);
  else {
    document.body.classList.add("intro-active");
    const introTimer = setTimeout(hideIntro, 1350);
    intro.addEventListener("pointermove", (event) => {
      intro.style.setProperty("--intro-x", `${(event.clientX / innerWidth * 100).toFixed(1)}%`);
      intro.style.setProperty("--intro-y", `${(event.clientY / innerHeight * 100).toFixed(1)}%`);
    }, { passive: true });
    intro.querySelector("[data-skip-intro]")?.addEventListener("click", () => {
      clearTimeout(introTimer);
      hideIntro();
    });
    const escapeIntro = (event) => {
      if (event.key !== "Escape") return;
      clearTimeout(introTimer);
      hideIntro();
      removeEventListener("keydown", escapeIntro);
    };
    addEventListener("keydown", escapeIntro);
  }
}

if (!reducedMotion.matches) {
  const revealTargets = [...document.querySelectorAll("main > section:not(.hero), .site-footer > div")];
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  revealTargets.forEach((target) => revealObserver.observe(target));

  if (matchMedia("(pointer: fine)").matches) {
    const surfaces = document.querySelectorAll(".service-card, .feature-card, .pricing-card, .mini-projects article, .project-art, .contact-card");
    for (const surface of surfaces) {
      surface.classList.add("interactive-surface");
      surface.addEventListener("pointermove", (event) => {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        surface.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
        surface.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
        surface.style.setProperty("--tilt-x", `${((x - .5) * 3.4).toFixed(2)}deg`);
        surface.style.setProperty("--tilt-y", `${((.5 - y) * 3.4).toFixed(2)}deg`);
        surface.classList.add("is-active");
      }, { passive: true });
      surface.addEventListener("pointerleave", () => {
        surface.classList.remove("is-active");
        surface.style.removeProperty("--tilt-x");
        surface.style.removeProperty("--tilt-y");
      }, { passive: true });
    }

    for (const button of document.querySelectorAll(".button")) {
      button.classList.add("magnetic");
      button.addEventListener("pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty("--magnet-x", `${((event.clientX - bounds.left - bounds.width / 2) * .12).toFixed(1)}px`);
        button.style.setProperty("--magnet-y", `${((event.clientY - bounds.top - bounds.height / 2) * .16).toFixed(1)}px`);
      }, { passive: true });
      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      }, { passive: true });
    }
  }

  if (!("startViewTransition" in document)) {
    document.addEventListener("click", (event) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target || link.hasAttribute("download")) return;
      const next = new URL(link.href, location.href);
      if (next.origin !== location.origin || next.pathname === location.pathname || next.protocol === "mailto:" || next.protocol === "tel:") return;
      event.preventDefault();
      document.documentElement.classList.add("is-leaving");
      setTimeout(() => { location.href = next.href; }, 190);
    });
  }
}

addEventListener("pageshow", () => document.documentElement.classList.remove("is-leaving"));

const orbit = document.querySelector("[data-digital-orbit]");
const canvas = orbit?.querySelector("canvas");

if (orbit && canvas) {
  const context = canvas.getContext("2d");
  const particleCount = 42;
  const particles = Array.from({ length: particleCount }, (_, index) => ({
    angle: (Math.PI * 2 * index) / particleCount + (index % 5) * .21,
    radius: .14 + ((index * 37) % 78) / 100,
    speed: .000025 + ((index * 11) % 9) * .000004,
    size: .65 + (index % 4) * .42,
    layer: .45 + (index % 6) / 9
  }));
  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  const resize = () => {
    const bounds = orbit.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const renderOrbit = (time = 0) => {
    pointerX += (targetX - pointerX) * .055;
    pointerY += (targetY - pointerY) * .055;
    orbit.style.setProperty("--rx", `${(-pointerY * 4.2).toFixed(2)}deg`);
    orbit.style.setProperty("--ry", `${(pointerX * 5.4).toFixed(2)}deg`);
    orbit.style.setProperty("--pointer-x", `${(pointerX * 30).toFixed(1)}px`);
    orbit.style.setProperty("--pointer-y", `${(pointerY * 26).toFixed(1)}px`);

    context.clearRect(0, 0, width, height);
    const centerX = width * .5 + pointerX * 13;
    const centerY = height * .5 + pointerY * 10;
    const scale = Math.min(width, height) * .47;
    const points = particles.map((particle) => {
      const angle = particle.angle + time * particle.speed;
      const radius = scale * particle.radius;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * .76,
        size: particle.size,
        alpha: particle.layer
      };
    });

    for (let a = 0; a < points.length; a += 1) {
      for (let b = a + 1; b < points.length; b += 1) {
        const dx = points[a].x - points[b].x;
        const dy = points[a].y - points[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance > 86) continue;
        context.beginPath();
        context.moveTo(points[a].x, points[a].y);
        context.lineTo(points[b].x, points[b].y);
        context.strokeStyle = `rgba(105,145,255,${(1 - distance / 86) * .16})`;
        context.lineWidth = .6;
        context.stroke();
      }
    }

    for (const point of points) {
      context.beginPath();
      context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(173,197,255,${point.alpha})`;
      context.shadowColor = "rgba(80,126,255,.7)";
      context.shadowBlur = point.size * 5;
      context.fill();
      context.shadowBlur = 0;
    }

    if (!reducedMotion.matches) requestAnimationFrame(renderOrbit);
  };

  const updatePointer = (clientX, clientY) => {
    const bounds = orbit.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, ((clientX - bounds.left) / bounds.width - .5) * 2));
    targetY = Math.max(-1, Math.min(1, ((clientY - bounds.top) / bounds.height - .5) * 2));
  };

  orbit.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY), { passive: true });
  orbit.addEventListener("pointerleave", () => { targetX = 0; targetY = 0; }, { passive: true });
  addEventListener("deviceorientation", (event) => {
    if (event.gamma == null || event.beta == null) return;
    targetX = Math.max(-1, Math.min(1, event.gamma / 28));
    targetY = Math.max(-1, Math.min(1, (event.beta - 45) / 40));
  }, { passive: true });

  new ResizeObserver(() => {
    resize();
    if (reducedMotion.matches) renderOrbit();
  }).observe(orbit);
  resize();
  requestAnimationFrame(renderOrbit);
}

const journey = document.querySelector("[data-digital-journey]");
const journeyWorld = journey?.querySelector("[data-journey-world]");

if (journey && journeyWorld) {
  const journeySteps = [...journey.querySelectorAll("[data-journey-step]")];
  let journeyPointerX = 0;
  let journeyPointerY = 0;
  let journeyFrame = 0;

  const renderJourney = () => {
    journeyFrame = 0;
    const bounds = journey.getBoundingClientRect();
    const range = Math.max(1, journey.offsetHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, -bounds.top / range));
    const activeStep = Math.min(journeySteps.length - 1, Math.floor(progress * journeySteps.length));
    journey.style.setProperty("--journey-progress", `${(progress * 100).toFixed(1)}%`);
    journeySteps.forEach((step, index) => step.classList.toggle("is-active", index === activeStep));
    header?.classList.toggle("site-header--dark", bounds.top <= 82 && bounds.bottom > 82);

    if (!reducedMotion.matches) {
      journeyWorld.style.setProperty("--world-rx", `${(-13 + progress * 22 - journeyPointerY * 7).toFixed(2)}deg`);
      journeyWorld.style.setProperty("--world-ry", `${(-24 + progress * 210 + journeyPointerX * 14).toFixed(2)}deg`);
      journeyWorld.style.setProperty("--world-lift", `${Math.sin(progress * Math.PI * 2) * -18}px`);
    }
  };

  const scheduleJourney = () => {
    if (!journeyFrame) journeyFrame = requestAnimationFrame(renderJourney);
  };

  journey.addEventListener("pointermove", (event) => {
    const bounds = journey.getBoundingClientRect();
    journeyPointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    journeyPointerY = Math.max(-1, Math.min(1, (event.clientY / innerHeight - .5) * 2));
    scheduleJourney();
  }, { passive: true });
  addEventListener("scroll", scheduleJourney, { passive: true });
  addEventListener("resize", scheduleJourney, { passive: true });
  renderJourney();
}
