/* ==========================================================================
   Renders content.js into the page and wires up the interactions.
   You shouldn't need to edit this file to change content.
   ========================================================================== */
(function () {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const fill = (slot, html) => $$(`[data-slot="${slot}"]`).forEach((el) => (el.innerHTML = html));
  const isExternal = (url) => /^https?:/.test(url || "");
  const linkAttrs = (url) => (isExternal(url) || /\.pdf$/i.test(url || "") ? ' target="_blank" rel="noopener"' : "");
  // Media without a src is only shown when placeholders are switched on
  const visible = (list) => (list || []).filter((m) => m && (m.src || S.showPlaceholders));
  // A trailing "." becomes the signature square full stop.
  const squareStop = (text) => {
    const t = esc(text);
    return t.endsWith(".") ? `${t.slice(0, -1)}<span class="sq"></span>` : t;
  };
  // *part* → accent-coloured span (poster wordmarks)
  const accentParts = (text) => esc(text).replace(/\*(.+?)\*/g, '<span class="poster__accent">$1</span>');

  /* ---------------------------------------------------------------------
     MEDIA — images, videos, posters and labelled placeholders.
     Every item is registered in a gallery so the lightbox can page it.
  --------------------------------------------------------------------- */
  const galleries = {};

  function placeholder(m) {
    const ratio = m.ratio || "16/10";
    return `<span class="ph"><span class="ph__label">${esc(m.label || "[Image]")}</span><span class="ph__ratio">${esc(ratio.replace("/", ":"))}</span></span>`;
  }

  function mediaInner(m) {
    if (m.src && (m.type === "video" || /\.(mp4|webm)$/i.test(m.src))) {
      return `<video src="${esc(m.src)}" ${m.poster ? `poster="${esc(m.poster)}"` : ""} autoplay muted loop playsinline></video>`;
    }
    if (m.src) {
      return `<img src="${esc(m.src)}" alt="${esc(m.alt || m.caption || m.label || "")}" loading="lazy" decoding="async">`;
    }
    return placeholder(m);
  }

  // Typographic poster shown in place of a project's empty hero image
  function posterInner(p, index, m) {
    const po = p.poster;
    return `<span class="poster poster--${esc(po.style || "heavy")}" style="--p-bg:${esc(po.bg)};--p-fg:${esc(po.fg)};--p-accent:${esc(po.accent)}">
      <span class="poster__meta">${pad(index + 1)} / ${esc(p.category)}</span>
      <span class="poster__mark">${accentParts(po.wordmark || p.title)}</span>
      <span class="poster__tag">${esc(po.tagline || "")}</span>
      ${S.showPlaceholders ? `<span class="poster__ph">${esc(m.label)}</span>` : ""}
    </span>`;
  }

  function media(m, gid, i, cls = "", inner) {
    (galleries[gid] = galleries[gid] || [])[i] = { ...m, _inner: inner };
    return `<figure class="media ${cls}" style="--ratio:${esc(m.ratio || "16/10")}">
      <button class="media__btn" type="button" data-gallery="${gid}" data-index="${i}" aria-label="Enlarge: ${esc(m.caption || m.label || "image")}">
        ${inner || mediaInner(m)}
      </button>
      ${m.caption ? `<figcaption class="media__cap"><span>${pad(i + 1)}</span>${esc(m.caption)}</figcaption>` : ""}
    </figure>`;
  }

  /* ---------------------------------------------------------------------
     PROJECT GALLERY LAYOUTS
  --------------------------------------------------------------------- */
  function gallery(p, n) {
    const gid = p.id;
    // The first item stays (as a poster if it has no src); the rest need a src
    const items = (p.media || []).filter((it, i) => (i === 0 && p.poster) || it.src || S.showPlaceholders);
    // A poster standing on its own is always shown wide
    if (items.length === 1 && !items[0].src) items[0] = { ...items[0], ratio: "16/8" };
    const m = (item, i, cls) =>
      media(item, gid, i, cls, i === 0 && !item.src && p.poster ? posterInner(p, n, item) : undefined);
    // Layouts built for several images fall back to a single full-width frame
    const layout = items.length < 2 ? "feature" : items.length < 3 && p.layout === "stack" ? "split" : p.layout;

    switch (layout) {
      case "carousel":
        return `<div class="carousel" data-carousel>
          <div class="carousel__track" tabindex="0" aria-label="${esc(p.title)} images">
            ${items.map((it, i) => `<div class="carousel__slide">${m(it, i)}</div>`).join("")}
          </div>
          <div class="carousel__ui label">
            <span class="carousel__count"><b>01</b> / ${pad(items.length)}</span>
            <span class="carousel__hint">Drag or use the arrows</span>
            <span class="carousel__btns">
              <button type="button" data-dir="-1" aria-label="Previous image">←</button>
              <button type="button" data-dir="1" aria-label="Next image">→</button>
            </span>
          </div>
        </div>`;

      case "floating": {
        const [first, ...rest] = items;
        return `<div class="g g--floating">
          <div class="g__hero">
            ${first ? m(first, 0, "media--hero") : ""}
            <aside class="floater" aria-label="Project metadata">
              <span class="floater__row"><span>Project</span><b>${esc(p.title)}</b></span>
              <span class="floater__row"><span>Type</span><b>${esc(p.category.split("/").slice(-1)[0].trim())}</b></span>
              <span class="floater__row"><span>Stack</span><b>${esc(p.stack.slice(0, 3).join(", "))}</b></span>
              ${p.year ? `<span class="floater__row"><span>Year</span><b>${esc(p.year)}</b></span>` : ""}
            </aside>
          </div>
          ${rest.length ? `<div class="g__row g__row--${Math.min(rest.length, 3)}">${rest.map((it, i) => m(it, i + 1)).join("")}</div>` : ""}
        </div>`;
      }

      case "stack": {
        const [a, b, c, ...rest] = items;
        return `<div class="g g--stack">
          ${a ? m(a, 0, "g__big") : ""}
          ${b ? m(b, 1) : ""}
          ${c ? m(c, 2) : ""}
          ${rest.map((it, i) => m(it, i + 3, "g__wide")).join("")}
        </div>`;
      }

      case "split":
        return `<div class="g g--split">${items.map((it, i) => m(it, i)).join("")}</div>`;

      case "feature":
      default: {
        const [first, ...rest] = items;
        return `<div class="g g--feature">
          ${first ? m(first, 0, "media--hero") : ""}
          ${rest.length ? `<div class="g__row g__row--${Math.min(rest.length, 3)}">${rest.map((it, i) => m(it, i + 1)).join("")}</div>` : ""}
        </div>`;
      }
    }
  }

  /* ---------------------------------------------------------------------
     SHARED PIECES
  --------------------------------------------------------------------- */
  const tagList = (items, cls = "tags") => `<ul class="${cls}">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const linkList = (links) =>
    links && links.length
      ? `<p class="links">${links
          .map((l) => `<a class="ulink" href="${esc(l.url)}"${linkAttrs(l.url)}>${esc(l.label)} <span class="arr">↗</span></a>`)
          .join("")}</p>`
      : "";

  const actionList = (actions) =>
    `<ol class="actions">${actions.map((a, i) => `<li><span>${pad(i + 1)}</span>${esc(a)}</li>`).join("")}</ol>`;

  let collapseId = 0;
  const expandable = (label, body) => {
    const id = `x-${++collapseId}`;
    return `<div class="story">
      <button class="story__btn ulink" type="button" aria-expanded="false" aria-controls="${id}">${esc(label)} <span class="arr">↗</span></button>
      <div class="collapse" id="${id}"><div class="collapse__in"><p>${esc(body)}</p></div></div>
    </div>`;
  };

  /* ---------------------------------------------------------------------
     FEATURED PROJECTS
  --------------------------------------------------------------------- */
  function renderProjects() {
    fill(
      "projects",
      (S.projects || [])
        .map((p, i) => {
          const results = (p.results || [])
            .map(
              (r) => `<li class="${r.value ? "" : "result--text"}">
                ${r.value ? `<strong>${esc(r.value)}</strong>` : ""}<span>${esc(r.text)}</span>
              </li>`
            )
            .join("");
          const mainLink = (p.links || [])[0];
          const title = mainLink
            ? `<a href="${esc(mainLink.url)}"${linkAttrs(mainLink.url)}>${esc(p.title)} <span class="arr">↗</span></a>`
            : esc(p.title);

          return `<article class="project project--${esc(p.layout || "feature")}" id="p-${esc(p.id)}" style="--p-color:${esc(p.color || "currentColor")}">
            <div class="project__media reveal">${gallery(p, i)}</div>

            <header class="project__head reveal">
              <h3 class="project__title">${title}</h3>
              <p class="project__cat label">${pad(i + 1)} / ${esc(p.category.split("/")[0].trim())}${p.year ? ` · ${esc(p.year)}` : ""}</p>
              <p class="project__hook">${esc(p.hook)}</p>
            </header>

            <div class="facts">
              <div class="fact reveal">
                <p class="label">Objective</p>
                <p class="fact__text">${esc(p.objective)}</p>
              </div>
              <div class="fact reveal">
                <p class="label">Key actions</p>
                ${actionList(p.actions || [])}
              </div>
              ${results ? `<div class="fact reveal"><p class="label">Key results</p><ul class="results">${results}</ul></div>` : ""}
              <div class="fact reveal">
                <p class="label">Technologies</p>
                ${tagList(p.stack || [], "stack")}
                ${linkList(p.links)}
              </div>
            </div>
            ${p.story ? expandable("Behind the project", p.story) : ""}
          </article>`;
        })
        .join("")
    );
  }

  /* ---------------------------------------------------------------------
     HACKATHON BUILDS — expandable editorial entries
  --------------------------------------------------------------------- */
  function renderHackathons() {
    fill(
      "hackathons",
      `<ul class="hacks">${(S.hackathonProjects || [])
        .map((h, i) => {
          const gid = `hack-${h.id}`;
          const open = i === 0;
          const imgs = visible(h.media).slice(0, 4);
          return `<li class="hack reveal${open ? " is-open" : ""}">
            <button class="hack__row" type="button" aria-expanded="${open}" aria-controls="${gid}-panel">
              <span class="hack__date label">${esc(h.date)}</span>
              <span class="hack__name">
                <span class="hack__title">${esc(h.title)}</span>
                <span class="hack__subtitle">${esc(h.subtitle)}</span>
              </span>
              <span class="hack__event label">${esc(h.event)}</span>
              <span class="hack__toggle" aria-hidden="true"></span>
            </button>
            <div class="collapse" id="${gid}-panel">
              <div class="collapse__in">
                <div class="hack__body">
                  <div class="hack__intro">
                    <p class="hack__hook">${esc(h.hook)}</p>
                    <p class="hack__org label">${esc(h.category)}<br>${esc(h.organisation)}</p>
                  </div>
                  ${imgs.length ? `<div class="hack__media hack__media--${imgs.length}">
                    ${imgs.map((m, j) => media(m, gid, j)).join("")}
                  </div>` : ""}
                  <div class="facts facts--3">
                    <div class="fact"><p class="label">Objective</p><p class="fact__text">${esc(h.objective)}</p></div>
                    <div class="fact"><p class="label">Key actions</p>${actionList(h.actions || [])}</div>
                    <div class="fact"><p class="label">Outcome</p>
                      <ul class="outcomes">${(h.results || []).map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
                    </div>
                  </div>
                  <div class="hack__foot">${tagList(h.stack || [], "stack")}${linkList(h.links)}</div>
                </div>
              </div>
            </div>
          </li>`;
        })
        .join("")}</ul>`
    );
  }

  /* ---------------------------------------------------------------------
     WORKBENCH
  --------------------------------------------------------------------- */
  function renderWorkbench() {
    const section = document.getElementById("workbench");
    if (section) section.hidden = !(S.workbench || []).length;
    fill(
      "workbench",
      (S.workbench || [])
        .map(
          (w, i) => `<li class="bench__item reveal" data-bench="${i}">
            <button class="bench__row" type="button" aria-expanded="false" aria-controls="bench-${i}">
              <span class="bench__num label">${pad(i + 1)}</span>
              <span class="bench__title">${esc(w.title)}</span>
              <span class="bench__tags label">${esc(w.tags)}${w.year ? ` · ${esc(w.year)}` : ""}</span>
              <span class="bench__plus" aria-hidden="true">+</span>
            </button>
            <div class="collapse" id="bench-${i}"><div class="collapse__in"><p>${esc(w.description)}</p></div></div>
          </li>`
        )
        .join("")
    );
  }

  /* ---------------------------------------------------------------------
     ABOUT + SKILLS
  --------------------------------------------------------------------- */
  function renderAbout() {
    const a = S.about;
    fill("about-heading", squareStop(a.heading));
    fill("about-aside", esc(a.aside || ""));
    const [big, small] = visible(a.photos);
    fill(
      "about-photos",
      `${big ? media(big, "about", 0, "about__big reveal") : ""}${small ? media(small, "about", 1, "about__small reveal") : ""}`
    );
    const [lead, ...rest] = a.background;
    fill(
      "about-text",
      `<p class="about__lead reveal">${esc(lead)}</p>
      ${rest.map((t) => `<p class="about__body reveal">${esc(t)}</p>`).join("")}
      <div class="about__grid">
        <div class="reveal">
          <p class="label">Expertise</p>
          <ul class="expertise">${a.expertise.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        </div>
        <div class="reveal">
          <p class="label">Aspirations</p>
          <p class="about__body">${esc(a.aspirations)}</p>
        </div>
      </div>
      <div class="about__tools reveal">
        <p class="label">Tools I reach for</p>
        ${tagList(S.skills || [], "chips")}
      </div>`
    );
  }

  /* ---------------------------------------------------------------------
     EXPERIENCE / IMMERSION / LEADERSHIP
  --------------------------------------------------------------------- */
  const expRows = (list) =>
    list
      .map(
        (e) => `<li class="exp__item reveal">
          <p class="exp__org">${esc(e.organisation)}</p>
          <p class="exp__role">${esc(e.role)}<span>${esc(e.dates)}</span></p>
          ${e.summary ? `<p class="exp__sum">${esc(e.summary)}</p>` : ""}
          ${e.result ? `<p class="exp__result">${esc(e.result)}</p>` : ""}
        </li>`
      )
      .join("");

  function renderExperience() {
    const groups = [
      ["Work & research", S.experience || []],
      ["Immersion programmes", S.immersionProgrammes || []],
    ].filter(([, list]) => list.length);

    fill(
      "experience",
      groups
        .map(
          ([title, list]) => `<div class="exp">
            <p class="label exp__group">${esc(title)}</p>
            <ul>${expRows(list)}</ul>
          </div>`
        )
        .join("")
    );

    fill(
      "leadership",
      (S.leadership || [])
        .map(
          (l) => `<li class="person reveal">
            <span class="person__role">${esc(l.role)}</span>
            <span class="person__org">${esc(l.organisation)}</span>
            ${l.note ? `<span class="person__note">${esc(l.note)}</span>` : ""}
          </li>`
        )
        .join("")
    );
  }

  /* ---------------------------------------------------------------------
     CERTIFICATIONS
  --------------------------------------------------------------------- */
  function renderCerts() {
    fill(
      "certifications",
      (S.certifications || [])
        .map(
          (c) => `<li class="reveal">
            <a class="cert" href="${esc(c.url || "#")}"${linkAttrs(c.url)}>
              ${
                c.logo
                  ? `<img class="cert__logo" src="${esc(c.logo)}" alt="" loading="lazy">`
                  : `<span class="cert__logo cert__logo--ph" aria-hidden="true">Logo</span>`
              }
              <span class="cert__text">
                <span class="cert__name">${esc(c.name)} <span class="arr">↗</span></span>
                <span class="cert__issuer">${esc(c.issuer)}</span>
              </span>
              <span class="cert__year label">${esc(c.year)}</span>
            </a>
          </li>`
        )
        .join("")
    );
  }

  /* ---------------------------------------------------------------------
     HERO / CONTACT / META
  --------------------------------------------------------------------- */
  function renderMeta() {
    const p = S.profile;
    const c = S.contact;
    fill("initials", esc(p.initials));
    fill("name", esc(p.name));
    fill("place", `${esc(p.location)} / ${esc(p.school)}`);
    fill(
      "hero-lines",
      p.heroLines
        .map((l, i) => `<span class="line${l.muted ? " line--muted" : ""}"><span style="--d:${i * 0.09}s">${squareStop(l.text)}</span></span>`)
        .join("")
    );
    fill("intro", esc(p.heroIntro));
    fill("now", p.rightNow.map((t) => `<li>${esc(t)}</li>`).join(""));
    fill("email", esc(c.email));
    $$('[data-slot="email-link"]').forEach((a) => (a.href = `mailto:${c.email}`));
    // Web compose link: works even where mailto: links are blocked
    $$('[data-slot="gmail-link"]').forEach((a) => (a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(c.email)}`));

    fill(
      "contact-links",
      [
        ["LinkedIn", c.linkedin],
        ["GitHub", c.github],
        ["Email", c.email && `mailto:${c.email}`],
      ]
        .filter(([, url]) => url)
        .map(([label, url]) => `<a href="${esc(url)}"${linkAttrs(url)}>${esc(label)} <span class="arr">↗</span></a>`)
        .join("")
    );
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------------------------------------------------------------------
     INTERACTIONS
  --------------------------------------------------------------------- */

  function initReveal() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }

  // Nav: theme follows the band underneath, active link, progress, back-to-top
  function initNav() {
    const nav = $(".nav");
    const bar = $(".progress span");
    const toTop = $(".to-top");
    const pct = $(".to-top__pct");
    const links = $$("[data-nav]");
    const sections = links.map((l) => document.getElementById(l.dataset.nav)).filter(Boolean);
    const bands = $$("[data-theme]").filter((el) => el !== nav);

    let ticking = false;
    const onScroll = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? y / max : 0;
      bar.style.transform = `scaleX(${p})`;
      pct.textContent = `${Math.round(p * 100)}%`;
      nav.classList.toggle("is-scrolled", y > 8);
      toTop.classList.toggle("is-visible", y > window.innerHeight * 1.2);

      const probe = nav.offsetHeight / 2;
      const under = bands.find((b) => {
        const r = b.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      if (under) nav.dataset.theme = under.dataset.theme;

      const line = window.innerHeight * 0.35;
      let active = null;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= line) active = s.id;
      });
      links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === active));
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    const btn = $(".nav__menu");
    const menu = $("#mobile-menu");
    const setMenu = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
      menu.hidden = !open;
      nav.classList.toggle("is-menu", open);
      document.body.classList.toggle("no-scroll", open);
    };
    btn.addEventListener("click", () => setMenu(menu.hidden));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && setMenu(false));
  }

  function initCollapses() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".story__btn, .hack__row, .bench__row");
      if (!btn) return;
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      btn.closest(".story, .hack, .bench__item").classList.toggle("is-open", open);
    });
  }

  function initCarousels() {
    $$("[data-carousel]").forEach((c) => {
      const track = $(".carousel__track", c);
      const slides = $$(".carousel__slide", c);
      const count = $(".carousel__count b", c);
      const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
      const go = (dir) => track.scrollBy({ left: step() * dir, behavior: reduceMotion ? "auto" : "smooth" });

      $$(".carousel__btns button", c).forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.dir))));
      track.addEventListener("scroll", () => {
        const i = Math.round(track.scrollLeft / step());
        count.textContent = pad(Math.min(i, slides.length - 1) + 1);
      }, { passive: true });
      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          go(e.key === "ArrowRight" ? 1 : -1);
        }
      });

      if (!finePointer) return;
      // Drag to scroll with a mouse; a drag must not open the lightbox
      let down = false, startX = 0, startLeft = 0, moved = false;
      track.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      });
      window.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add("is-dragging"); }
        if (moved) track.scrollLeft = startLeft - dx;
      });
      window.addEventListener("pointerup", () => {
        if (!down) return;
        down = false;
        if (!moved) return;
        track.classList.remove("is-dragging");
        track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: "smooth" });
      });
      track.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    });
  }

  // Workbench: floating preview follows the cursor (desktop only)
  function initBenchPreview() {
    if (!finePointer) return;
    const preview = $(".bench-preview");
    const list = $(".bench");
    if (!preview || !list) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      preview.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    list.addEventListener("pointermove", (e) => {
      x = e.clientX + 28;
      y = e.clientY - 150;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    $$(".bench__item", list).forEach((item) => {
      item.addEventListener("pointerenter", (e) => {
        const w = S.workbench[Number(item.dataset.bench)];
        preview.innerHTML = w.media ? mediaInner(w.media) : "";
        if (!preview.classList.contains("is-on")) {
          cx = x = e.clientX + 28;
          cy = y = e.clientY - 150;
          preview.style.transform = `translate(${cx}px, ${cy}px)`;
        }
        preview.classList.add("is-on");
      });
    });
    list.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
  }

  // Custom cursor: a trailing ring and a dot; the ring grows over interactive things
  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const cur = $(".cursor");
    const ring = $(".cursor__ring", cur);
    const dot = $(".cursor__dot", cur);
    let x = -100, y = -100, rx = -100, ry = -100;
    document.documentElement.classList.add("has-cursor");

    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      cur.classList.add("is-on");
    }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("is-on"));
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, .media__btn");
      cur.classList.toggle("is-hover", !!t);
      cur.classList.toggle("is-media", !!(t && t.classList.contains("media__btn")));
    });
    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  // Email: mailto: links don't open a mail app everywhere (e.g. embedded
  // viewers), so every email click also copies the address and says so.
  function initEmail() {
    const email = S.contact.email;
    const toastEl = $(".toast");
    let timer = null;
    const toast = (msg) => {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add("is-on");
      clearTimeout(timer);
      timer = setTimeout(() => toastEl.classList.remove("is-on"), 3200);
    };
    const selectAddress = () => {
      const el = $(".footer__address");
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    const copy = () => {
      const fallback = () => {
        selectAddress();
        toast("Email selected, press Ctrl/⌘ + C to copy");
      };
      if (!navigator.clipboard || !navigator.clipboard.writeText) return fallback();
      navigator.clipboard.writeText(email).then(() => toast(`Copied ${email}`), fallback);
    };
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-copy-email]")) return copy();
      if (e.target.closest('a[href^="mailto:"]')) copy(); // let the mail app open too, where it can
    });
  }

  function initLightbox() {
    const dlg = $(".lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    const stage = $(".lightbox__stage", dlg);
    const cap = $(".lightbox__cap", dlg);
    const count = $(".lightbox__count", dlg);
    let gid = null, idx = 0;

    const show = () => {
      const list = galleries[gid].filter(Boolean);
      idx = (idx + list.length) % list.length;
      const m = list[idx];
      stage.innerHTML = `<div class="lightbox__media" style="--ratio:${esc(m.ratio || "16/10")}">${m._inner || mediaInner(m)}</div>`;
      cap.textContent = m.caption || m.label || "";
      count.textContent = `${pad(idx + 1)} / ${pad(list.length)}`;
      $$(".lightbox__nav", dlg).forEach((b) => (b.style.visibility = list.length < 2 ? "hidden" : ""));
    };

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".media__btn");
      if (!btn || !galleries[btn.dataset.gallery]) return;
      gid = btn.dataset.gallery;
      idx = Number(btn.dataset.index);
      show();
      dlg.showModal();
      document.body.classList.add("no-scroll");
    });
    $$(".lightbox__nav", dlg).forEach((b) => b.addEventListener("click", () => { idx += Number(b.dataset.dir); show(); }));
    $(".lightbox__close", dlg).addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => document.body.classList.remove("no-scroll"));
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { idx++; show(); }
      if (e.key === "ArrowLeft") { idx--; show(); }
    });
  }

  /* ---------------------------------------------------------------------
     BOOT
  --------------------------------------------------------------------- */
  renderMeta();
  renderProjects();
  renderHackathons();
  renderWorkbench();
  renderAbout();
  renderExperience();
  renderCerts();

  initNav();
  initCollapses();
  initCarousels();
  initBenchPreview();
  initCursor();
  initEmail();
  initLightbox();
  initReveal();

  requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
})();
