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

if (!reducedMotion.matches) {
  const revealTargets = [...document.querySelectorAll("main > section:not(:first-child), .site-footer > div")];
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  revealTargets.forEach((target) => revealObserver.observe(target));

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
