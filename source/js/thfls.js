/**
 * 天外计算机社 · thfls.js  v4.0
 *
 * ARCHITECTURE:
 *   1. body:not(.thfls-ready) hides #body-wrap via CSS
 *   2. This script extracts all post data from Stellar's hidden render
 *   3. Builds a completely new, beautiful page layout
 *   4. Adds body.thfls-ready → page fades in as one cohesive unit
 *   5. Zero layout shift. Zero flash. One clean reveal.
 */
(function () {
  'use strict';

  /* ── SCROLL PROGRESS ─────────────────────────────────────── */
  var root = document.documentElement;
  window.addEventListener('scroll', function () {
    var h = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--sp', h > 0 ? (window.scrollY / h * 100).toFixed(2) + '%' : '0%');
  }, { passive: true });

  /* ── DARK MODE LOCK ──────────────────────────────────────── */
  function forceDark() {
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
  forceDark();
  new MutationObserver(function () {
    if (root.getAttribute('data-theme') !== 'dark') forceDark();
  }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  /* ── UTILS ───────────────────────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  function isHome() {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
  }

  /* ── EXTRACT POST DATA from Stellar's hidden render ─────── */
  function extractPosts() {
    var selectors = [
      '.note', '.post-card', '.article-card',
      '.l_post', '.post-item', '.timeline-item'
    ];
    var cards = qsa(selectors.join(','));

    return cards.map(function (card) {
      // Title + URL
      var titleLink = qs('a[href]', card) || qs('.title a', card);
      var title = titleLink ? titleLink.textContent.trim() : '';
      var url = titleLink ? titleLink.href : '#';

      // Date
      var dateEl = qs('time, .date, .time, [datetime]', card);
      var date = '';
      if (dateEl) {
        date = dateEl.getAttribute('datetime') || dateEl.textContent.trim();
        // Normalize to YYYY-MM format
        var dm = date.match(/(\d{4})[^\d]*(\d{1,2})[^\d]*(\d{1,2})/);
        if (dm) date = dm[1] + '-' + dm[2].padStart(2, '0') + '-' + dm[3].padStart(2, '0');
      }

      // Excerpt
      var excerptEl = qs('p, .excerpt, .desc', card);
      var excerpt = excerptEl ? excerptEl.textContent.trim().slice(0, 140) : '';

      // Tags
      var tags = qsa('.tag, .label, a[href*="/tags/"], a[href*="/categories/"]', card)
        .map(function (t) { return t.textContent.trim(); })
        .filter(function (t) { return t && t.length < 20; })
        .slice(0, 3);

      // Author
      var authorEl = qs('.author, [class*="author"]', card);
      var author = authorEl ? authorEl.textContent.trim() : '';

      return { title: title, url: url, date: date, excerpt: excerpt, tags: tags, author: author };
    }).filter(function (p) { return p.title; });
  }

  /* ── FORMAT DATE ─────────────────────────────────────────── */
  function fmtDate(raw) {
    if (!raw) return '';
    var m = raw.match(/(\d{4})-(\d{2})/);
    if (!m) return raw;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(m[2], 10) - 1] + ' ' + m[1];
  }

  /* ── GUESS CATEGORY from title/tags ─────────────────────── */
  var CAT_MAP = [
    [/AI|LLM|GPU|模型|智能/, 'AI'],
    [/Android|刷机|BROM|FDL|GSI|SPD/, 'Android'],
    [/网络|CDN|OpenWrt|IPv6|ZeroTier|Tailscale|NAS|穿透/, '网络'],
    [/Minecraft|服务器|MC/, 'Gaming'],
    [/隐私|安全|VPN|Cealer/, '安全'],
    [/RSS|信息|博客|Hexo|Cloudflare/, '工具'],
    [/媒体|流媒体|IPTV|rtp/, '媒体'],
  ];
  function guessCategory(post) {
    var text = post.title + ' ' + post.tags.join(' ');
    for (var i = 0; i < CAT_MAP.length; i++) {
      if (CAT_MAP[i][0].test(text)) return CAT_MAP[i][1];
    }
    return post.tags[0] || '技术';
  }

  /* ── BUILD HERO ──────────────────────────────────────────── */
  function buildHero() {
    var section = el('section', 'thfls-hero');
    section.innerHTML =
      '<div class="thfls-hero-grid"></div>' +
      '<div class="thfls-hero-atmosphere"></div>' +
      '<div class="thfls-hero-inner">' +
        '<div class="thfls-kicker">' +
          '<span class="thfls-kicker-pulse"></span>' +
          '<span class="thfls-kicker-line"></span>' +
          '广州市天河外国语学校 · 计算机社团' +
        '</div>' +
        '<h1 class="thfls-hero-title">天外计算机社</h1>' +
        '<div class="thfls-hero-en">THFLS.CLUB</div>' +
        '<div class="thfls-hero-terminal">' +
          '<span class="cmd">$ </span><span class="str">cat</span> README.md<br>' +
          '<span class="com"># 一个有温度的 Geek Paradise</span><br>' +
          '从网络工程到&nbsp;AI&nbsp;模型，从&nbsp;Android&nbsp;底层到开源协作——<br>' +
          '这里是我们构建、探索与分享的数字基地。' +
          '<span class="thfls-caret"></span>' +
        '</div>' +
        '<div class="thfls-hero-stats">' +
          '<div class="thfls-stat-item"><span class="thfls-stat-number">20<sup style="font-size:.5em;opacity:.6">+</sup></span><span class="thfls-stat-label">技术文章</span></div>' +
          '<div class="thfls-stat-item"><span class="thfls-stat-number">5</span><span class="thfls-stat-label">公益服务</span></div>' +
          '<div class="thfls-stat-item"><span class="thfls-stat-number">2025</span><span class="thfls-stat-label">成立年份</span></div>' +
          '<div class="thfls-stat-item"><span class="thfls-stat-number">∞</span><span class="thfls-stat-label">探索精神</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="thfls-scroll-indicator">' +
        '<span>向下探索</span>' +
        '<div class="thfls-scroll-line"></div>' +
      '</div>';
    return section;
  }

  /* ── BUILD FEATURED CARD ─────────────────────────────────── */
  function buildFeatured(post) {
    var cat = guessCategory(post);
    var a = el('a', 'thfls-featured');
    a.href = post.url;
    a.innerHTML =
      '<div class="thfls-featured-body">' +
        '<div class="thfls-featured-tag">' + cat + '</div>' +
        '<div class="thfls-featured-title">' + post.title + '</div>' +
        '<div class="thfls-featured-meta">' +
          '<span>' + fmtDate(post.date) + '</span>' +
          (post.author ? '<span>· ' + post.author + '</span>' : '') +
          (post.tags.length ? '<span>· ' + post.tags.slice(0,2).join(' / ') + '</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="thfls-featured-excerpt">' +
        '<div class="thfls-featured-excerpt-text">' +
          (post.excerpt || '深入探索技术细节，分享真实实践经验。') +
        '</div>' +
        '<div class="thfls-featured-arrow">↗</div>' +
      '</div>';
    return a;
  }

  /* ── BUILD GRID CARDS ────────────────────────────────────── */
  function buildGrid(posts) {
    var grid = el('div', 'thfls-grid');

    // Layout pattern: wide, normal, normal, normal, wide, normal...
    var widePattern = [0, 3]; // which indices get 'wide' class

    posts.forEach(function (post, i) {
      var cat = guessCategory(post);
      var isWide = widePattern.indexOf(i % 6) !== -1;
      var isTall = i % 5 === 1;

      var cls = 'thfls-card' + (isWide ? ' wide' : '') + (isTall ? ' tall' : '');
      var a = el('a', cls);
      a.href = post.url;

      var tagsHtml = post.tags.slice(0, 2).map(function (t) {
        return '<span class="thfls-tag-chip">' + t + '</span>';
      }).join('');

      a.innerHTML =
        '<div>' +
          '<div class="thfls-card-cat">' + cat + '</div>' +
          '<div class="thfls-card-title">' + post.title + '</div>' +
        '</div>' +
        '<div class="thfls-card-bottom">' +
          '<span class="thfls-card-date">' + fmtDate(post.date) + '</span>' +
          '<div class="thfls-card-tags">' + tagsHtml + '</div>' +
        '</div>';

      // Stagger animation
      a.style.opacity = '0';
      a.style.animation = 'card-in .45s cubic-bezier(.22,.68,0,1) ' + (0.1 + i * 0.06) + 's forwards';

      grid.appendChild(a);
    });

    return grid;
  }

  /* ── BUILD COMPACT LIST ──────────────────────────────────── */
  function buildList(posts) {
    var wrap = el('div', 'thfls-list');

    posts.forEach(function (post, i) {
      var a = el('a', 'thfls-list-item');
      a.href = post.url;
      a.innerHTML =
        '<span class="thfls-list-idx">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div class="thfls-list-body">' +
          '<div class="thfls-list-title">' + post.title + '</div>' +
          '<div class="thfls-list-meta">' + guessCategory(post) +
            (post.author ? ' · ' + post.author : '') +
          '</div>' +
        '</div>' +
        '<span class="thfls-list-date">' + fmtDate(post.date) + '</span>';

      a.style.opacity = '0';
      a.style.animation = 'card-in .4s ease ' + (0.05 + i * 0.04) + 's forwards';

      wrap.appendChild(a);
    });
    return wrap;
  }

  /* ── BUILD SECTION LABEL ─────────────────────────────────── */
  function buildLabel(idx, title) {
    var d = el('div', 'thfls-label');
    d.innerHTML =
      '<span class="thfls-label-index">// ' + idx + '</span>' +
      '<span class="thfls-label-title">' + title + '</span>' +
      '<div class="thfls-label-rule"></div>';
    return d;
  }

  /* ── BUILD SIDEBAR ───────────────────────────────────────── */
  function buildSidebar() {
    var col = el('div', 'thfls-side-col');

    // About card
    var about = el('div', 'thfls-side-card');
    about.innerHTML =
      '<div class="thfls-side-header">关于我们</div>' +
      '<div class="thfls-side-body">' +
        '<div class="thfls-club-name">天外计算机社</div>' +
        '<div class="thfls-club-desc">广州市天河外国语学校学生技术社团。探索前沿技术，构建开放知识体系。全年招新，欢迎有想法的同学加入。</div>' +
        '<div class="thfls-club-links">' +
          '<a class="thfls-club-link" href="https://github.com/THFLSClub" target="_blank" rel="noopener">GitHub</a>' +
          '<a class="thfls-club-link" href="https://t.me/GZTHFLS" target="_blank" rel="noopener">Telegram</a>' +
          '<a class="thfls-club-link" href="/about">关于</a>' +
        '</div>' +
      '</div>';

    // Services card
    var services = el('div', 'thfls-side-card');
    services.innerHTML = '<div class="thfls-side-header">公益服务</div>';
    var svList = [
      ['M/', '软件镜像站', 'mirror.thfls.club', 'https://mirror.thfls.club'],
      ['GH', 'GitHub 加速', 'gh.thfls.club', 'https://gh.thfls.club'],
      ['PB', '公共粘贴板', 'paste.thfls.club', 'https://paste.thfls.club'],
      ['→/', '短链接', 'links.thfls.club', 'https://links.thfls.club'],
      ['🔧', '开发者工具箱', 'tool.thfls.club', 'https://tool.thfls.club'],
    ];
    svList.forEach(function (sv) {
      var a = el('a', 'thfls-service');
      a.href = sv[3]; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML =
        '<div class="thfls-service-icon">' + sv[0] + '</div>' +
        '<div class="thfls-service-info">' +
          '<div class="thfls-service-name">' + sv[1] + '</div>' +
          '<div class="thfls-service-url">' + sv[2] + '</div>' +
        '</div>' +
        '<div class="thfls-service-dot"></div>';
      services.appendChild(a);
    });

    // Tags card
    var tagsCard = el('div', 'thfls-side-card');
    tagsCard.innerHTML = '<div class="thfls-side-header">热门话题</div>';
    var tagsWrap = el('div', 'thfls-tags-wrap');
    ['AI', 'Android', '网络', 'OpenWrt', 'Minecraft', '开源', '隐私', 'CDN', 'NAS', '刷机', 'Cloudflare', 'RSS', 'GPU', '校园'].forEach(function (t) {
      var a = el('a', 'thfls-tag-pill', t);
      a.href = '/tags/' + encodeURIComponent(t) + '/';
      tagsWrap.appendChild(a);
    });
    tagsCard.appendChild(tagsWrap);

    col.appendChild(about);
    col.appendChild(services);
    col.appendChild(tagsCard);
    return col;
  }

  /* ── BUILD FOOTER ────────────────────────────────────────── */
  function buildFooter() {
    var footer = el('footer', 'thfls-footer');
    footer.innerHTML =
      '<div class="thfls-footer-brand"><strong>天外计算机社</strong>&nbsp;·&nbsp;广州市天河外国语学校&nbsp;·&nbsp;2025</div>' +
      '<ul class="thfls-footer-nav">' +
        '<li><a href="https://github.com/THFLSClub" target="_blank" rel="noopener">GitHub</a></li>' +
        '<li><a href="https://t.me/GZTHFLS" target="_blank" rel="noopener">Telegram</a></li>' +
        '<li><a href="/atom.xml">RSS</a></li>' +
        '<li><a href="mailto:tech@thfls.club">邮件</a></li>' +
      '</ul>';
    return footer;
  }

  /* ── MAIN REBUILD ────────────────────────────────────────── */
  function rebuildHomepage() {
    var posts = extractPosts();

    // Need at least 1 post to render
    if (!posts.length) {
      // Fallback: just show Stellar's layout with our CSS
      document.body.classList.add('thfls-ready');
      return;
    }

    // Prepare page container
    var page = el('div', 'thfls-page');

    // — Hero —
    page.appendChild(buildHero());

    // — Content area —
    var content = el('div', 'thfls-content');
    var layout = el('div', 'thfls-layout');
    var main = el('div', 'thfls-main-col');

    // Featured post
    main.appendChild(buildLabel('01', '精选文章'));
    main.appendChild(buildFeatured(posts[0]));

    // Grid (posts 1-6 or 1-4 if fewer)
    var gridPosts = posts.slice(1, Math.min(7, posts.length));
    if (gridPosts.length) {
      main.appendChild(buildLabel('02', '近期发布'));
      main.appendChild(buildGrid(gridPosts));
    }

    // List (remaining posts)
    var listPosts = posts.slice(7);
    if (listPosts.length) {
      main.appendChild(buildLabel('03', '全部文章'));
      main.appendChild(buildList(listPosts));
    }

    layout.appendChild(main);
    layout.appendChild(buildSidebar());
    content.appendChild(layout);
    page.appendChild(content);
    page.appendChild(buildFooter());

    // Replace #body-wrap content with our page
    var bodyWrap = document.getElementById('body-wrap') ||
                   document.querySelector('.wrapper') ||
                   document.querySelector('.main-wrapper');

    if (bodyWrap) {
      // Hide original, insert ours after nav
      bodyWrap.style.display = 'none';
      bodyWrap.parentNode.insertBefore(page, bodyWrap.nextSibling);
    } else {
      document.body.appendChild(page);
    }
  }

  /* ── NON-HOMEPAGE: just style Stellar's output ──────────── */
  function styleNonHome() {
    // Dark mode + progress bar already active
    // CSS handles article page styling
  }

  /* ── INIT ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    forceDark();

    if (isHome()) {
      rebuildHomepage();
    } else {
      styleNonHome();
    }

    // Reveal — single clean fade-in of the whole page
    requestAnimationFrame(function () {
      setTimeout(function () {
        document.body.classList.add('thfls-ready');
        // Also make rebuilt page visible
        var page = document.querySelector('.thfls-page');
        if (page) {
          page.style.opacity = '0';
          page.style.transition = 'opacity .4s ease';
          requestAnimationFrame(function () { page.style.opacity = '1'; });
        }
      }, 60);
    });
  });

})();
