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
