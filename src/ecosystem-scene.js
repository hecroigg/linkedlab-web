import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Shape, ExtrudeGeometry,
  PlaneGeometry, TorusGeometry, SphereGeometry, TubeGeometry, CatmullRomCurve3, Vector3,
  MeshStandardMaterial, MeshBasicMaterial, CanvasTexture, SRGBColorSpace,
  HemisphereLight, DirectionalLight, PMREMGenerator, ACESFilmicToneMapping
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ecosystemCopy } from "./ecosystem-markup.mjs";
import { scenePixelRatio } from "./scene-quality.mjs";

const BLUE = 0x2864ff;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const ease = (value) => 1 - Math.pow(1 - clamp(value, 0, 1), 3);

// All surfaces are drawn locally: no remote fonts, models, HDRs, images or tracking.
function surfaceTexture(width, height, draw, density = 2) {
  const canvas = document.createElement("canvas");
  canvas.width = width * density; canvas.height = height * density;
  const ctx = canvas.getContext("2d");
  ctx.scale(density, density);
  draw(ctx, width, height);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function round(ctx, x, y, w, h, r, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}
function text(ctx, value, x, y, size, color = "#13233f", weight = 600) {
  ctx.font = `${weight} ${size}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = color; ctx.fillText(value, x, y);
}
function dot(ctx, x, y, r, color) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}

function websiteTexture(c) {
  return surfaceTexture(1024, 716, (ctx) => {
    round(ctx, 0, 0, 1024, 716, 30, "#f8faff");
    round(ctx, 0, 0, 1024, 70, [30, 30, 0, 0], "#fff");
    ["#c4cee0", "#d6deea", "#e4e9f3"].forEach((color, i) => dot(ctx, 30 + i * 20, 35, 5, color));
    round(ctx, 300, 20, 420, 30, 8, "#f2f5fa");
    text(ctx, "linkedlab.eu", 455, 41, 14, "#6d7a91", 500);
    text(ctx, "↗", 964, 43, 23, "#8a9ab4");
    text(ctx, "◈", 40, 128, 34, "#2864ff");
    text(ctx, "LinkedLab", 85, 126, 23, "#152846", 750);
    [0, 1, 2].forEach((i) => round(ctx, 685 + i * 82, 109, 57, 5, 3, "#c4cee0"));
    text(ctx, "DESIGNED AROUND YOU", 43, 210, 14, "#6b7ea4", 700);
    text(ctx, c.line1, 40, 285, 58, "#10233f", 750);
    text(ctx, c.line2, 40, 353, 58, "#2864ff", 750);
    round(ctx, 43, 390, 270, 7, 4, "#b7c5db");
    round(ctx, 43, 412, 227, 7, 4, "#ced8e8");
    round(ctx, 43, 455, 225, 47, 24, "#2864ff");
    text(ctx, c.web, 64, 485, 19, "#fff", 650);
    text(ctx, "↗", 232, 485, 21, "#fff");
    // The sculptural mark itself is geometry, floating above this surface.
    const gradient = ctx.createRadialGradient(770, 335, 12, 770, 335, 205);
    gradient.addColorStop(0, "#dce7ff"); gradient.addColorStop(1, "#f8faff");
    round(ctx, 543, 164, 442, 371, 50, gradient);
    for (let i = 0; i < 3; i++) {
      round(ctx, 40 + i * 320, 558, 299, 117, 15, "#fff");
      dot(ctx, 68 + i * 320, 590, 9, ["#2864ff", "#8666e5", "#5885dd"][i]);
      round(ctx, 87 + i * 320, 585, 90, 7, 4, "#9fadc7");
      round(ctx, 60 + i * 320, 617, 230, 6, 3, "#d8e0ee");
      round(ctx, 60 + i * 320, 637, 175, 6, 3, "#e3e9f3");
    }
  });
}

function widgetTexture(label, kind) {
  return surfaceTexture(512, 320, (ctx) => {
    const dark = kind === "automation";
    round(ctx, 0, 0, 512, 320, 28, dark ? "#112b69" : "#fff");
    const ink = dark ? "#fff" : "#172b4d";
    const muted = dark ? "#9db5ec" : "#8493af";
    text(ctx, { clients: "CLIENT RELATIONSHIPS", bookings: "YOUR NEXT STEP", analytics: "A CLEARER PICTURE", automation: "LESS REPETITION" }[kind], 30, 43, 13, muted, 650);
    text(ctx, label, 30, 91, 32, ink, 700);
    if (kind === "clients") {
      for (let i = 0; i < 3; i++) {
        dot(ctx, 49, 139 + i * 61, 17, ["#e1eaff", "#f0e7ff", "#e2f2f0"][i]);
        round(ctx, 82, 129 + i * 61, 180 - i * 19, 8, 4, "#b2bfd5");
        round(ctx, 82, 147 + i * 61, 117, 5, 3, "#e0e6f1");
        dot(ctx, 452, 139 + i * 61, 5, "#5d89ff");
      }
    } else if (kind === "bookings") {
      for (let i = 0; i < 21; i++) {
        const x = 31 + i % 7 * 66, y = 121 + Math.floor(i / 7) * 57;
        round(ctx, x, y, 48, 41, 9, i === 10 ? "#2864ff" : "#f1f5fc");
        if (i === 10) text(ctx, "✓", x + 13, y + 28, 22, "#fff");
        else dot(ctx, x + 24, y + 20, 3, "#bccbe0");
      }
    } else if (kind === "analytics") {
      for (let i = 0; i < 7; i++) {
        const h = [35, 65, 47, 95, 79, 122, 145][i];
        round(ctx, 35 + i * 64, 279 - h, 36, h, 7, i === 6 ? "#2864ff" : "#dce7ff");
      }
    } else {
      ctx.strokeStyle = "#718dcb"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(90, 195); ctx.lineTo(420, 195); ctx.stroke();
      [90, 256, 420].forEach((x, i) => { round(ctx, x - 35, 160, 70, 70, 21, i === 1 ? "#5081ff" : "#264579"); text(ctx, ["↗", "⌘", "✓"][i], x - 15, 207, 35, "#fff"); });
      round(ctx, 132, 273, 250, 6, 3, "#47649c");
    }
  });
}

function panelGeometry(w, h, depth = .09, r = .13) {
  const s = new Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const geometry = new ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .025, bevelThickness: .025, curveSegments: 5 });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

export function createEcosystem(host, state, { coarse, context }) {
  const stage = host.querySelector("[data-scene-stage]");
  const canvas = host.querySelector("canvas");
  const c = ecosystemCopy[host.dataset.lang] || ecosystemCopy.en;
  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "low-power", stencil: false });
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, .1, 60);
  const world = new Group(); scene.add(world);
  scene.add(new HemisphereLight(0xe7efff, 0x6a79a2, 3));
  const key = new DirectionalLight(0xffffff, 4.2); key.position.set(-3, 7, 7); scene.add(key);
  const fill = new DirectionalLight(0x9cb9ff, 2.2); fill.position.set(6, -1, 4); scene.add(fill);
  let environment;
  if (!coarse) {
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose(); pmrem.dispose();
  }
  const blue = new MeshStandardMaterial({ color: BLUE, metalness: .52, roughness: .21 });
  const violet = new MeshStandardMaterial({ color: 0x8362df, metalness: .48, roughness: .23 });
  const silver = new MeshStandardMaterial({ color: 0xd8e3fb, metalness: .65, roughness: .26 });
  const white = new MeshStandardMaterial({ color: 0xeaf0ff, metalness: .32, roughness: .3 });
  const nodes = [];
  function plate(w, h, texture, material = white) {
    const group = new Group();
    group.add(new Mesh(panelGeometry(w, h), material));
    if (texture) {
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      const front = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }));
      front.position.z = .074; group.add(front);
    }
    return group;
  }
  const browser = new Group();
  const backing = plate(4.83, 3.43, null, blue);
  backing.position.set(-.14, -.14, -.24); browser.add(backing);
  const wire = plate(4.83, 3.43, null, silver);
  wire.position.set(-.27, -.26, -.51); browser.add(wire);
  const web = plate(4.8, 3.36, websiteTexture(c)); browser.add(web);
  const sculpture = new Group(); sculpture.position.set(1.16, .05, .42);
  const a = new Mesh(new TorusGeometry(.58, .18, coarse ? 12 : 16, 64), blue);
  a.rotation.set(.32, -.4, -.53);
  const b = new Mesh(new TorusGeometry(.58, .18, coarse ? 12 : 16, 64), violet);
  b.position.set(.32, .42, .1); b.rotation.set(-.42, .76, -.45);
  sculpture.add(a, b); web.add(sculpture);
  browser.position.set(.05, .03, 0); browser.rotation.set(-.12, -.26, -.065); world.add(browser);
  const nucleusTexture = surfaceTexture(320, 320, (ctx) => {
    round(ctx, 0, 0, 320, 320, 32, "#fff");
    const logo = host.querySelector(".ecosystem__nucleus img");
    if (logo?.complete && logo.naturalWidth) ctx.drawImage(logo, 25, 10, 270, 270);
    else text(ctx, "◈", 90, 200, 150, "#2864ff", 750);
    text(ctx, "LinkedLab", 75, 288, 34, "#122a57", 750);
  });
  const nucleus = plate(1.4, 1.4, nucleusTexture, blue);
  nucleus.position.set(0, .12, 1.45); nucleus.scale.setScalar(.001); world.add(nucleus);

  const widgetSpecs = [
    [c.clients, "clients", [-2.6, .48, 1.45], [0, .18, .08], 1.91, 1.2],
    [c.bookings, "bookings", [2.53, 1.63, -.35], [-.08, -.2, -.07], 1.86, 1.17],
    [c.automation, "automation", [1.7, -1.73, 1.22], [.04, -.18, -.045], 2.13, 1.34],
    [c.analytics, "analytics", [-2.47, -1.72, -.7], [-.12, .18, .065], 1.62, 1.02]
  ];
  widgetSpecs.forEach(([label, kind, position, rotation, w, h], i) => {
    const group = plate(w, h, widgetTexture(label, kind), kind === "automation" ? blue : white);
    group.position.fromArray(position); group.rotation.fromArray(rotation);
    group.userData.base = new Vector3(...position); group.userData.phase = i * 1.7;
    world.add(group); nodes.push(group);
  });
  const floatingLink = new Mesh(new TorusGeometry(.34, .09, 8, 36), silver);
  floatingLink.position.set(-1.9, 2.25, -.5); floatingLink.rotation.set(.7, -.4, .5); world.add(floatingLink);

  const paths = [];
  const points = [];
  const lineMaterial = new MeshBasicMaterial({ color: 0xa3baff, transparent: true, opacity: .55 });
  nodes.forEach((node, i) => {
    const p = node.userData.base;
    const curve = new CatmullRomCurve3([new Vector3(p.x, p.y, p.z - .2), new Vector3(p.x * .86, p.y * 1.1, -.85), new Vector3(p.x * .45, p.y * .9, -.8), new Vector3(.3, .1, -.6)]);
    world.add(new Mesh(new TubeGeometry(curve, 28, .011, 4, false), lineMaterial));
    const point = new Mesh(new SphereGeometry(.037, 7, 5), new MeshBasicMaterial({ color: i % 2 ? 0x8a6fed : BLUE }));
    world.add(point); paths.push(curve); points.push(point);
  });

  const shadowTexture = surfaceTexture(128, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(32,70,146,.23)"); gradient.addColorStop(1, "rgba(32,70,146,0)");
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
  }, 1);
  const shadow = new Mesh(new PlaneGeometry(8.5, 3), new MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
  shadow.position.set(0, -2.65, -.8); shadow.rotation.x = -.8; world.add(shadow);

  let disposed = false, contextLost = false, visible = false, raf = 0, previous = 0, started = performance.now(), until = started + 2200;
  let yaw = 0, pitch = 0, expansion = 0, baseCameraDistance = 11.5, portrait = false;
  const now = () => performance.now();
  const frameInterval = 1000 / (coarse ? 30 : 45);
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height || disposed) return;
    const dpr = scenePixelRatio(width, height, window.devicePixelRatio || 1, coarse, renderer.capabilities.maxTextureSize);
    renderer.setPixelRatio(dpr); renderer.setSize(width, height, false);
    camera.aspect = width / height;
    baseCameraDistance = Math.max(11.5, 8.1 / (2 * Math.tan(camera.fov * Math.PI / 360) * camera.aspect));
    portrait = width < height * .9;
    camera.position.z = baseCameraDistance;
    camera.position.y = .2;
    camera.lookAt(0, -.02, 0); camera.updateProjectionMatrix();
    request();
  }
  function render(time) {
    raf = 0;
    if (disposed || !visible) return;
    if (time - previous < frameInterval) { raf = requestAnimationFrame(render); return; }
    const dt = Math.min(.06, (time - previous) / 1000 || .02); previous = time;
    const smooth = 1 - Math.exp(-dt * 7.5);
    yaw += (state.x - yaw) * smooth;
    pitch += (state.y - pitch) * smooth;
    const cinematic = state.cinema ? state.frame : null;
    expansion += (Math.max(state.depth, cinematic ? cinematic.spread : state.scroll * .78) - expansion) * smooth;
    const entry = ease((time - started) / 1500);
    const life = state.paused || coarse && time - started > 2200 ? 0 : time / 1000;
    world.rotation.set(-.02 + pitch * .28 - state.scroll * .05, -.04 + yaw * .56 + state.scroll * .28, 0);
    world.scale.setScalar(.9 + entry * .1 + state.scroll * .035);
    browser.position.y = .03 + Math.sin(life * .65) * .035 - (1 - entry) * .25;
    browser.rotation.y = -.26 + (1 - entry) * -.24 + state.scroll * .16;
    backing.position.z = -.24 - expansion * .48;
    wire.position.z = -.51 - expansion * 1.1;
    sculpture.position.z = .42 + expansion * .5;
    if (life) sculpture.rotation.y = Math.sin(life * .35) * .08;
    if (cinematic) {
      const portraitY = state.mobileIntro ? -.2 + cinematic.center * 1.2 : -3 + cinematic.center * 4;
      world.position.set(portrait ? 0 : (1 - cinematic.center) * 2.3, portrait ? portraitY : -.05, 0);
      world.scale.setScalar((portrait ? .9 + cinematic.center * .1 : .64 + cinematic.center * .36) * (.97 + entry * .03));
      world.rotation.set(pitch * .16, yaw * .4, 0);
      browser.rotation.set(cinematic.rotateX * Math.PI / 180, cinematic.rotateY * Math.PI / 180, cinematic.rotateZ * Math.PI / 180);
      browser.scale.setScalar(cinematic.browserScale);
      browser.position.y = .03 + Math.sin(life * .65) * .035;
      camera.position.z = baseCameraDistance * cinematic.zoom;
      nucleus.scale.setScalar(Math.max(.001, cinematic.nucleus * 1.15));
      nucleus.rotation.set(.03, -.22 + cinematic.nucleus * .28 + yaw * .12, -.06);
    }
    nodes.forEach((node, i) => {
      const reveal = ease((time - started - 140 - i * 110) / 1000);
      const p = node.userData.base;
      node.position.set(p.x * (1 + expansion * .12), p.y + (1 - reveal) * (i % 2 ? -.5 : .6) + (life ? Math.sin(life * .7 + i * 1.7) * .06 : 0), p.z + expansion * (i % 2 ? -.75 : .45));
      if (cinematic) {
        const targets = [[-2.4, 1.25, 1], [2.4, 1.25, -.3], [2.1, -1.5, 1], [-2.3, -1.4, -.3]][i];
        node.position.set(p.x * (1 + expansion * .32) * (1 - cinematic.connect) + targets[0] * cinematic.connect, p.y + Math.sin(state.scroll * 7 + i * 1.5) * expansion * .4, p.z + expansion * (i % 2 ? -.7 : .8));
        node.rotation.y = (i % 2 ? -.2 : .18) + Math.sin(state.scroll * 6 + i) * .25;
        node.rotation.z = (i % 2 ? -.06 : .07) + Math.sin(state.scroll * 8 + i) * expansion * .14;
      }
      node.scale.setScalar(.88 + reveal * .12);
      points[i].position.copy(paths[i].getPointAt(life ? (life * .1 + i * .23) % 1 : .35));
    });
    floatingLink.rotation.y = -.4 + (life ? Math.sin(life * .4) * .18 : 0);
    renderer.render(scene, camera);
    if (!host.classList.contains("is-rendered")) host.classList.add("is-rendered");
    host.dataset.sceneState = state.paused ? "paused" : "ready";
    // Mobile renders on demand after assembly; desktop idles gently only while visible.
    if ((!state.paused && !coarse) || time < until || time - started < 1700) request();
  }
  function request() { if (visible && !disposed && !raf) raf = requestAnimationFrame(render); }
  function update() { until = now() + 850; request(); }
  function setVisible(value) {
    if (contextLost) return;
    visible = value;
    if (!value) { cancelAnimationFrame(raf); raf = 0; host.dataset.sceneState = "offscreen"; }
    else { previous = now() - frameInterval; update(); }
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(stage);
  window.addEventListener("resize", resize, { passive: true });
  function lost() { setVisible(false); contextLost = true; host.classList.remove("is-rendered"); host.dataset.sceneState = "fallback"; }
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  return {
    update, setVisible,
    dispose() {
      if (disposed) return;
      disposed = true; cancelAnimationFrame(raf); resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", lost);
      const geometries = new Set(), materials = new Set(), textures = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        for (const material of [].concat(object.material || [])) {
          materials.add(material);
          for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
        }
      });
      geometries.forEach((resource) => resource.dispose());
      textures.forEach((resource) => resource.dispose());
      materials.forEach((resource) => resource.dispose());
      environment?.dispose(); renderer.dispose(); renderer.forceContextLoss();
    }
  };
}
