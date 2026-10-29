import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { mountEcosystem } from "../src/scene-controller.js";
import { paths } from "../src/content.mjs";
import { storyFrame } from "../src/story-timeline.mjs";

// Exercise lifecycle and real interaction handlers without requiring a GPU in CI.
class Node extends EventTarget {
  constructor() {
    super(); this.dataset = {}; this.attrs = new Map(); this.styles = new Map(); this.tokens = new Set();
    this.style = { setProperty: (key, value) => this.styles.set(key, value) };
    this.classList = { add: (key) => this.tokens.add(key), remove: (key) => this.tokens.delete(key), contains: (key) => this.tokens.has(key), toggle: (key, active) => active ? this.tokens.add(key) : this.tokens.delete(key) };
    this.firstElementChild = { textContent: "" };
  }
  setAttribute(key, value) { this.attrs.set(key, value); }
  getBoundingClientRect() { return { left: 0, top: 0, width: 500, height: 500 }; }
  setPointerCapture() {}
}
function event(target, name, details = {}) {
  const e = new Event(name, { cancelable: true });
  for (const [key, value] of Object.entries(details)) Object.defineProperty(e, key, { value });
  target.dispatchEvent(e); return e;
}
function fixture({ reduced = false, saveData = false, cinematic = false } = {}) {
  const host = new Node(), stage = new Node(), pause = new Node(), reset = new Node(), depth = new Node(), canvas = new Node();
  const win = new Node(), doc = new Node(), media = new Node(), jobs = [], frames = [];
  const observers = []; let contexts = 0;
  depth.value = "0"; pause.dataset = { playLabel: "Play", pauseLabel: "Pause" };
  canvas.getContext = () => { contexts++; return null; };
  host.querySelector = (selector) => ({ "[data-scene-stage]": stage, "[data-scene-pause]": pause, "[data-scene-reset]": reset, "[data-scene-depth]": depth, "[data-scene-canvas]": canvas })[selector];
  const story = new Node(), intro = new Node(), chapters = [new Node(), new Node(), new Node()];
  let storyTop = -1100;
  story.getBoundingClientRect = () => ({ top: storyTop, height: 3000, bottom: storyTop + 3000 });
  story.querySelector = (selector) => ({ "[data-story-viewport]": { clientHeight: 800 }, "[data-story-intro]": intro, "[data-story-count]": new Node() })[selector];
  story.querySelectorAll = () => chapters;
  host.closest = (selector) => selector === "[data-scroll-story]" ? cinematic ? story : null : { getBoundingClientRect: () => ({ top: -100, height: 500 }) };
  doc.querySelector = () => null;
  media.matches = reduced;
  Object.assign(globalThis, {
    window: Object.assign(win, { WebGL2RenderingContext: class {}, requestIdleCallback: true }), document: doc,
    matchMedia: (query) => query.includes("reduced-motion") ? media : Object.assign(new Node(), { matches: false }),
    requestIdleCallback: (fn) => jobs.push(fn), cancelIdleCallback: () => {},
    requestAnimationFrame: (fn) => frames.push(fn), cancelAnimationFrame: () => {}, innerHeight: 900,
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {} disconnect() { this.disconnected = true; }
    }
  });
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { connection: { saveData } } });
  mountEcosystem(host);
  return { host, stage, pause, reset, depth, win, doc, media, jobs, frames, story, intro, chapters, setStoryTop: (value) => { storyTop = value; }, observer: observers[0], contexts: () => contexts };
}
for (const options of [{ reduced: true }, { saveData: true }]) {
  const f = fixture(options);
  f.observer.callback([{ isIntersecting: true }]);
  await f.jobs.shift()();
  assert.equal(f.contexts(), 0, "Reduced motion and data saving must not create GPU contexts");
  assert.equal(event(f.win, "pagehide", { persisted: false }).defaultPrevented, false);
  assert.ok(f.observer.disconnected, "Navigation disconnects scene observers");
}
const f = fixture();
assert.equal(f.contexts(), 0, "An offscreen scene must not initialise WebGL");
f.observer.callback([{ isIntersecting: true }]); await f.jobs.shift()();
assert.equal(f.contexts(), 1);
assert.equal(f.host.dataset.sceneState, "fallback", "Context denial preserves the illustration");
assert.equal(event(f.stage, "keydown", { key: "ArrowRight" }).defaultPrevented, true);
assert.equal(f.host.styles.get("--scene-x"), "0.140");
f.depth.value = "100"; event(f.depth, "input");
assert.equal(f.host.styles.get("--scene-depth"), "1.000");
event(f.reset, "click"); assert.equal(f.depth.value, "0"); assert.equal(f.host.styles.get("--scene-x"), "0.000");
event(f.stage, "pointerdown", { button: 0, pointerType: "touch", clientX: 100, clientY: 100 });
const swipe = event(f.stage, "pointermove", { pointerType: "touch", clientX: 102, clientY: 200 });
assert.equal(swipe.defaultPrevented, false, "Vertical swipes must remain native page scrolling");
assert.equal(f.host.tokens.has("is-dragging"), false);
event(f.stage, "pointerdown", { button: 0, pointerType: "touch", clientX: 100, clientY: 100 });
event(f.stage, "pointermove", { pointerType: "touch", clientX: 200, clientY: 102 });
assert.equal(f.host.tokens.has("is-dragging"), true);
event(f.stage, "pointercancel"); assert.equal(f.host.tokens.has("is-dragging"), false);
f.observer.callback([{ isIntersecting: false }]);
assert.equal(f.host.tokens.has("is-in-view"), false);
event(f.win, "pagehide", { persisted: true }); assert.ok(!f.observer.disconnected, "bfcache must preserve the controller");
event(f.win, "pagehide", { persisted: false }); assert.ok(f.observer.disconnected);
const old = f.host.styles.get("--scene-x"); event(f.stage, "keydown", { key: "ArrowLeft" });
assert.equal(f.host.styles.get("--scene-x"), old, "Disposed event handlers must not execute");

const story = fixture({ cinematic: true });
assert.equal(story.story.styles.get("--story-progress"), "0.5000");
assert.equal(story.intro.inert, true, "Faded intro links must leave keyboard focus order");
assert.ok(Number(story.story.styles.get("--story-night")) > .9);
story.setStoryTop(0); event(story.win, "scroll"); story.frames.shift()();
assert.equal(story.story.styles.get("--story-progress"), "0.0000", "Reverse scrolling restores the initial composition");
assert.equal(story.intro.inert, false);
const still = fixture({ cinematic: true, reduced: true });
assert.equal(still.story.tokens.has("story-ready"), false, "Reduced motion must not create a pinned scroll sequence");
for (const value of [-1, 0, .2, .5, .8, 1, 2, NaN]) {
  const frame = storyFrame(value);
  assert.ok(Object.values(frame).flat().every(Number.isFinite));
  assert.ok(frame.progress >= 0 && frame.progress <= 1);
  assert.ok(frame.copy.filter((opacity) => opacity > .5).length <= 1, "Chapter texts must not overlap");
}
assert.notEqual(storyFrame(.3).rotateY, storyFrame(.6).rotateY);
assert.ok(storyFrame(.35).spread > .9 && storyFrame(.85).nucleus > .9);

// Guard the actual delivered asset budgets, not source-file sizes.
const dist = new URL("../dist/", import.meta.url);
const home = await readFile(new URL("es/index.html", dist), "utf8");
const contact = await readFile(new URL("es/contacto/index.html", dist), "utf8");
const entry = home.match(/type="module" src="([^"]+)"/)[1];
const css = home.match(/rel="stylesheet" href="([^"]+)"/)[1];
assert.ok(gzipSync(await readFile(new URL(entry.slice(1), dist))).length < 6000, "Critical JavaScript budget: 6 KB gzip");
assert.ok(gzipSync(await readFile(new URL(css.slice(1), dist))).length < 20000, "CSS budget: 20 KB gzip");
assert.ok(!/modulepreload[^>]+ecosystem-scene/.test(home), "The GPU renderer must stay lazy");
assert.ok(!contact.includes("data-ecosystem"), "Contact pages must not instantiate a 3D scene");
for (const lang of ["de", "en", "es"]) {
  for (const key of ["home", "websites"]) {
    const html = await readFile(new URL(paths[lang][key].slice(1) + "index.html", dist), "utf8");
    assert.ok(html.includes('data-scene-stage tabindex="0"'), `${lang}/${key}: keyboard-accessible scene`);
    assert.ok(html.includes("ecosystem__fallback"), `${lang}/${key}: useful server-rendered fallback`);
    assert.ok(html.includes('data-scene-depth aria-label="'), `${lang}/${key}: labelled depth control`);
  }
}
const assets = await readdir(new URL("assets/", dist));
assert.ok(assets.some((name) => name.startsWith("ecosystem-scene-") && name.endsWith(".js")));
console.log("Scene: reduced motion, data saving, GPU fallback, native touch scroll, keyboard, disposal, bfcache and asset budgets: OK");
