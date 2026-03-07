/**
 * 天外计算机社 · thfls.js  v5.0
 *
 * NOW USING EXACT STELLAR DOM SELECTORS from real HTML:
 *   Container:  div.l_body#start
 *   Post cards: a.post-card.post   (inside div.post-list.post)
 *   Title:      h2.post-title      (inside each card)
 *   Excerpt:    div.excerpt > p
 *   Date:       time[datetime]
 *   Category:   span.cap.breadcrumb span:last-child
 *   Recent list (sidebar): widget.widget-wrapper.post-list a.item.title span.title
 *
 * STRATEGY:
 *   1. CSS hides #start until html.thfls-ok is set
 *   2. This script extracts data from Stellar's rendered (hidden) DOM
 *   3. Builds beautiful page, inserts before #start
 *   4. Sets html.thfls-ok → both our page visible, Stellar hidden
 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── 1. SCROLL PROGRESS ──────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var h = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--sp', h > 0 ? (window.scrollY / h * 100).toFixed(2) + '%' : '0%');
  }, { passive: true });

  /* ── 2. DARK MODE LOCK ───────────────────────────────────── */
  function dark() {
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
  dark();
  new MutationObserver(function () {
    if (root.getAttribute('data-theme') !== 'dark') dark();
  }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  /* ── 3. UTILS ────────────────────────────────────────────── */
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function mk(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function isHome() {
    var p = location.pathname;
    return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
  }

  /* ── 4. DATA EXTRACTION (exact Stellar selectors) ────────── */
  function extractPosts() {
    // Primary: a.post-card.post inside div.post-list.post
    var cards = $$('a.post-card.post');

    return cards.map(function (card) {
      var url   = card.href || '#';

      // Title: h2.post-title
      var titleEl = card.querySelector('h2.post-title');
      var title   = titleEl ? titleEl.textContent.trim() : '';

      // Excerpt: div.excerpt p
      var excEl   = card.querySelector('.excerpt p');
      var excerpt = excEl ? excEl.textContent.trim().slice(0, 150) : '';

      // Date: time[datetime]
      var timeEl  = card.querySelector('time[datetime]');
      var date    = '';
      if (timeEl) {
        var dt = timeEl.getAttribute('datetime') || timeEl.textContent.trim();
        var dm = dt.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dm) date = dm[1] + '-' + dm[2] + '-' + dm[3];
      }

      // Category: span.cap.breadcrumb span:last-child
      var catEl = card.querySelector('span.cap.breadcrumb span:last-child') ||
                  card.querySelector('.breadcrumb span') ||
                  card.querySelector('.category');
      var cat   = catEl ? catEl.textContent.trim() : '';

      return { url: url, title: title, excerpt: excerpt, date: date, cat: cat };
    }).filter(function (p) { return p.title; });
  }

  /* ── 5. HELPERS ──────────────────────────────────────────── */
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function fmtDate(d) {
    if (!d) return '';
    var m = d.match(/(\d{4})-(\d{2})/);
    return m ? MONTHS[parseInt(m[2], 10) - 1] + ' ' + m[1] : d;
  }

  // Category guesser for posts without one
  var CATS = [
    [/AI|LLM|GPU|模型|智能|显卡/, 'AI'],
    [/Android|刷机|BROM|FDL|GSI|SPD|SPD/, 'Android'],
    [/网络|CDN|OpenWrt|IPv6|ZeroTier|Tailscale|NAS|穿透|VPN/, '网络'],
    [/Minecraft|服务器|MC|LeavesMC|Fabric/, 'Gaming'],
    [/隐私|安全|Cealer|密码/, '安全'],
    [/RSS|信息|博客|Hexo|Cloudflare|媒体|流/, '工具'],
    [/画境|IPTV|rtp|流媒体/, '媒体'],
  ];

  function getCategory(post) {
    if (post.cat && post.cat !== '未分类' && post.cat !== 'uncategorized') return post.cat;
    var t = post.title;
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i][0].test(t)) return CATS[i][1];
    }
    return '技术';
  }

  /* ── 6. BUILD COMPONENTS ─────────────────────────────────── */

  function buildNav() {
    var nav = mk('nav', 'thfls-nav');
    nav.innerHTML =
      '<a class="thfls-nav-brand" href="/">' +
        '<div class="thfls-nav-gem">天</div>' +
        '<span class="thfls-nav-name">thfls<em>.club</em></span>' +
      '</a>' +
      '<ul class="thfls-nav-links">' +
        '<li><a href="/">主页</a></li>' +
        '<li><a href="/links/">友链</a></li>' +
        '<li><a href="/services/">服务</a></li>' +
        '<li><a href="/about/">关于</a></li>' +
      '</ul>' +
      '<button class="thfls-nav-menu" aria-label="menu">☰</button>';
    return nav;
  }

  function buildHero() {
    var s = mk('section', 'thfls-hero');
    s.innerHTML =
      '<div class="thfls-hero-grid"></div>' +
      '<div class="thfls-hero-bloom"></div>' +
      '<div class="thfls-hero-inner">' +
        '<div class="thfls-kicker">' +
          '<span class="thfls-kicker-dot"></span>' +
          '<span class="thfls-kicker-dash"></span>' +
          '广州市天河外国语学校&nbsp;·&nbsp;计算机社团' +
        '</div>' +
        '<h1 class="thfls-headline">天外计算机社</h1>' +
        '<div class="thfls-sub">THFLS.CLUB</div>' +
        '<div class="thfls-terminal">' +
          '<span class="t-cmd">$ </span><span class="t-str">cat</span> README.md<br>' +
          '<span class="t-com"># 一个有温度的 Geek Paradise</span><br>' +
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
      '<div class="thfls-hint">' +
        '<span>向下探索</span>' +
        '<div class="thfls-hint-line"></div>' +
      '</div>';
    return s;
  }

  function buildFeatured(post) {
    var cat = getCategory(post);
    var a = mk('a', 'thfls-featured');
    a.href = post.url;
    a.innerHTML =
      '<div class="thfls-f-left">' +
        '<div class="thfls-f-cat">' + cat + '</div>' +
        '<div class="thfls-f-ttl">' + post.title + '</div>' +
        '<div class="thfls-f-meta">' +
          '<span>' + fmtDate(post.date) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="thfls-f-right">' +
        '<div class="thfls-f-excerpt">' + (post.excerpt || '深入探索技术细节，分享真实实践经验。点击阅读全文。') + '</div>' +
        '<div class="thfls-f-arrow">↗</div>' +
      '</div>';
    return a;
  }

  // Bento layout pattern: which indices are wide (span 2)
  var WIDE = { 0: true, 3: true };

  function buildGrid(posts) {
    var grid = mk('div', 'thfls-grid');
    posts.forEach(function (post, i) {
      var cat = getCategory(post);
      var cls = 'thfls-card' + (WIDE[i % 6] ? ' w2' : '') + (i % 5 === 1 ? ' tall' : '');
      var a = mk('a', cls);
      a.href = post.url;
      a.style.opacity = '0';
      a.style.animation = 'card-in .42s cubic-bezier(.22,.68,0,1) ' + (.08 + i * .06) + 's forwards';
      a.innerHTML =
        '<div>' +
          '<div class="thfls-c-cat">' + cat + '</div>' +
          '<div class="thfls-c-ttl">' + post.title + '</div>' +
        '</div>' +
        '<div class="thfls-c-foot">' +
          '<span class="thfls-c-date">' + fmtDate(post.date) + '</span>' +
          '<div class="thfls-c-tags">' +
            (cat ? '<span class="thfls-chip">' + cat + '</span>' : '') +
          '</div>' +
        '</div>';
      grid.appendChild(a);
    });
    return grid;
  }

  function buildList(posts) {
    var wrap = mk('div', 'thfls-list');
    posts.forEach(function (post, i) {
      var a = mk('a', 'thfls-row');
      a.href = post.url;
      a.style.opacity = '0';
      a.style.animation = 'card-in .38s ease ' + (.04 + i * .04) + 's forwards';
      a.innerHTML =
        '<span class="thfls-r-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div class="thfls-r-body">' +
          '<div class="thfls-r-ttl">' + post.title + '</div>' +
          '<div class="thfls-r-sub">' + getCategory(post) + '</div>' +
        '</div>' +
        '<span class="thfls-r-date">' + fmtDate(post.date) + '</span>';
      wrap.appendChild(a);
    });
    return wrap;
  }

  function sect(num, title) {
    var d = mk('div', 'thfls-sect');
    d.innerHTML =
      '<span class="thfls-sect-num">// ' + num + '</span>' +
      '<span class="thfls-sect-ttl">' + title + '</span>' +
      '<div class="thfls-sect-rule"></div>';
    return d;
  }

  function buildSidebar() {
    var col = mk('div', 'thfls-side');

    // About
    var about = mk('div', 'thfls-sc');
    about.innerHTML =
      '<div class="thfls-sh">关于我们</div>' +
      '<div class="thfls-sb">' +
        '<div class="thfls-cn">天外计算机社</div>' +
        '<div class="thfls-cd">广州市天河外国语学校学生技术社团。探索前沿技术，构建开放知识体系。全年招新，欢迎加入。</div>' +
        '<div class="thfls-cl">' +
          '<a class="thfls-cl-a" href="https://github.com/THFLSClub" target="_blank" rel="noopener">GitHub</a>' +
          '<a class="thfls-cl-a" href="https://t.me/GZTHFLS" target="_blank" rel="noopener">Telegram</a>' +
          '<a class="thfls-cl-a" href="/about/">关于我们</a>' +
        '</div>' +
      '</div>';

    // Services
    var svc = mk('div', 'thfls-sc');
    svc.innerHTML = '<div class="thfls-sh">公益服务</div>';
    [
      ['M/', '软件镜像站', 'mirror.thfls.club', 'https://mirror.thfls.club'],
      ['GH', 'GitHub 加速', 'gh.thfls.club', 'https://gh.thfls.club'],
      ['PB', '公共粘贴板', 'paste.thfls.club', 'https://paste.thfls.club'],
      ['→/', '短链接生成器', 'links.thfls.club', 'https://links.thfls.club'],
      ['⚙', '开发者工具箱', 'tool.thfls.club', 'https://tool.thfls.club'],
    ].forEach(function (s) {
      var a = mk('a', 'thfls-sv');
      a.href = 'https://' + s[2]; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML =
        '<div class="thfls-svi">' + s[0] + '</div>' +
        '<div class="thfls-svi-info">' +
          '<div class="thfls-svn">' + s[1] + '</div>' +
          '<div class="thfls-svu">' + s[2] + '</div>' +
        '</div>' +
        '<div class="thfls-svd"></div>';
      svc.appendChild(a);
    });

    // Tags
    var tags = mk('div', 'thfls-sc');
    tags.innerHTML = '<div class="thfls-sh">热门话题</div>';
    var tw = mk('div', 'thfls-tw');
    ['AI','Android','网络','OpenWrt','Minecraft','开源','隐私','CDN','NAS','刷机','GPU','校园','Cloudflare','RSS'].forEach(function (t) {
      var a = mk('a', 'thfls-tp', t);
      a.href = '/tags/' + encodeURIComponent(t) + '/';
      tw.appendChild(a);
    });
    tags.appendChild(tw);

    col.appendChild(about);
    col.appendChild(svc);
    col.appendChild(tags);
    return col;
  }

  function buildFooter() {
    var f = mk('footer', 'thfls-footer');
    f.innerHTML =
      '<div class="thfls-fb"><strong>天外计算机社</strong> · 广州市天河外国语学校 · 2025</div>' +
      '<ul class="thfls-fn">' +
        '<li><a href="https://github.com/THFLSClub" target="_blank" rel="noopener">GitHub</a></li>' +
        '<li><a href="https://t.me/GZTHFLS" target="_blank" rel="noopener">Telegram</a></li>' +
        '<li><a href="/atom.xml">RSS</a></li>' +
        '<li><a href="mailto:tech@thfls.club">邮件</a></li>' +
      '</ul>';
    return f;
  }

  /* ── 7. MAIN REBUILD ─────────────────────────────────────── */
  function rebuild() {
    var posts = extractPosts();

    if (!posts.length) {
      // No posts found — just show Stellar as-is with CSS styling
      root.classList.add('thfls-ok');
      return;
    }

    var page = mk('div', 'thfls-page');

    // Nav
    page.appendChild(buildNav());

    // Hero
    page.appendChild(buildHero());

    // Content
    var wrap = mk('div', 'thfls-wrap');
    var layout = mk('div', 'thfls-layout');
    var main = mk('div', 'thfls-main');

    // Featured (first post)
    main.appendChild(sect('01', '精选文章'));
    main.appendChild(buildFeatured(posts[0]));

    // Grid (posts 1–6)
    if (posts.length > 1) {
      main.appendChild(sect('02', '近期发布'));
      main.appendChild(buildGrid(posts.slice(1, Math.min(7, posts.length))));
    }

    // List (rest)
    if (posts.length > 7) {
      main.appendChild(sect('03', '全部文章'));
      main.appendChild(buildList(posts.slice(7)));
    }

    layout.appendChild(main);
    layout.appendChild(buildSidebar());
    wrap.appendChild(layout);
    page.appendChild(wrap);
    page.appendChild(buildFooter());

    // Insert page right after <body>, before everything else
    document.body.insertBefore(page, document.body.firstChild);
  }

  /* ── 8. INIT ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    dark();

    if (isHome()) {
      rebuild();
    }

    // Animate in cleanly — single opacity transition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('thfls-ok');
        var page = document.querySelector('.thfls-page');
        if (page) {
          page.style.opacity = '0';
          page.style.transition = 'opacity .45s ease';
          requestAnimationFrame(function () { page.style.opacity = '1'; });
        }
      });
    });
  });

})();
