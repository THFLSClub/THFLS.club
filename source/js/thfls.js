/**
 * 天外计算机社 · thfls.js  v3.0
 *
 * KEY CHANGES vs v2:
 * - Hero injected BEFORE #body-wrap (truly full-width, zero layout shift)
 * - Article cards wrapped in .thfls-card-grid for 2-col layout
 * - No more column competition — sidebar + articles coexist cleanly
 * - Scroll-based card reveal
 */
(function () {
  'use strict';

  /* ─── 1. SCROLL PROGRESS ─────────────────────────────────── */
  var root = document.documentElement;
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty('--sp', h > 0 ? (window.scrollY / h * 100).toFixed(1) + '%' : '0%');
  }, { passive: true });

  /* ─── 2. FORCE DARK ──────────────────────────────────────── */
  function forceDark() {
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
  forceDark();
  new MutationObserver(function () {
    if (root.getAttribute('data-theme') !== 'dark') forceDark();
  }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  /* ─── 3. HERO HTML ───────────────────────────────────────── */
  function buildHero() {
    var hero = document.createElement('section');
    hero.className = 'thfls-hero';
    hero.setAttribute('id', 'thfls-hero');
    hero.innerHTML =
      '<div class="thfls-hero-inner">' +
        '<div class="thfls-pill">' +
          '<span class="thfls-pill-dot"></span>' +
          '广州市天河外国语学校&nbsp;&nbsp;·&nbsp;&nbsp;计算机社团' +
        '</div>' +
        '<h1 class="thfls-title">天外计算机社</h1>' +
        '<div class="thfls-sub">THFLS.CLUB</div>' +
        '<div class="thfls-desc">' +
          '<span class="p">$ </span>cat README.md<br>' +
          '一个有温度的 Geek Paradise。<br>' +
          '从网络工程到 AI 模型，从 Android 底层到开源协作——<br>' +
          '这里是我们构建、探索与分享的数字基地。' +
          '<span class="thfls-caret"></span>' +
        '</div>' +
        '<div class="thfls-stats">' +
          '<div class="thfls-stat"><span class="thfls-stat-n">20+</span><span class="thfls-stat-l">技术文章</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">5</span><span class="thfls-stat-l">公益服务</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">2025</span><span class="thfls-stat-l">成立于</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">∞</span><span class="thfls-stat-l">探索精神</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="thfls-scroll-hint">' +
        '<span>scroll</span>' +
        '<div class="thfls-arrow"></div>' +
      '</div>';
    return hero;
  }

  /* ─── 4. INJECT HERO BEFORE #body-wrap ──────────────────── */
  // This is the critical fix: inject BEFORE the layout wrapper,
  // so the hero is full-width and doesn't push columns around.
  function injectHero() {
    if (!isHome()) return;
    if (document.getElementById('thfls-hero')) return;

    // Candidate insertion parents (outermost first)
    var bodyWrap =
      document.getElementById('body-wrap') ||
      document.querySelector('.wrapper') ||
      document.querySelector('.main-wrapper') ||
      document.querySelector('.main.l_main');

    if (!bodyWrap) return;

    var hero = buildHero();
    bodyWrap.parentNode.insertBefore(hero, bodyWrap);
  }

  /* ─── 5. WRAP ARTICLE CARDS IN 2-COL GRID ───────────────── */
  // Stellar renders post cards as siblings inside .l_r_aside or #main.
  // We wrap them in a grid container for the 2-col layout.
  function wrapCards() {
    // Try to find the post card container
    var candidates = [
      document.querySelector('.l_r_aside'),
      document.querySelector('#main'),
      document.querySelector('.main-content'),
      document.querySelector('.post-list'),
    ].filter(Boolean);

    candidates.forEach(function (container) {
      // Collect direct children that are post cards
      var cards = [];
      var children = container.children;
      for (var i = 0; i < children.length; i++) {
        var el = children[i];
        if (
          el.classList.contains('note') ||
          el.classList.contains('post-card') ||
          el.classList.contains('article-card') ||
          el.classList.contains('l_post') ||
          el.classList.contains('timeline-item')
        ) {
          cards.push(el);
        }
      }

      if (cards.length < 2) return; // nothing to grid

      // Already wrapped? skip
      if (container.querySelector('.thfls-card-grid')) return;

      // Create grid wrapper
      var grid = document.createElement('div');
      grid.className = 'thfls-card-grid';

      // Insert grid before first card
      container.insertBefore(grid, cards[0]);

      // Move all cards into grid
      cards.forEach(function (card) {
        grid.appendChild(card);
      });

      // Inject section bar before the tabs (if not already present)
      injectSectionBar(container);
    });
  }

  function injectSectionBar(container) {
    if (container.querySelector('.thfls-section-bar')) return;
    var tabs = container.querySelector('.tabs, .tab-bar, .post-tab, nav.tabs');
    if (!tabs) return;

    var bar = document.createElement('div');
    bar.className = 'thfls-section-bar';
    bar.innerHTML =
      '<span class="thfls-section-num">// 01</span>' +
      '<span class="thfls-section-title">最新文章</span>' +
      '<div class="thfls-section-line"></div>';

    // Insert bar before tabs
    tabs.parentNode.insertBefore(bar, tabs);
  }

  /* ─── 6. CARD REVEAL ON SCROLL ──────────────────────────── */
  function revealCards() {
    if (!window.IntersectionObserver) return;
    var idx = 0;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.style.opacity = '0';
        el.style.animation = 'thfls-up .4s ease ' + (idx * 0.055) + 's forwards';
        idx = (idx + 1) % 6;
        obs.unobserve(el);
      });
    }, { threshold: 0.06 });

    document.querySelectorAll(
      '.post-card, .article-card, .note, .l_post, .widget'
    ).forEach(function (el) { obs.observe(el); });
  }

  /* ─── 7. CLEAN BROKEN ICON TEXT ─────────────────────────── */
  // Hides raw "ph:icon-name" text if Iconify didn't load
  function cleanIcons() {
    document.querySelectorAll(
      '.menu-links a, .menubar a, nav.menu a, #site-nav a, .navbar a'
    ).forEach(function (link) {
      link.childNodes.forEach(function (n) {
        if (n.nodeType === 3 && /^[a-z0-9_-]+:[a-z0-9_-]+$/.test((n.textContent || '').trim())) {
          n.textContent = '';
        }
      });
    });

    document.querySelectorAll('[class*="icon"]').forEach(function (el) {
      if (el.tagName === 'IMG' || el.tagName === 'SVG' || el.tagName === 'ICONIFY-ICON') return;
      if (/^[a-z0-9_-]+:[a-z0-9_-]+$/.test((el.textContent || '').trim())) {
        el.style.display = 'none';
      }
    });
  }

  /* ─── UTILS ──────────────────────────────────────────────── */
  function isHome() {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
  }

  /* ─── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    forceDark();
    injectHero();
    cleanIcons();
    setTimeout(function () {
      wrapCards();
      revealCards();
      cleanIcons(); // second pass for late-rendered elements
    }, 120);
  });

})();
