import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { site } from "../src/site.config.mjs";
import { paths } from "../src/content.mjs";

const client = await readFile(new URL("../src/client.js", import.meta.url), "utf8");
const classes = () => {
  const values = new Set();
  return {
    add: (value) => values.add(value), remove: (value) => values.delete(value),
    contains: (value) => values.has(value),
    toggle: (value, enabled) => enabled ? values.add(value) : values.delete(value)
  };
};

function simulate(search, memory = new Map(), storageBlocked = false) {
  const globalEvents = new Map();
  const mediaEvents = new Map();
  const linkObjects = site.contacts.map((contact) => ({ href: `${contact.whatsapp}?text=Hello` }));
  const rangeEvents = new Map();
  const rangeStyles = new Map();
  const range = { value: "3", addEventListener: (name, handler) => rangeEvents.set(name, handler), style: { setProperty: (key, value) => rangeStyles.set(key, value) } };
  const clients = { textContent: "" }, earnings = { textContent: "" };
  const attributes = new Map([["aria-expanded", "false"]]);
  const menuEvents = new Map();
  const menu = { hidden: true };
  const menuButton = {
    dataset: { openLabel: "Open", closeLabel: "Close" }, innerHTML: "", focus: () => {},
    getAttribute: (key) => attributes.get(key), setAttribute: (key, value) => attributes.set(key, value),
    addEventListener: (name, handler) => menuEvents.set(name, handler),
    click: () => menuEvents.get("click")()
  };
  const selectors = new Map([[".menu-button", menuButton], ["#mobile-menu", menu], ["[data-partner-range]", range], ["[data-partner-clients]", clients], ["[data-partner-earnings]", earnings]]);
  const body = { classList: classes() };
  runInNewContext(client, {
    URL, URLSearchParams, console,
    location: new URL(`https://linkedlab.eu/en/contact/${search}`),
    document: {
      cookie: "", body, documentElement: { classList: classes() },
      querySelector: (selector) => selectors.get(selector) || null,
      querySelectorAll: (selector) => selector === "[data-whatsapp-link]" ? linkObjects : []
    },
    sessionStorage: {
      setItem: (key, value) => { if (storageBlocked) throw new Error("blocked"); memory.set(key, value); },
      getItem: (key) => { if (storageBlocked) throw new Error("blocked"); return memory.get(key) || null; }
    },
    matchMedia: (query) => ({ matches: query.includes("reduced-motion"), addEventListener: (name, handler) => mediaEvents.set(`${query}:${name}`, handler) }),
    addEventListener: (name, handler) => globalEvents.set(name, [...(globalEvents.get(name) || []), handler])
  });
  return { linkObjects, range, rangeEvents, rangeStyles, clients, earnings, menu, menuButton, mediaEvents, body };
}

const memory = new Map();
for (const result of [simulate("?ref=test50", memory), simulate("", memory), simulate("?ref=test50", new Map(), true)]) {
  for (const [index, link] of result.linkObjects.entries()) {
    const url = new URL(link.href);
    assert.equal(url.pathname, new URL(site.contacts[index].whatsapp).pathname);
    assert.equal(url.searchParams.get("text"), "Hello\n\nReferral code: TEST50");
  }
}
for (const link of simulate("?ref=%3Cscript%3E").linkObjects) assert.equal(new URL(link.href).searchParams.get("text"), "Hello");

const result = simulate("");
for (const [value, expected] of [["1", "50 €"], ["3", "150 €"], ["10", "500 €"]]) {
  result.range.value = value;
  result.rangeEvents.get("input")();
  assert.equal(result.clients.textContent, value);
  assert.equal(result.earnings.textContent, expected);
}
assert.equal(result.rangeStyles.get("--range-progress"), "100%");
result.menuButton.click();
assert.equal(result.menu.hidden, false);
assert.equal(result.body.classList.contains("menu-open"), true);
result.mediaEvents.get("(min-width: 1281px):change")({ matches: true });
assert.equal(result.menu.hidden, true);
assert.equal(result.body.classList.contains("menu-open"), false);

for (const lang of site.languages) {
  const html = await readFile(new URL(`../dist${paths[lang].contact}index.html`, import.meta.url), "utf8");
  const choices = [...html.matchAll(/class="contact-number"[^>]+href="([^"]+)"[^>]+data-contact-region="([^"]+)"/g)];
  assert.equal(choices.length, 2, `${lang}: both regional contact choices`);
  assert.equal(choices[0][2], lang === "es" ? "es" : "de");
  for (const contact of site.contacts) {
    assert.match(contact.phone, /^\+[1-9]\d{7,14}$/);
    assert.equal(new URL(contact.whatsapp).pathname, `/${contact.phone.slice(1)}`);
    assert.ok(html.includes(contact.display), `${lang}: displayed contact`);
    assert.ok(html.includes(`href="${contact.whatsapp}?text=`), `${lang}: WhatsApp target`);
    const legal = await readFile(new URL(`../dist${paths[lang].legal}index.html`, import.meta.url), "utf8");
    assert.ok(legal.includes(`href="tel:${contact.phone}"`), `${lang}: legal phone`);
  }
}
console.log("Contact targets, regional order, referrals, calculator and responsive menu: OK");
