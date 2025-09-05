---
title: 科大讯飞学习机通用刷 Magisk + LSPosed 教程
date: 2025-09-05 19:55:13
author: panjingxi
tags:
    - 破解
    - 工具
    - 教程
---

# 科大讯飞学习机通用刷 Magisk + LSPosed 教程

## 导语

在之前的教程中，我们已经给c6解BL并安排上了GSI/V99系统。但是众所周知，V99系统并没有自带的Root权限，刷模块，装框架也就无从谈起了。谈到Root，业内最主流的方案就是Magisk。得益于Magisk Systemless的特性，让我们无需修补系统分区就能实现Root权限的获取，但这些解决方案在c6学习机上全都无从谈起，这是为什么呢？我们接下来会讲到。

**本教程理论上兼容非华为的所有学习机，如c8，c6plus，c8plus等 但团队没有任何人试过，所以如果你在刷的过程中遇到什么问题或有经验分享，就加入我们的交流群吧！ 我们非常欢迎你的加入！**

## 不能直接修补Boot分区的原因

首先，学习机的boot分区没有ramdisk，导致Magisk并不能通过修补ramdisk来植入自身二进制文件。其次，紫光芯片的分区都有无法关闭的AVB校验，如果硬要刷也不是不行，但由于方法过于复杂且成功率较低，这里不再赘述。

那我们只能退而求其次，放弃Magisk的Systemless特性，直接修补System分区！

**在修补System分区并刷入时，由于系统镜像签名不一致，如果你没有解BL锁会直接卡开机/循环重启！ 在跟随这篇教程之前务必保证你的学习机已解BL锁！ 如果你的学习机没有解BL锁，请跟随**[**这篇教程**](https://github.com/LinearTeam-iFlytek/iflytek_changyan/wiki/科大讯飞学生机C6硬解方案B（含官方固件包）)**解锁后再继续！**

## 原理

这篇教程的原理非常简单，就是提取你原机的System分区，使用Magisk On System修补分区后刷入，你就拥有了Magisk权限。接着按照正常方式开启Zygisk并刷入LSPosed即可！

在本教程中，用到了以下由他人开发的软件：

- Ubuntu (>=22.04)
- simg2img
- [Magisk On System](https://gitee.com/zcg9783/magisk-on-system)

## 我修补的V99系统镜像（供参考，如果做好了备份可以刷入试试，小白跳过）

## 注意事项

- **1.**这样子直接刷别人的系统特别容易砖！请确保你做好了备份再来尝试，如果成功就可以直接跳到“安装Magisk和LSPosed”章节了！
- **2.**我的设备是c6学习机，如果是其它型号不要尝试！

我修补的V99系统镜像在 [这个仓库的Release](https://github.com/LinearTeam-iFlytek/iflytek_changyan/releases/tag/C6Magisk) 里面，可以直接下载！

## 提取你的原版V99系统镜像

首先，打开你的SPD_DUMP，也就是在[这篇教程](https://github.com/LinearTeam-iFlytek/iflytek_changyan/wiki/科大讯飞学生机C6硬解方案B（含官方固件包）)中的`spd_dump_stable_XXXXXX.zip`中解压出来的文件。将你的平板关机，按住音量下键三秒后插入数据线连接电脑。这时，你应该能看到spd dump的窗口中出现了BROM> ,在它的后面按照你的需要选择性输入以下指令：

### 全部备份版（前面已经全部备份过不需要）

```
fdl fdl1.bin 0x5500
fdl fdl2.bin 0x9efffe00
exec
r all
reset
```

### 仅提取 System 与 Vendor 版

```
fdl fdl1.bin 0x5500
fdl fdl2.bin 0x9efffe00
exec
r system
r vendor
reset
```

完成后，将提取的文件中的`system.bin`与`vendor.bin`改名为`system.img`与`vendor.img`，这步就算完成了。

## 准备运行 Magisk On System 的环境

接下来，我们就要正式开始准备Magisk On System了！Magisk On System脚本的运行需要Linux环境，且作者推荐使用Ubuntu，所以我们需要一个虚拟机软件：`VMware Workstation`。由于版权原因，请自行百度、必应、谷歌搜索获取。

安装完`VMware`，它的主界面应该是这样的： ![图1](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/image.png)

这里，我们点击`创建新的虚拟机`，选择`自定义（高级）`，一路下一步，直到让你选择镜像，就像这样： ![图2](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_10-00-11.png)

Ubuntu系统的镜像可以在 [**此处**](https://mirrors.ustc.edu.cn/ubuntu-releases/25.04/) 获取，选择_amd64结尾的iso镜像即可~~（2025年了不会还有人在用32位电脑吧）~~

下一步，输入虚拟机展示的名称和虚拟机位置。

**请选择至少有30GB空余空间的硬盘，否则接下来空间可能不够用！**

接着一路下一步，直到到`选择磁盘`的页面，选择`创建新的虚拟硬盘`，分配30~40GB的空间（建议40GB起步，实在没有空间30GB也可以），然后一路下一步创建虚拟机，切换到创建的虚拟机，点击`开启此虚拟机`，不一会你会见到这个界面：

![图3](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_10-11-48.png)

选择简体中文，一路下一步直到这个界面：

![图4](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_10-12-19.png)

这里可以随便取名，输入一个好记的密码并记录下来，待会儿要用到。最后，一路下一步，直到系统开始安装，等到安装完成，点击重启，光盘会自动弹出。如果关机界面出现需要弹出可移动介质的提示，就右键vmware右下角靠左的光盘图标，将`已连接`和`启动时连接`取消勾选，回到虚拟机按下Enter就可以啦！

## 题外话：在主机与VMware虚拟机之间共享文件

谈到虚拟机，那么主机与虚拟机之间互传文件一定是个大问题。由于是Linux系统，所以vmtools并不支持直接与主机拖放互传文件。所以，我们需要添加一个共享文件夹来解决这个问题。

在添加共享文件夹之前，我们需要安装vmware tools，这样才能正确创建并挂载共享文件夹，你可以通过执行以下代码来安装OpenVMTools：

```
sudo apt-get install open-vm-tools -y
```

安装成功后，回到主机，找到我们正在使用的虚拟机，右键选择`设置`，在顶部找到`选项`，点击`共享文件夹`，点选`总是启用`，然后点击下方的`添加`来创建共享文件夹，在主机中选择一个路径并给共享文件夹命名，这里以`shared`来做示范。

![图5](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_11-07-38.png) ![图6](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_11-10-18.png) 

接下来，我们要挂载这个共享文件夹，可以通过以下命令挂载这个共享文件夹：

```
sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow-other
```

到这里，共享文件夹挂载完成了。待会你就可以将文件复制到刚刚设置的主机共享目录，然后在虚拟机中打开文件管理，在顶部地址栏输入`/mnt/hgfs`，然后在里面找到你的共享文件夹，进入即可看到刚刚复制到主机共享目录的文件！

## 下载 Magisk On System 和 simg2img

接下来，让我们下载MOS脚本本体和它的依赖simg2img！首先，让我们来安装simg2img，按照顺序执行以下指令：

```
sudo snap install android-platform-tools

sudo snap connect android-platform-tools:adb-support
sudo snap connect android-platform-tools:block-devices
sudo snap connect android-platform-tools:raw-usb
sudo snap connect android-platform-tools:removable-media
sudo snap connect android-platform-tools:network
sudo snap connect android-platform-tools:network-bind

sudo snap alias android-platform-tools.img2simg img2simg
sudo snap alias android-platform-tools.simg2img simg2img
```

当然了，如果你嫌麻烦，并且会使用linux系统，可以在主文件夹下创建一个sh脚本（如：install.sh），将这些文字复制进去，然后使用以下命令执行：

```
sudo sh install.sh
```

这样就只需要输入一次密码了！

接着，让我们安装Magisk On System脚本吧！[点击这个链接](https://gitee.com/zcg9783/magisk-on-system/releases/download/1.1/MOS_Patch_V1.1fix_20250601.zip) 来下载MOS Patcher脚本，当然了，这个链接不一定是最新版，所以你可以手动前往 [原作者的Gitee Releases](https://gitee.com/zcg9783/magisk-on-system/releases/tag/1.1) 下载最新版。

下载完成后，解压到主文件夹（别的地方也可以），你会发现主文件夹里多了一个`MOS_Patch_VX.X_XXXXXXXX`文件夹，点击进入，这里就是脚本所在位置了！

## 使用脚本修补分区

正片终于开始了，让我们修补分区吧！将你的`system.img`和`vendor.img`通过共享文件夹传入虚拟机（用别的方法也行），复制到你刚刚看到的`MOS_Patch_VX.X_XXXXXXXX`文件夹中的`images`文件夹内，打开终端，cd到MOS Patcher目录内。以下是一个cd到MOS Patcher目录的示例：

```
cd MOS_Patch_V1.1fix_20250621/
```

接着，执行这条命令：

```
sudo sh start.sh
```

如果出现`错误：simg2img未安装`这条提示，但你已经正确安装了simg2img，那么可以跟着我修改脚本： ![图7](https://github.com/LinearTeam-iFlytek/iflytek_changyan/raw/main/cb_magisk/Snipaste_2025-06-15_11-33-04.png)

我们只需要找到这段负责校验的代码，用`#`注释掉它即可！（简单粗暴...）

如果不出意外的话，脚本会自动修补两个镜像，并输出到`out`文件夹内。你只需要将`out`文件夹内的`system.img`和`vendor.img`复制回共享文件夹，传回到主机即可！

## 深刷写回修补后的分区

将修补完的分区传回主机后，再次打开spd_dump.exe，继续将平板关机，按住音量下键3秒后插入电脑，在BROM>后按顺序输入以下指令：

```
fdl fdl1.bin 0x5500
fdl fdl2.bin 0x9efffe00
exec
w system [此处拖入你的system.img或输入system.img的完整路径]
w vendor [此处拖入你的vendor.img或输入vendor.img的完整路径]
```

如果你的V99系统镜像不是现场提取的，我建议你再加一步：清除数据

执行这条命令：

```
w misc [此处拖入spd_dump自带的misc-wipe.bin或输入misc-wipe.bin的完整路径]
```

如果你的system.img是现场提取的，那么可以跳过。

然后不要拔出平板，再执行：

```
reset
```

即可重启平板回到正常系统！

## 安装 Magisk 管理器和 LSPosed 框架

刷完了系统，让我们安装 Magisk 管理器吧！[点击这个链接](https://gitee.com/zcg9783/magisk-on-system/releases/download/1.1/Magisk On System-b1dc47a0_29001.apk) 可以直接下载管理器。当然了，这个链接不一定是最新版，所以你可以手动前往 [原作者的Gitee Releases](https://gitee.com/zcg9783/magisk-on-system/releases/tag/1.1) ，找到`Magisk On System-XXXXXXXX_XXXXX.apk`下载来获取最新版管理器。

下载后，用平板安装这个apk，打开你就拥有Magisk了！安装LSPosed框架的步骤与正常相同，你只需要：

1. 在 Magisk 设置里寻找`Zygisk`并打开
2. 重启平板
3. 自行百度获取LSPosed模块
4. 用 Magisk 管理器安装模块
5. 再次重启

就可以使用LSPosed框架了！

## 结语

这篇教程到这里也就结束了，想必你一定成功拿到Magisk了吧！

如果你遇到了问题，可以向我们团队的成员求助，或者直接向我求助，我们很乐意为你解决问题！

**转载自LinearTeam**
