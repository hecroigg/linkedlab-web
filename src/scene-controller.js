import { storyFrame } from "./story-timeline.mjs";
// The page and its CSS illustration are usable before this optional enhancement loads.
export function mountEcosystem(host) {
  const stage = host.querySelector("[data-scene-stage]");
  const pause = host.querySelector("[data-scene-pause]");
  const reset = host.querySelector("[data-scene-reset]");
  const depth = host.querySelector("[data-scene-depth]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)");
  const compact = matchMedia("(max-height: 599px)");
  const connection = navigator.connection;
  const story = host.closest("[data-scroll-story]");
  const storyViewport = story?.querySelector("[data-story-viewport]");
  const storyIntro = story?.querySelector("[data-story-intro]");
  const storyChapters = story ? [...story.querySelectorAll("[data-story-chapter]")] : [];
  const storyCount = story?.querySelector("[data-story-count]");
  const header = document.querySelector(".site-header");
  const events = new AbortController();
  const state = { x: 0, y: 0, depth: 0, scroll: 0, paused: motion.matches, reduced: motion.matches, dragging: false, cinema: Boolean(story && !motion.matches && !compact.matches), frame: storyFrame(0) };
  let scene, loading = false, unavailable = false, destroyed = false, visible = false, idleTask;
  let origin = null, progressFrame = 0;
  const configureStory = () => {
    state.cinema = Boolean(story && !motion.matches && !compact.matches);
    story?.classList.toggle("story-ready", state.cinema);
    if (!state.cinema) {
      state.scroll = 0; state.frame = storyFrame(0);
      if (storyIntro) storyIntro.inert = false;
      header?.classList.remove("site-header--dark");
    }
  };
  configureStory();

  const setPause = (value) => {
    state.paused = value;
    pause.setAttribute("aria-pressed", String(value));
    pause.setAttribute("aria-label", value ? pause.dataset.playLabel : pause.dataset.pauseLabel);
    pause.firstElementChild.textContent = value ? "▷" : "Ⅱ";
    host.classList.toggle("is-paused", value);
    scene?.update();
  };
  const pose = () => {
    host.style.setProperty("--scene-x", state.x.toFixed(3));
    host.style.setProperty("--scene-y", state.y.toFixed(3));
    host.style.setProperty("--scene-scroll", state.scroll.toFixed(3));
    scene?.update();
  };
  const setDepth = (value) => {
    state.depth = Math.max(0, Math.min(1, value));
    depth.value = String(Math.round(state.depth * 100));
    host.style.setProperty("--scene-depth", state.depth.toFixed(3));
    scene?.update();
  };
  const restore = () => { state.x = state.y = 0; setDepth(0); pose(); };
  const listen = (target, name, fn, options = {}) => target.addEventListener(name, fn, { ...options, signal: events.signal });

  async function load() {
    if (loading || scene || unavailable || destroyed || !visible || document.hidden || motion.matches || connection?.saveData) return;
    // Do not create a WebGL context on browsers that cannot render it.
    if (!("WebGL2RenderingContext" in window)) { host.dataset.sceneState = "fallback"; unavailable = true; return; }
    loading = true;
    try {
      const canvas = host.querySelector("[data-scene-canvas]");
      const context = canvas.getContext("webgl2", { alpha: true, antialias: !coarse.matches, powerPreference: "low-power", stencil: false });
      if (!context) { host.dataset.sceneState = "fallback"; unavailable = true; return; }
      const { createEcosystem } = await import("./ecosystem-scene.js");
      if (destroyed || !visible || document.hidden || motion.matches || connection?.saveData) return;
      scene = createEcosystem(host, state, { coarse: coarse.matches, context });
      scene.setVisible(visible && !document.hidden);
    } catch {
      // The SSR illustration remains complete if loading, context creation or shaders fail.
      host.dataset.sceneState = "fallback";
      unavailable = true;
    } finally { loading = false; }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    host.classList.toggle("is-in-view", visible);
    scene?.setVisible(visible && !document.hidden);
    if (visible) {
      if ("requestIdleCallback" in window) idleTask = requestIdleCallback(load, { timeout: 1200 });
      else idleTask = setTimeout(load, 120);
    }
  }, { threshold: .02 });
  observer.observe(host);

  listen(stage, "pointerdown", (event) => {
    if (event.button !== 0 || motion.matches) return;
    origin = { x: event.clientX, y: event.clientY, angle: state.x, tilt: state.y, touch: event.pointerType === "touch" };
    if (!origin.touch) stage.setPointerCapture(event.pointerId);
  });
  listen(stage, "pointermove", (event) => {
    if (motion.matches) return;
    const bounds = stage.getBoundingClientRect();
    if (origin) {
      const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
      // Vertical swipes belong to the document, never to a scroll-jacking controller.
      if (origin.touch && !state.dragging && Math.abs(dy) > Math.abs(dx) + 6) { origin = null; return; }
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) state.dragging = true;
      if (state.dragging) {
        state.x = Math.max(-1.2, Math.min(1.2, origin.angle + dx / bounds.width * 2.3));
        state.y = Math.max(-.55, Math.min(.55, origin.tilt + dy / bounds.height));
      }
    } else if (event.pointerType !== "touch") {
      state.x = ((event.clientX - bounds.left) / bounds.width - .5) * .42;
      state.y = ((event.clientY - bounds.top) / bounds.height - .5) * .22;
    }
    host.classList.toggle("is-dragging", state.dragging);
    pose();
  }, { passive: true });
  const release = () => { origin = null; state.dragging = false; host.classList.remove("is-dragging"); };
  for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) listen(stage, type, release);
  listen(stage, "pointerleave", () => { if (!origin) { state.x = state.y = 0; pose(); } });
  listen(stage, "keydown", (event) => {
    const axes = { ArrowLeft: [-.14, 0], ArrowRight: [.14, 0], ArrowUp: [0, -.1], ArrowDown: [0, .1] };
    if (event.key === "Escape" || event.key === "Home") { event.preventDefault(); restore(); }
    if (axes[event.key] && !motion.matches) {
      event.preventDefault();
      state.x = Math.max(-1.2, Math.min(1.2, state.x + axes[event.key][0]));
      state.y = Math.max(-.55, Math.min(.55, state.y + axes[event.key][1]));
      pose();
    }
  });
  listen(depth, "input", () => setDepth(Number(depth.value) / 100));
  listen(reset, "click", restore);
  listen(pause, "click", () => { if (!motion.matches) { setPause(!state.paused); load(); } });
  const progress = () => {
    progressFrame = 0;
    if (motion.matches) return;
    const bounds = (story || host.closest("section")).getBoundingClientRect();
    if (story) {
      if (!state.cinema) return;
      if (bounds.bottom < 0 || bounds.top > innerHeight) { header?.classList.remove("site-header--dark"); return; }
      state.scroll = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - storyViewport.clientHeight)));
      state.frame = storyFrame(state.scroll);
      const frame = state.frame;
      for (const key of ["progress", "intro", "center", "spread", "connect", "night", "nucleus", "exit", "browserScale", "rotateX", "rotateY", "rotateZ"]) {
        story.style.setProperty(`--story-${key}`, frame[key].toFixed(4));
      }
      frame.copy.forEach((value, index) => {
        storyChapters[index]?.style.setProperty("--chapter-opacity", value.toFixed(4));
      });
      if (storyIntro) storyIntro.inert = frame.intro < .02;
      if (storyCount) storyCount.textContent = `${state.scroll < .43 ? "01" : state.scroll < .72 ? "02" : "03"} / 03`;
      header?.classList.toggle("site-header--dark", frame.night > .5 && bounds.top < 82 && bounds.bottom > 82);
    } else {
      if (!visible) return;
      state.scroll = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height * .85)));
    }
    pose();
  };
  const scheduleProgress = () => { if (!progressFrame) progressFrame = requestAnimationFrame(progress); };
  listen(window, "scroll", scheduleProgress, { passive: true });
  listen(window, "resize", scheduleProgress, { passive: true });
  listen(compact, "change", () => { configureStory(); scheduleProgress(); });
  listen(document, "visibilitychange", () => scene?.setVisible(visible && !document.hidden));
  listen(motion, "change", () => {
    state.reduced = motion.matches;
    setPause(motion.matches);
    configureStory();
    if (motion.matches) {
      scene?.dispose(); scene = undefined;
      const canvas = host.querySelector("[data-scene-canvas]");
      canvas.replaceWith(canvas.cloneNode(false));
      host.dataset.sceneState = "static";
      host.classList.remove("is-rendered");
    } else load();
  });
  // A persisted page keeps its instance for bfcache; normal navigation frees all GPU resources.
  listen(window, "pagehide", (event) => {
    scene?.setVisible(false);
    if (event.persisted) return;
    destroyed = true;
    observer.disconnect();
    cancelAnimationFrame(progressFrame);
    if ("cancelIdleCallback" in window) cancelIdleCallback(idleTask);
    clearTimeout(idleTask);
    scene?.dispose();
    events.abort();
  });
  listen(window, "pageshow", () => { progress(); scene?.setVisible(visible && !document.hidden); });
  setPause(state.paused);
  progress();
}
