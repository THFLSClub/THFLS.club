---
title: 域名回归与技术栈迁移公告：thfls.club 重新起航
date: 2026-03-07 10:00:00
tags:
  - 公告
  - 计算机社
  - Cloudflare
categories:
  - 社团事务
author: HydroGest
---

## 终于，我们回来了！

各位天外计算机社（THFLS Computer Club）的同学：

经过长达半个月的“技术流放”，我们的官方域名 **thfls.club** 终于正式回归。在此，我们要对近期由于域名解析故障导致的站点无法访问表示抱歉。

### 发生了什么？

由于旧有的 Cloudflare 账户触发了不可预知的风控系统，导致账号被锁定（提示 `You are not allowed to create new zones`）。在尝试与 Cloudflare Trust & Safety 团队进行了长达 16 天的无果沟通后，我们决定采取更彻底的方案。

### 技术栈的微调

为了绕过账号封禁并保证网站的持续可用，我们对网站的部署架构进行了优化：

1.  **账号迁移**：我们弃用了被封禁的旧账号，并在新环境下重新部署。
2.  **持续集成（CI/CD）**：目前网站已完全接入 GitHub Actions 自动化流水线。每当我们向 `main` 分支推送代码，GitHub 会自动完成 **Hexo** 构建，并利用 API 令牌将 `public` 目录下的静态资源推送到 Cloudflare Pages。
3.  **零宕机维护**：通过这种方式，我们不仅解决了域名所有权的限制问题，还实现了无需手动干预的自动化发布流程。

### 接下来

计算机社的宗旨一直是“探索、实践、分享”。这次的小插曲虽然折腾，但也让我们积累了处理云服务商风控和自动化部署迁移的实战经验。

接下来，我们将继续在 thfls.club 分享更多关于编程、算法以及校园数字化建设的内容。

**Stay Tuned. The Code Never Sleeps.**

---
**天外计算机社 (THFLS Computer Club)** *2026年3月7日*
