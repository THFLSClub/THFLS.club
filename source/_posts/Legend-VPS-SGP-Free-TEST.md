---
title: Legend VPS SGP Free TEST
date: 2025-03-29 22:15:54
author: panjingxi
tags: 
  -网络
---

# Legend-SG-BGP-512M-Free 测试

---

### 🌟 **背景与目标**  

免费的LegendVPS，https://t.me/LegendVPSOfficial

---

### 🛠️ **配置**  

1. **DNS64**：

   ```
   cp /etc/resolv.conf{,.bak}; echo -e "nameserver 2a00:1098:2b::1\nnameserver 2a01:4f9:c010:3f02::1\nnameserver 2a01:4f8:c2c:123f::1\nnameserver 2a00:1098:2c::1" > /etc/resolv.conf
   ```

   

2. **CF WARP**：

   ```
   wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh
   ```

   

3. **ArgoX**：

   ```
   bash <(wget -qO- https://raw.githubusercontent.com/fscarmen/argox/main/argox.sh)
   ```

   

4. **Hysteria**：

   ```
   wget -N --no-check-certificate https://raw.githubusercontent.com/Misaka-blog/hysteria-install/main/hy2/hysteria.sh && bash hysteria.sh
   ```

---

### 配置

#### **1.基本信息**

```
CPU Model            : Intel(R) Xeon(R) CPU E5-2683 v4 @ 2.10GHz
CPU Cores            : 1 Cores 2099.998 MHz x86_64
CPU Cache            : 16384 KB 
OS                   : Debian GNU/Linux 12 (64 Bit) KVM
Kernel               : 6.1.0-30-cloud-amd64
Total Space          : 1.3 GB / 2.0 GB 
Total RAM            : 245 MB / 470 MB (185 MB Buff)
Total SWAP           : 0 MB / 0 MB
Load Average         : 0.20, 0.27, 0.35
TCP CC               : bbr
```



#### **2. IP检测**  

​	![IPCheck](https://Report.Check.Place/IP/33AZ37WYI.svg "Markdown")

#####  IPv4 解锁情况

```
 ** 您的网络为:  (104.28.*.*)

============[ Multination ]============
 Dazn:                                  Yes (Region: SG)
 Disney+:                               Yes (Region: SG)
 Netflix:                               Originals Only
 YouTube Premium:                       Yes (Region: SG)
 Amazon Prime Video:                    Yes (Region: SG)
 TVBAnywhere+:                          Yes
 Spotify Registration:                  Yes (Region: SG)
 OneTrust Region:                       SG [Unknown]
 iQyi Oversea Region:                   SG
 Bing Region:                           SG (Risky)
 Apple Region:                          SG
 YouTube CDN:                           Hong Kong
 Netflix Preferred CDN:                 Failed (Error: No ISP Info Found)
 ChatGPT:                               Yes
 Google Gemini:                         Yes (Region: SGP)
 Claude:                                No
 Wikipedia Editability:                 No
 Google Play Store:                     Singapore 
 Google Search CAPTCHA Free:            No
 Steam Currency:                        SGD
 ---Forum---
 Reddit:                                Yes
```



##### 测试 IPv6 解锁情况
```
 ** 您的网络为: Cylix (2a14:7dc0:100:*:*)

============[ Multination ]============
 Dazn:                                  IPv6 Is Not Currently Supported
 Disney+:                               IPv6 Is Not Currently Supported
 Netflix:                               Yes (Region: SG)
 YouTube Premium:                       Yes (Region: SG)
 Amazon Prime Video:                    IPv6 Is Not Currently Supported
 TVBAnywhere+:                          IPv6 Is Not Currently Supported
 Spotify Registration:                  Yes (Region: SG)
 OneTrust Region:                       SG [Unknown]
 iQyi Oversea Region:                   IPv6 Is Not Currently Supported
 Bing Region:                           SG (Risky)
 Apple Region:                          SG
 YouTube CDN:                           Singapore
 Netflix Preferred CDN:                 Singapore
 ChatGPT:                               Failed (Network Connection)
 Google Gemini:                         Yes (Region: SGP)
 Claude:                                No
 Wikipedia Editability:                 Yes
 Google Play Store:                     Singapore 
 Google Search CAPTCHA Free:            Yes
 Steam Currency:                        IPv6 Is Not Currently Supported
```

##### **AutoTrace**

```
No:1/9 Traceroute to 中国 北京 电信 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::681a:c97] - 243.49ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 240e:904:800:1f80::b00:37 (bj-ct-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.46 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       64.93 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       3.38 ms
4   2001:218:4000:5000::2f5   AS2914   新加坡    gin.ntt.net
                                       0.78 ms
5   *
6   2001:218:0:2000::11e      AS2914   新加坡    gin.ntt.net
                                       0.79 ms
7   2001:218:0:4000::1e       AS2914   新加坡    gin.ntt.net
                                       54.08 ms
8   2001:218:0:4000::1e       AS2914   新加坡    gin.ntt.net
                                       54.31 ms
9   240e:0:a::c9:5314         AS4134   中国 上海   www.chinatelecom.com.cn 电信
                                       138.82 ms
10  240e::f:2:6801:602        AS4134   中国 上海   www.chinatelecom.com.cn 电信
                                       144.89 ms
11  *
12  *
13  *
14  240e:0:9000:100::1bf      AS23724  中国    bjtelecom.net
                                       159.34 ms
15  *
16  *
17  240e:904:800:1f80::b00:37 AS23724  中国    bjtelecom.net
                                       168.38 ms

No:2/9 Traceroute to 中国 上海 电信 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::ac43:45a3] - 211.72ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 240e:96c:6000:f80::b00:84 (sh-ct-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.58 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.81 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       4.15 ms
4   2001:218:4000:5000::2f5   AS2914   新加坡    gin.ntt.net
                                       0.89 ms
5   *
6   *
7   2001:218:0:2000::12a      AS2914   新加坡    gin.ntt.net
                                       1.51 ms
8   240e:0:a::ca:74d4         AS4134   中国    www.chinatelecom.com.cn 电信
                                       142.73 ms
9   *
10  *
11  *
12  240e:18:10:4704::89       AS4812   中国 上海   chinatelecom.cn
                                       184.22 ms
13  *
14  *
15  *
16  *
17  240e:96c:6000:f80::b00:84 AS4811   中国    chinatelecom.cn
                                       149.79 ms

No:3/9 Traceroute to 中国 广东 电信 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - 104.26.12.151 - 246.29ms - Misaka.LAX
IP Geo Data Provider: LeoMoeAPI
traceroute to 240e:97d:10:140c:8000:0:b00:35 (gd-ct-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.52 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.57 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       1.22 ms
4   2001:218:4000:5000::2f5   AS2914   新加坡    gin.ntt.net
                                       0.75 ms
5   2001:218:0:2000::231      AS2914   新加坡    gin.ntt.net
                                       2.39 ms
6   *
7   2001:218:0:4000::10e      AS2914   新加坡    gin.ntt.net
                                       53.86 ms
8   *
9   *
10  *
11  *
12  *
13  240e:97d:10:2300::265     AS134763 中国          
                                       163.42 ms
14  *
15  *
16  *
17  *
18  240e:97d:10:140c:8000:0:b00:35 AS134763 中国          
                                       148.33 ms

No:4/9 Traceroute to 中国 北京 联通 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::ac43:45a3] - 167.71ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 2408:8706:0:dd80::b00:90 (bj-cu-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.59 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.50 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       12.94 ms
4   2403:e800:508:300::14e    AS4637   中国 香港   telstraglobal.com
                                       1.10 ms
5   2001:218:4000:5000::2f5   AS2914   新加坡    gin.ntt.net
                                       1.18 ms
6   *
7   *
8   2001:218:0:2000::86       AS2914   中国 香港   gin.ntt.net
                                       37.56 ms
9   2001:218:0:4000::11a      AS2914   中国 香港   gin.ntt.net
                                       152.73 ms
10  2001:218:0:4000::11a      AS2914   中国 香港   gin.ntt.net
                                       153.44 ms
11  *
12  *
13  *
14  *
15  *
16  *
17  *
18  2408:8706:0:dd80::b00:90  AS4808   中国          
                                       175.91 ms

No:5/9 Traceroute to 中国 上海 联通 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::681a:d97] - 169.15ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 2408:873c:6810:5:8000:0:b00:220 (sh-cu-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.68 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.77 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       1.04 ms
4   2001:218:4000:5000::2f5   AS2914   新加坡    gin.ntt.net
                                       0.71 ms
5   *
6   *
7   2001:218:0:2000::86       AS2914   中国 香港   gin.ntt.net
                                       33.86 ms
8   *
9   2001:218:0:2000::ba       AS2914   中国 香港   gin.ntt.net
                                       41.33 ms
10  *
11  *
12  2408:8000:2:7a8::1        AS4837   中国 广东 广州  chinaunicom.cn 联通
                                       158.27 ms
13  2408:8000:2:56a::1        AS4837   中国 江苏 南京  chinaunicom.cn
                                       157.48 ms
14  2408:8000:a009:2::3       AS4837   中国 江苏 泰州  chinaunicom.cn
                                       163.71 ms
15  *
16  *
17  *
18  2408:873c:6810:5:8000:0:b00:220 AS4837   中国    chinaunicom.cn
                                       159.88 ms

No:6/9 Traceroute to 中国 广东 联通 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::681a:c97] - 207.73ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 2408:8756:dcff:e001:8000:0:b00:99 (gd-cu-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.59 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.81 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       1.08 ms
4   2403:e800:508:300::14e    AS4637   中国 香港   telstraglobal.com
                                       1.17 ms
5   *
6   2001:218:0:2000::236      AS2914   中国 香港   gin.ntt.net
                                       44.99 ms
7   *
8   *
9   2001:218:0:4000::11a      AS2914   中国 香港   gin.ntt.net
                                       158.59 ms
10  *
11  2408:8000:2:78b::1        AS4837   中国 广东 广州  chinaunicom.cn 联通
                                       161.54 ms
12  *
13  *
14  *
15  2408:8001:3101:104::3     AS17816  中国 广东 潮州市  chinaunicom.cn 联通
                                       178.43 ms
16  2408:8001:3101:f030::4    AS17816  中国 广东 潮州  chinaunicom.cn
                                       171.36 ms
17  *
18  *
19  2408:8756:dcff:e001:8000:0:b00:99 AS17816  中国    chinaunicom.cn
                                       162.26 ms

No:7/9 Traceroute to 中国 北京 移动 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::681a:d97] - 169.68ms - Misaka.HKG
2025/03/29 10:36:05 RetToken failed 3 times, please try again later

No:8/9 Traceroute to 中国 上海 移动 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::681a:c97] - 162.45ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 2409:8c1e:8fc0:f001:8000:0:b00:167 (sh-cm-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       0.72 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.90 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       0.87 ms
4   2403:e800:508:300::14e    AS4637   中国 香港   telstraglobal.com
                                       1.26 ms
5   2402:4f00:4000::59        AS58453  新加坡    cmi.chinamobile.com 移动
                                       1.38 ms
6   2402:4f00:100::169        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       40.95 ms
7   2402:4f00:100::169        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       41.23 ms
8   2402:4f00:100::261        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       35.31 ms
9   2402:4f00:100::932        AS58453  中国 上海   cmi.chinamobile.com 移动
                                       62.21 ms
10  *
11  2409:8080:0:4:2c5:2f5:2:1 AS9808   中国 上海   chinamobileltd.com 移动
                                       60.95 ms
12  2409:8080:0:1:206:2c5::   AS9808   中国 上海   chinamobileltd.com 移动
                                       62.64 ms
13  2409:8080:0:2:206:261:300:1 AS9808   中国    chinamobileltd.com
                                       68.01 ms
14  *
15  *
16  *
17  *
18  2409:8c1e:8fc0:f001:8000:0:b00:167 AS9808   中国    chinamobileltd.com
                                       66.27 ms

No:9/9 Traceroute to 中国 广东 移动 (TCP Mode, Max 30 Hop, IPv6)
===================================================================
NextTrace v1.3.7 2025-01-17T03:07:56Z 69588b0
[NextTrace API] preferred API IP - [2606:4700:20::ac43:45a3] - 189.48ms - Misaka.HKG
IP Geo Data Provider: LeoMoeAPI
traceroute to 2409:8c54:1000:24::b00:84 (gd-cm-v6.ip.zstaticcdn.com), 30 hops max, 52 bytes payload, TCP mode
1   2a14:7dc0:100:1013::1     AS213845 新加坡          
                                       14.02 ms
2   2401:f460:0:22:10:14:91:0 *        网络故障          
                                       0.61 ms
3   2401:3620:221:ffff:10:28:4:4 *        中国 香港         
                                       1.31 ms
4   2403:e800:508:300::14e    AS4637   中国 香港   telstraglobal.com
                                       1.16 ms
5   *
6   2402:4f00:100::169        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       41.63 ms
7   2402:4f00:100::261        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       34.93 ms
8   2402:4f00:100::261        AS58453  中国 香港   cmi.chinamobile.com 移动
                                       34.74 ms
9   *
10  2409:8080:0:1:3c2:3f2::   AS9808   中国 广东 广州  chinamobileltd.com 移动
                                       43.43 ms
11  2409:8080:0:1:305:3c3::   AS9808   中国 广东 广州  chinamobileltd.com 移动
                                       49.12 ms
12  2409:8080:0:1:306:3c3::   AS9808   中国 广东 广州  chinamobileltd.com 移动
                                       49.35 ms
13  *
14  2409:8055:3010:130::      AS56040  中国 广东 深圳  gd.10086.cn 移动
                                       54.46 ms
15  *
16  *
17  2409:8c54:1000:24::b00:84 AS56040  中国    gd.10086.cn
                                       56.79 ms
```
