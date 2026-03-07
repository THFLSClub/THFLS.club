/**
 * 天外计算机社 · thfls.js  v2.0
 * – Scroll progress bar (CSS var)
 * – Hero section injection (homepage only)
 * – Phosphor icon fallback cleanup
 * – Smooth card fade-in on scroll
 */
(function () {
  'use strict';

  /* ─── 1. SCROLL PROGRESS ─────────────────────────────────── */
  var root = document.documentElement;
  function updateProgress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? ((window.scrollY / h) * 100).toFixed(2) + '%' : '0%';
    root.style.setProperty('--sp', pct);
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ─── 2. FORCE DARK MODE ─────────────────────────────────── */
  function forceDark() {
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
  forceDark();
  new MutationObserver(function (muts) {
    muts.forEach(function () {
      if (root.getAttribute('data-theme') !== 'dark') forceDark();
    });
  }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  /* ─── 3. ICON TEXT CLEANUP ───────────────────────────────── */
  // If Iconify hasn't loaded, sidebar icon text like "ph:house-line-duotone"
  // will render as raw text. Hide those spans.
  function cleanBrokenIcons() {
    var icons = document.querySelectorAll('[class*="icon"]:not(svg):not(img):not(iconify-icon)');
    icons.forEach(function (el) {
      var txt = (el.textContent || '').trim();
      // Matches patterns like "ph:something" or "mdi:something"
      if (/^[a-z]+:[a-z0-9\-]+$/.test(txt)) {
        el.style.display = 'none';
      }
    });

    // Also catch text nodes directly inside menu links
    var menuLinks = document.querySelectorAll('.menu-links a, .menubar a, nav.menu a');
    menuLinks.forEach(function (link) {
      link.childNodes.forEach(function (node) {
        if (node.nodeType === 3) { // TEXT_NODE
          var t = node.textContent.trim();
          if (/^[a-z]+:[a-z0-9\-]+$/.test(t)) {
            node.textContent = '';
          }
        }
      });
    });
  }

  /* ─── 4. HERO INJECTION (homepage only) ─────────────────── */
  function isHomePage() {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
  }

  function injectHero() {
    if (!isHomePage()) return;

    // Find the best insertion target — before the main content
    var target =
      document.querySelector('#main') ||
      document.querySelector('main') ||
      document.querySelector('.main') ||
      document.querySelector('.l_body') ||
      document.querySelector('#body-wrap');

    if (!target || document.querySelector('.thfls-hero')) return;

    var hero = document.createElement('section');
    hero.className = 'thfls-hero';
    hero.setAttribute('aria-label', '天外计算机社 Hero');

    // Get article/post count from sidebar widget if available
    var postCount = document.querySelectorAll('.widget li a, .recent-post-item').length || 20;

    hero.innerHTML =
      '<div class="thfls-hero-grid"></div>' +
      '<div class="thfls-hero-glow"></div>' +
      '<div class="thfls-hero-inner">' +
        '<div class="thfls-tag">' +
          '<span class="thfls-tag-dot"></span>' +
          '广州市天河外国语学校&nbsp;&nbsp;·&nbsp;&nbsp;计算机社团' +
        '</div>' +
        '<h1 class="thfls-h1">天外计算机社</h1>' +
        '<div class="thfls-h2">THFLS.CLUB</div>' +
        '<div class="thfls-desc">' +
          '<span class="prompt">$ </span>cat README.md<br>' +
          '一个有温度的 Geek Paradise。<br>' +
          '从网络工程到 AI 模型，从 Android 底层到开源协作——<br>' +
          '这里是我们构建、探索与分享的数字基地。' +
          '<span class="thfls-cursor"></span>' +
        '</div>' +
        '<div class="thfls-stats">' +
          '<div class="thfls-stat"><span class="thfls-stat-n">20+</span><span class="thfls-stat-l">技术文章</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">5</span><span class="thfls-stat-l">公益服务</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">2025</span><span class="thfls-stat-l">成立于</span></div>' +
          '<div class="thfls-stat"><span class="thfls-stat-n">∞</span><span class="thfls-stat-l">探索精神</span></div>' +
        '</div>' +
      '</div>';

    target.parentNode.insertBefore(hero, target);

    // Inject section label before post list
    var postArea =
      document.querySelector('.l_r_aside') ||
      document.querySelector('.post-list') ||
      document.querySelector('.article-list') ||
      document.querySelector('.posts-wrap') ||
      document.querySelector('[id*="post"]');

    if (postArea) {
      var bar = document.createElement('div');
      bar.className = 'thfls-section-bar';
      bar.innerHTML =
        '<span class="thfls-section-idx">// 最新</span>' +
        '<span class="thfls-section-ttl">近期发布</span>' +
        '<div class="thfls-section-line"></div>';
      postArea.parentNode.insertBefore(bar, postArea);
    }
  }

  /* ─── 5. CARD FADE-IN ON SCROLL ─────────────────────────── */
  function initCardAnim() {
    if (!window.IntersectionObserver) return;
    var delay = 0;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.opacity = '0';
        el.style.animation = 'thfls-up .42s ease ' + (delay * 0.06) + 's both';
        delay = (delay + 1) % 8;
        obs.unobserve(el);
      });
    }, { threshold: 0.08 });

    var cards = document.querySelectorAll(
      '.post-card, .article-card, .note, .l_post, .widget, .timeline-item'
    );
    cards.forEach(function (c) { obs.observe(c); });
  }

  /* ─── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    forceDark();
    cleanBrokenIcons();
    injectHero();
    initCardAnim();

    // Re-run icon cleanup after a short delay in case Stellar renders late
    setTimeout(cleanBrokenIcons, 800);
  });

})();
