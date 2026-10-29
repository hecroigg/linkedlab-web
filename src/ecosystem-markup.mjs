export const ecosystemCopy = {
  de: { title: "Ihr Geschäft. Digital verbunden.", line1: "Gute Ideen.", line2: "Starker Auftritt.", web: "Ihre Website", clients: "Kunden", bookings: "Termine", automation: "Automatisierung", analytics: "Einblicke", live: "Alles verbunden", drag: "Ziehen zum Drehen · Scrollen zum Entdecken", keyboard: "Pfeiltasten drehen die Szene. Escape setzt sie zurück.", layers: "Ebenen entdecken", pause: "Bewegung pausieren", play: "Bewegung starten", reset: "Ansicht zurücksetzen", scene: "Interaktives digitales Ökosystem von LinkedLab", build: "Von der Idee zum digitalen Erlebnis", system: "Eine Verbindung. Viele Möglichkeiten.", systemText: "Entdecken Sie, wie die einzelnen Bausteine zusammenspielen.", nodes: ["Die Website macht Ihr Angebot sichtbar.", "Anfragen landen an einem übersichtlichen Ort.", "Termine und nächste Schritte bleiben organisiert.", "Wiederkehrende Abläufe lassen sich verbinden.", "Wichtige Informationen werden verständlich."] },
  en: { title: "Your business. Connected.", line1: "Good ideas.", line2: "Great presence.", web: "Your website", clients: "Clients", bookings: "Bookings", automation: "Automation", analytics: "Insights", live: "Everything connected", drag: "Drag to rotate · Scroll to explore", keyboard: "Use the arrow keys to rotate. Escape resets the view.", layers: "Explore the layers", pause: "Pause motion", play: "Play motion", reset: "Reset the view", scene: "LinkedLab interactive digital ecosystem", build: "From an idea to a digital experience", system: "One connection. More possibilities.", systemText: "Explore how the individual pieces work together.", nodes: ["Your website makes your offer clear.", "Enquiries arrive in one organised place.", "Bookings and next steps stay in order.", "Repetitive workflows can be connected.", "Important information becomes easier to understand."] },
  es: { title: "Tu negocio. Todo conectado.", line1: "Buenas ideas.", line2: "Gran presencia.", web: "Tu página web", clients: "Clientes", bookings: "Reservas", automation: "Automatización", analytics: "Analítica", live: "Todo conectado", drag: "Arrastra para girar · Haz scroll para explorar", keyboard: "Usa las flechas para girar. Escape restablece la vista.", layers: "Explora las capas", pause: "Pausar movimiento", play: "Reanudar movimiento", reset: "Restablecer la vista", scene: "Ecosistema digital interactivo de LinkedLab", build: "De una idea a una experiencia digital", system: "Una conexión. Más posibilidades.", systemText: "Explora cómo encajan las piezas de tu negocio.", nodes: ["Tu web presenta lo que haces con claridad.", "Las consultas llegan a un lugar organizado.", "Las reservas y los siguientes pasos quedan ordenados.", "Los procesos repetitivos pueden conectarse.", "La información importante se entiende mejor."] }
};

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

export function renderEcosystem(lang, variant = "hero") {
  const c = ecosystemCopy[lang];
  const id = `ecosystem-${variant}`;
  return `<figure class="ecosystem ecosystem--${variant}" data-ecosystem data-lang="${lang}" data-scene-state="static">
    <div class="ecosystem__ambient" aria-hidden="true"></div>
    <div class="ecosystem__overline"><span class="ecosystem__dot"></span>THE LINKEDLAB ECOSYSTEM <span>01 — 05</span></div>
    <div class="ecosystem__stage" data-scene-stage tabindex="0" role="group" aria-label="${esc(c.scene)}" aria-describedby="${id}-help">
      <canvas class="ecosystem__canvas" data-scene-canvas aria-hidden="true"></canvas>
      <div class="ecosystem__fallback" aria-hidden="true">
        <svg class="ecosystem__connections" viewBox="0 0 800 600"><path d="M400 300C240 150 190 150 120 200M400 300C540 100 610 70 685 140M400 300C570 350 630 435 640 480M400 300C260 340 160 430 120 460"/></svg>
        <div class="ecosystem__floor"></div>
        <div class="ecosystem__backplate"></div>
        <div class="ecosystem__browser"><div class="ecosystem__chrome"><i></i><i></i><i></i><span>linkedlab.eu</span><b>↗</b></div><div class="ecosystem__screen"><span class="ecosystem__tiny-brand">◈ LinkedLab</span><strong>${c.line1}<br><em>${c.line2}</em></strong><span class="ecosystem__mock-button">${c.web} ↗</span><div class="ecosystem__sculpture"><i></i><i></i></div><div class="ecosystem__mock-grid"><i></i><i></i><i></i></div></div></div>
        <div class="ecosystem__tile ecosystem__tile--clients"><span>◎</span><div><small>CRM</small><strong>${c.clients}</strong><i></i><i></i><i></i></div></div>
        <div class="ecosystem__tile ecosystem__tile--bookings"><span>▦</span><div><small>WORKFLOW</small><strong>${c.bookings}</strong><i></i><i></i></div></div>
        <div class="ecosystem__tile ecosystem__tile--automation"><span>⌘</span><div><small>CONNECTED</small><strong>${c.automation}</strong><i></i><i></i></div></div>
        <div class="ecosystem__tile ecosystem__tile--analytics"><div><small>INSIGHTS</small><strong>${c.analytics}</strong><span class="ecosystem__bars"><i></i><i></i><i></i><i></i><i></i></span></div></div>
        <div class="ecosystem__nucleus"><img src="/assets/linkedlab-logo-mark.webp" width="128" height="128" alt=""><span>LinkedLab</span></div>
      </div>
    </div>
    <figcaption id="${id}-help" class="ecosystem__caption"><span><i aria-hidden="true">↔</i>${c.drag}</span><span class="sr-only">${c.keyboard}</span><div class="ecosystem__actions"><button type="button" data-scene-pause aria-label="${c.pause}" data-pause-label="${c.pause}" data-play-label="${c.play}" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button><button type="button" data-scene-reset aria-label="${c.reset}"><span aria-hidden="true">↺</span></button></div></figcaption>
    <label class="ecosystem__depth"><span>${c.layers}</span><input type="range" min="0" max="100" value="0" data-scene-depth aria-label="${c.layers}"><span aria-hidden="true">↗</span></label>
  </figure>`;
}

export function renderSystemNetwork(lang) {
  const c = ecosystemCopy[lang];
  const labels = [c.web, c.clients, c.bookings, c.automation, c.analytics];
  return `<div class="connected-system" data-connected-system><div class="connected-system__heading"><span class="ecosystem__dot"></span>LINKEDLAB / CONNECTED</div><div class="connected-system__map"><svg viewBox="0 0 480 300" aria-hidden="true"><path d="M240 150C200 40 120 40 82 72M240 150C300 25 380 35 400 72M240 150C180 270 100 260 82 232M240 150C300 270 385 260 400 232"/></svg><span class="connected-system__core" aria-hidden="true"><img src="/assets/linkedlab-logo-mark.webp" width="64" height="64" alt=""></span>${labels.map((label, i) => `<button type="button" class="connected-system__node connected-system__node--${i}" data-system-node="${i}" aria-pressed="${i === 0}" aria-describedby="system-explanation"><small>0${i + 1}</small><strong>${label}</strong></button>`).join("")}</div><p class="connected-system__detail" id="system-explanation" data-system-explanation aria-live="polite">${c.nodes[0]}</p><script type="application/json" data-system-copy>${JSON.stringify(c.nodes).replaceAll("<", "\\u003c")}</script></div>`;
}
