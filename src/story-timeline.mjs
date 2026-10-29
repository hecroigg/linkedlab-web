const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (a, b, n) => { const t = clamp((n - a) / (b - a)); return t * t * (3 - 2 * t); };
const track = (p, stops) => {
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i][0]) {
      const [a, av] = stops[i - 1], [b, bv] = stops[i];
      return av + (bv - av) * smooth(a, b, p);
    }
  }
  return stops.at(-1)[1];
};

// One deterministic timeline drives both CSS 3D and WebGL, including reverse scroll.
export function storyFrame(progress) {
  const p = clamp(Number(progress) || 0);
  return {
    progress: p,
    intro: 1 - smooth(.035, .18, p),
    center: smooth(.045, .24, p),
    spread: smooth(.16, .39, p) * (1 - smooth(.62, .86, p) * .82),
    connect: smooth(.45, .77, p),
    night: smooth(.14, .3, p) * (1 - smooth(.87, 1, p)),
    nucleus: smooth(.66, .83, p),
    exit: smooth(.94, 1, p),
    browserScale: track(p, [[0, 1], [.28, .92], [.57, .83], [.85, .48], [1, .64]]),
    rotateX: track(p, [[0, 12], [.3, 32], [.58, -12], [.85, 8], [1, 0]]),
    rotateY: track(p, [[0, -19], [.3, -43], [.58, 32], [.85, -18], [1, 0]]),
    rotateZ: track(p, [[0, -5], [.3, -13], [.58, 9], [.85, -7], [1, 0]]),
    zoom: track(p, [[0, 1], [.28, .8], [.58, .97], [.85, .9], [1, 1]]),
    copy: [
      smooth(.15, .22, p) * (1 - smooth(.37, .43, p)),
      smooth(.43, .49, p) * (1 - smooth(.66, .72, p)),
      smooth(.72, .79, p)
    ]
  };
}
