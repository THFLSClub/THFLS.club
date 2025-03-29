---
title: 从 Fabric 到 LeavesMC：一次 Minecraft 生电服务器的性能优化实践
date: 2025-03-29 18:00:54
author: HydroGest 
tags:
  - Minecraft
  - 分享
  - 笔记
  - 优化
  - 服务器
  - 生电
  - Fabric
  - Paper
  - Leaves
---

#### 背景  
作为 Minecraft 生电服务器服主，我始终追求更高的性能和更稳定的 TPS（每秒游戏刻）。在尝试了多种优化方案后，我经历了从 **Fabric + Lithium 优化模组组合** 到 **LeavesMC 服务端** 的迁移过程。本文将基于真实数据对比两者的性能差异，并分享优化经验——以及这段旅程中我的心路历程。

---

#### 服务器配置
专门给 MC 服务端挑的配件。
- **处理器**：Intel Xeon W-10885M (16 核 / 32 线程)  
- **内存**：64 GB DDR4 ECC  
- **存储**：1 TB HDD （经费有限暑假再上 SSD）
- **系统**：Ubuntu 24.04 LTS  
- **网络**：1 Gbps（FRP 实际可用 50 Mbps）

---

### 第一阶段：当头一棒  
**「不就是优化吗？我可是装备齐全的老玩家！」**  
当我第一次搭建 Fabric 服务器时，内心充满自信：Lithium 号称 "性能怪兽"，C2ME 优化区块加载，Carpet 更是生电玩家标配。看着满屏的优化模组，我甚至幻想能轻松实现 "TPS 20+, MSPT 10 ms" 的传说级数据。  

然而现实很快打脸——服务器启动后，TPS 像被灌了铅一样卡在 18 - 19。**「这不对劲！」** 我盯着 Spark 报告里高达 3570 ms（是 max 数据）的 MSPT 峰值，手心冒汗。**更诡异的是，Carpet AMS Addition 的进程占用率飙到 75 %**，而其他模组却像在 "躺平"。那一刻，机箱里 CPU 散热器的嗡鸣突然变得刺耳，硬盘指示灯疯狂闪烁，仿佛在抗议："这参数你也敢用？"

---

### 第二阶段：疯狂调参
**「一定是我的问题！」**  
为了拯救服务器，我化身 "JVM 参数狂魔"：ZGC 线程数从 4 调到 8，禁用大页内存，甚至尝试传说中的 `-XX:+UseG1GC -XX:-UseZGC` 组合。每改一次参数，我都像等待彩票开奖一样盯着控制台——然而 MSPT 始终顽固地趴在 40 ms 以上。  

深夜两点，我对着满屏的 GC 日志喃喃自语：**「ZGC 不是号称低延迟吗？这 480 ms 的暂停时间难道是在给内存做 SPA？」** 更崩溃的是，2025 年 3 月 29 日上午 10 点，TPS 突然暴跌到 10，玩家群里瞬间炸锅。我手忙脚乱回滚版本，内心疯狂 OS：**「明明没改配置啊！Minecraft 的史山又发作了？」**

---

### 第三阶段：直接叛逃
**「去他的 Fabric！老子要掀桌子了！」**  
当 MSPT 在当天上午 10 点飙到 90 ms 时，我的耐心终于耗尽。看着 LeavesMC 官网 "生电友好" 的宣传语，我咬咬牙点下下载按钮——**「要是连 Paper 系都不行，我就转行去当 Vtuber！」**  

迁移过程堪称 "极限操作"：一边用 rsync 疯狂备份世界文件，一边默念 **「千万别崩千万别崩」** ；当 Leaves 服务端第一次启动时，我甚至不敢直接看控制台，而是从指缝里偷瞄日志……直到那行 `[Server] Done (15. 789 s)!` 闪过，心跳才恢复正常。  

---

### 第四阶段：见证奇迹
**「这不可能！Leaves 是开了外挂吗？！」**  
当我颤抖着输入 `/spark profiler open` 时，屏幕上的数据让我差点打翻咖啡：**MSPT 中位数 21 ms！TPS 稳定 20！** 那个曾经吞噬 CPU 的 Carpet AMS Addition，此刻在插件列表里连影子都没有，但其功能却可以丝滑地用内置配置平替。  

最魔幻的是 GC 日志——ZGC 暂停时间从 480 ms 变成 0. 0028 ms，频率也从每秒 37 次降到 5. 9 次。「原来 ZGC 真能这么丝滑？之前是我错怪你了！」我对着屏幕傻笑，仿佛看到 JVM 虚拟机在跳芭蕾。玩家群里 "好流畅！""卡顿消失了！" 的刷屏，更是让我虚荣心爆棚——**「这波操作够吹三年！」**

---

### 数据对比


| 对比项目                | Fabric + 优化 Mods 配置                                                                 | Leaves 服务端配置                                                                 |
|----------------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| **基础服务端**          | Fabric 1.21.4                                                                   | Leaves（基于 Paper 1.21.4）                                                         |
| **TPS 表现**            | 18 - 19（低于正常）                                                                      | 稳定 20（满速）                                                                      |
| **MSPT 指标**           | - 最低 35 ms<br>- 平均 41.4 ms<br>- 95 % 分位 56 ms<br>- 峰值 3570 ms                                  | - 最低 5.27 ms<br>- 中位数 21 ms<br>- 95 % 分位 33.8 ms<br>- 峰值 756 ms                             |
| **进程 CPU 使用率**       | ≤ 10 %                                                  | 4. 28 %（整体负载显著降低）                                                               |
| **GC 表现**             | - ZGC 周期：12 次 / 480 ms 平均<br>- ZGC 暂停：36 次 / 0 ms 平均<br>- GC 频率：1 分 52 秒（周期）<br>37.4 秒（暂停） | - ZGC 暂停：360 次 / 0.0028 ms 平均<br>- ZGC 周期：120 次 / 170 ms 平均<br>- GC 频率：5.9 秒（暂停）<br>17.4 秒（周期） |
| **关键优化组件**         | Lithium / C2ME / Carpet 系列<br>（存在 mod 间性能冲突风险）                                                   | Paper 系原生优化<br>+ 轻量插件（LuckPerms / BlueMap 等）                                       |
| **特性支持**           | 原版机制完整支持<br>（适合精密生电机制）                                                             | Paper 机制部分修改<br>（Leaves 又加回来了，需配置）                                                   |
| **异常峰值处理**         | 出现 3570 ms 极端卡顿                                                                       | 最高 756 ms 卡顿（改善 82 %）                                                               |
| **资源利用率**          | 内存：64 GB 预分配<br>CPU 核心：16 线程                                                              | 相同硬件下资源占用显著降低                                                                   


---

### 后记：生电服主的顿悟  
这场折腾让我明白一个真理：**在 Minecraft 服务器的世界里，选择比努力更重要。** 曾经的我像西西弗斯一样推着 Fabric 的巨石上山，却忽略了架构层面的根本差异。LeavesMC 用实力证明，一个优秀的服务端不仅需要优化代码，更要理解生电玩家对 "原版特性" 的执念——就像他们官网写的："我们不做魔改，只做 Minecraft 本该有的样子。"  

现在，每当看到玩家在流畅的服务器里花式刷铁，我都会想起那个被 GC 日志折磨到崩溃的夜晚。或许这就是生电的乐趣：在混沌中寻找秩序，用 **参数和耐心**，为每一份红石梦想搭建舞台——哪怕过程中需要经历无数次 "删库跑路" 的冲动。  

（*当然，我永远不会承认自己偷偷保存了 Fabric 的备份——万一 Leaves 突然抽风呢？生电服主，永不为奴！*）  

---

### 附：Java启动参数  
```bash
java -server -Xmx18344M -Xms18344M -XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+DisableExplicitGC -XX:-UseG1GC -XX:+UseZGC -XX:-ZUncommit -XX:ZAllocationSpikeTolerance=5 -XX:+UseTransparentHugePages -XX:LargePageSizeInBytes=2m -XX:ReservedCodeCacheSize=768M -XX:MaxMetaspaceSize=512M -XX:MaxInlineSize=512 -XX:+AlwaysPreTouch -XX:+OmitStackTraceInFastThrow -XX:+DoEscapeAnalysis -XX:+OptimizeStringConcat -XX:+EliminateLocks -XX:+SegmentedCodeCache -XX:+UseVectorCmov -XX:+UseCMoveUnconditionally -XX:+UseFastStosb -XX:MaxGCPauseMillis=50 -XX:ConcGCThreads=4 -XX:ParallelGCThreads=16 -jar leaves-1.21.4.jar nogui
```

参数说明：
 
 - `XX:ParallelGCThreads=16`：匹配16核CPU
 
 - `XX:+UseTransparentHugePages` ：Linux系统级内存优化

### 附：给 Fabric 服主的忠告

Carpet AMS Addition 在 Fabric 环境中表现出严重的性能问题：
 
单 Mod 占用 75% 进程 CPU Time，远超其他优化组件（如 Lithium 仅占 19%）
 
直接导致 MSPT 飙升，安装后平均 MSPT 从 41.4ms 恶化至更高
 
资源消耗不成比例，其 CPU 占用率是第二名 Lithium 的 近 4 倍，但未带来可观测的 TPS 提升
