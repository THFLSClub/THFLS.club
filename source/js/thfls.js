/**
 * 天外计算机社 · THFLS.club
 * Custom JS — Hero Injection + Scroll Progress
 */

(function () {
  'use strict';

  /* ── SCROLL PROGRESS BAR ──────────────────────────────── */
  function updateScrollProgress() {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (scrolled / total) * 100 : 0;
    document.documentElement.style.setProperty('--scroll-progress', pct.toFixed(2) + '%');
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ── INJECT HERO SECTION ──────────────────────────────── */
  function injectHero() {
    // Only inject on homepage (no path or /)
    var path = window.location.pathname;
    var isHome = path === '/' || path === '/index.html' || /^\/page\/\d+\/?$/.test(path);
    if (!isHome) return;

    // Find insertion point — before the main content wrapper
    var targets = [
      document.querySelector('#main'),
      document.querySelector('main'),
      document.querySelector('.main'),
      document.querySelector('#body-wrap'),
      document.querySelector('.wrapper'),
    ].filter(Boolean);

    if (!targets.length) return;
    var insertBefore = targets[0];

    var hero = document.createElement('section');
    hero.className = 'thfls-hero';
    hero.innerHTML = [
      '<div class="thfls-hero-grid"></div>',
      '<div class="thfls-hero-glow"></div>',
      '<div class="thfls-hero-inner">',
        '<div class="thfls-hero-tag">广州市天河外国语学校 · 计算机社团</div>',
        '<h1 class="thfls-hero-title">天外计算机社</h1>',
        '<div class="thfls-hero-subtitle">THFLS.CLUB</div>',
        '<div class="thfls-hero-desc">',
          '<span class="prompt">$ </span>cat README.md<br>',
          '一个有温度的 Geek Paradise。<br>',
          '从网络工程到 AI 模型，从 Android 底层到开源协作——<br>',
          '这里是我们构建、探索与分享的数字基地。<span class="thfls-cursor"></span>',
        '</div>',
        '<div class="thfls-hero-stats">',
          '<div class="thfls-stat"><span class="thfls-stat-num">20+</span><span class="thfls-stat-label">技术文章</span></div>',
          '<div class="thfls-stat"><span class="thfls-stat-num">5</span><span class="thfls-stat-label">公益服务</span></div>',
          '<div class="thfls-stat"><span class="thfls-stat-num">2025</span><span class="thfls-stat-label">成立于</span></div>',
          '<div class="thfls-stat"><span class="thfls-stat-num">∞</span><span class="thfls-stat-label">探索精神</span></div>',
        '</div>',
      '</div>',
    ].join('');

    insertBefore.parentNode.insertBefore(hero, insertBefore);

    // Add section bar before post list
    var postList = document.querySelector('.post-list, .article-list, #post-list, .posts-wrap');
    if (postList) {
      var bar = document.createElement('div');
      bar.className = 'thfls-section-bar';
      bar.innerHTML = [
        '<span class="thfls-section-index">01</span>',
        '<span class="thfls-section-title">最新文章</span>',
        '<div class="thfls-section-line"></div>',
      ].join('');
      postList.parentNode.insertBefore(bar, postList);
    }
  }

  /* ── ANIMATE CARDS ON SCROLL ──────────────────────────── */
  function initCardAnimations() {
    if (!window.IntersectionObserver) return;

    var cards = document.querySelectorAll('.post-card, .post-item, .article-card, .widget');
    var idx = 0;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'thfls-fadeUp 0.45s ease ' + (idx * 0.04) + 's both';
          entry.target.style.opacity = '0';
          idx++;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (card) {
      obs.observe(card);
    });
  }

  /* ── STYLE THEME TOGGLE (force dark) ─────────────────── */
  function forceDark() {
    // Remove any light theme classes Stellar might set
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'dark');
    // Also set color-scheme
    document.documentElement.style.colorScheme = 'dark';
  }

  /* ── INIT ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    forceDark();
    injectHero();
    initCardAnimations();

    // Watch for Stellar's theme toggle and keep dark
    var observer = new MutationObserver(function () {
      var theme = document.documentElement.getAttribute('data-theme');
      if (theme !== 'dark') forceDark();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  });

})();
