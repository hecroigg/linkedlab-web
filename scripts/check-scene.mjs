import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { mountEcosystem } from "../src/scene-controller.js";
import { content, paths } from "../src/content.mjs";
import { storyFrame } from "../src/story-timeline.mjs";
import { scenePixelRatio } from "../src/scene-quality.mjs";

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
function fixture({ reduced = false, saveData = false, cinematic = false, coarse = false, mobile = false } = {}) {
  const host = new Node(), stage = new Node(), pause = new Node(), reset = new Node(), depth = new Node(), canvas = new Node();
  const win = new Node(), doc = new Node(), media = new Node(), mobileMedia = new Node(), jobs = [], frames = [];
  const observers = []; let contexts = 0, contextOptions;
  depth.value = "0"; pause.dataset = { playLabel: "Play", pauseLabel: "Pause" };
  canvas.getContext = (type, options) => { contexts++; contextOptions = options; return null; };
  host.querySelector = (selector) => ({ "[data-scene-stage]": stage, "[data-scene-pause]": pause, "[data-scene-reset]": reset, "[data-scene-depth]": depth, "[data-scene-canvas]": canvas })[selector];
  const story = new Node(), intro = new Node(), chapters = [new Node(), new Node(), new Node()];
  const sequence = new Node(), introSlot = new Node();
  const introParent = { insertBefore: (child) => { child.parentElement = introParent; } };
  intro.parentElement = introParent;
  introSlot.append = (child) => { child.parentElement = introSlot; };
  let storyTop = -1100;
  story.getBoundingClientRect = () => ({ top: storyTop, height: 3000, bottom: storyTop + 3000 });
  sequence.getBoundingClientRect = () => ({ top: storyTop, height: 3000, bottom: storyTop + 3000 });
  story.querySelector = (selector) => ({ "[data-story-sequence]": sequence, "[data-story-intro-slot]": introSlot, "[data-story-viewport]": { clientHeight: 800 }, "[data-story-intro]": intro, "[data-story-count]": new Node() })[selector];
  story.querySelectorAll = () => chapters;
  host.closest = (selector) => selector === "[data-scroll-story]" ? cinematic ? story : null : { getBoundingClientRect: () => ({ top: -100, height: 500 }) };
  doc.querySelector = () => null;
  media.matches = reduced;
  mobileMedia.matches = mobile;
  Object.assign(globalThis, {
    window: Object.assign(win, { WebGL2RenderingContext: class {}, requestIdleCallback: true }), document: doc,
    matchMedia: (query) => query.includes("reduced-motion") ? media : query.includes("max-width: 720px") ? mobileMedia : Object.assign(new Node(), { matches: query.includes("pointer: coarse") && coarse }),
    requestIdleCallback: (fn) => jobs.push(fn), cancelIdleCallback: () => {},
    requestAnimationFrame: (fn) => frames.push(fn), cancelAnimationFrame: () => {}, innerHeight: 900,
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {} disconnect() { this.disconnected = true; }
    }
  });
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { connection: { saveData } } });
  mountEcosystem(host);
  return { host, stage, pause, reset, depth, win, doc, media, mobileMedia, jobs, frames, story, sequence, intro, introSlot, introParent, chapters, setStoryTop: (value) => { storyTop = value; }, observer: observers[0], contexts: () => contexts, contextOptions: () => contextOptions };
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
const phone = fixture({ cinematic: true, mobile: true });
assert.equal(phone.intro.parentElement, phone.introSlot, "Mobile introduction must precede the pinned 3D scene");
assert.equal(phone.intro.inert, false, "Mobile introduction remains readable and keyboard-accessible while the scene scrolls");
phone.story.getBoundingClientRect = () => ({ top: -500, height: 3500, bottom: 3000 });
phone.setStoryTop(200); event(phone.win, "scroll"); phone.frames.shift()();
assert.equal(phone.story.styles.get("--story-progress"), "0.0000", "Reading the mobile introduction must not advance the animation");
phone.mobileMedia.matches = false; event(phone.mobileMedia, "change"); phone.frames.shift()();
assert.equal(phone.intro.parentElement, phone.introParent, "Desktop resize restores the original composition");
phone.mobileMedia.matches = true; event(phone.mobileMedia, "change"); phone.frames.shift()();
assert.equal(phone.intro.parentElement, phone.introSlot, "Returning to mobile does not duplicate the introduction");
const staticPhone = fixture({ cinematic: true, mobile: true, reduced: true });
assert.equal(staticPhone.intro.parentElement, staticPhone.introSlot);
assert.equal(staticPhone.intro.inert, false);
for (const value of [-1, 0, .2, .5, .8, 1, 2, NaN]) {
  const frame = storyFrame(value);
  assert.ok(Object.values(frame).flat().every(Number.isFinite));
  assert.ok(frame.progress >= 0 && frame.progress <= 1);
  assert.ok(frame.copy.filter((opacity) => opacity > .5).length <= 1, "Chapter texts must not overlap");
}
assert.notEqual(storyFrame(.3).rotateY, storyFrame(.6).rotateY);
assert.ok(storyFrame(.35).spread > .9 && storyFrame(.85).nucleus > .9);

// Readability regressions: fullscreen rendering must not fall below CSS resolution,
// and common Retina phones should keep all three device pixels per CSS pixel.
assert.equal(scenePixelRatio(390, 844, 3, true), 3, "Retina phone preserves native sharpness");
assert.equal(scenePixelRatio(430, 932, 3, true), 3, "Large Retina phone preserves native sharpness");
assert.equal(scenePixelRatio(1920, 1080, 2, false), 2, "Retina desktop keeps double-density output");
assert.equal(scenePixelRatio(5120, 2880, 1, false), 1, "Large displays must not be undersampled");
assert.equal(scenePixelRatio(1024, 768, 1, false), 1, "Standard-density output stays bounded");
assert.equal(scenePixelRatio(0, 844, 3, true), 1, "Collapsed stage has a safe ratio");
assert.equal(scenePixelRatio(390, NaN, 3, true), 1);
assert.equal(scenePixelRatio(390, 844, NaN, true), 1);
for (const [width, height, coarse] of [[2048, 1152, false], [3840, 2160, false], [1024, 1366, true]]) {
  const ratio = scenePixelRatio(width, height, 3, coarse);
  assert.ok(ratio >= 1, "Quality budget must not blur a fullscreen stage");
  assert.ok(width * height * ratio * ratio <= Math.max(width * height, coarse ? 4200000 : 8400000) + 1, "GPU allocation remains bounded");
}
assert.equal(scenePixelRatio(5120, 2880, 2, false, 4096), .8, "Respect hardware texture limits");
for (const coarse of [false, true]) {
  const aa = fixture({ coarse });
  aa.observer.callback([{ isIntersecting: true }]); await aa.jobs.shift()();
  assert.equal(aa.contextOptions().antialias, true, "Smooth edges must be requested when the context is created, including touch devices");
  event(aa.win, "pagehide", { persisted: false });
}

// Guard the actual delivered asset budgets, not source-file sizes.
const dist = new URL("../dist/", import.meta.url);
const home = await readFile(new URL("es/index.html", dist), "utf8");
for (const lang of ["de", "en", "es"]) {
  const html = await readFile(new URL(`${lang}/index.html`, dist), "utf8");
  assert.ok(html.includes(content[lang].home.heroTextMobile), `${lang}: problem-focused mobile description`);
  assert.ok(!/Mannheim|Ludwigshafen|Rhein-Neckar/.test(content[lang].home.heroTextMobile), `${lang}: mobile description omits locations`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang}: a single accessible heading across layouts`);
}
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
