---
title: 删除Baidu网盘附带的“智能看图”
date: 2025-07-23 10:50:37
author: panjingxi
tags:
  - 软件
---

某网盘更新到7.58版本之后附带了一个“智能看图”软件，关联了一堆常见图片格式。这个软件的名字前面加了个空格，所以在默认程序列表里很靠前。目前该网盘里没有删除这个功能的设置，所以需要手动编辑一下注册表，先按 Ctrl + R 打开“运行”窗口，输入`regedit`并回车，打开注册表编辑器，然后删除以下项目：

```
HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociationsHKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewerHKEY_CURRENT_USER\Software\RegisteredApplications\BaiduNetdiskImageViewer
```

程序目录位于该网盘的安装目录内，默认为：

```
%APPDATA%\baidu\BaiduNetdisk\module\ImageViewer
```

批量删除的脚本，直接复制到记事本中，另存为`remove_image_viewer.bat`（注意，请确保保存时的编码是“ANSI”或“GBK”“GB2312”），然后双击运行即可：


```
@echo off
echo ==========================================
echo ○○网盘“智能看图”功能卸载脚本
echo ==========================================
echo.
echo 此脚本将删除○○网盘捆绑的“智能看图”软件
echo 请确保以管理员身份运行此脚本
echo.
pause
echo 正在删除注册表项...
echo.
:: 删除注册表项1：HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations
echo [1/3] 删除 HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations
reg delete "HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? 删除成功
) else (
    echo     ? 删除失败或项目不存在
)
:: 删除注册表项2：HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer
echo [2/3] 删除 HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer
reg delete "HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? 删除成功
) else (
    echo     ? 删除失败或项目不存在
)
:: 删除注册表项3：HKEY_CURRENT_USER\Software\RegisteredApplications\BaiduNetdiskImageViewer
echo [3/3] 删除 HKEY_CURRENT_USER\Software\RegisteredApplications 中的 BaiduNetdiskImageViewer
reg delete "HKEY_CURRENT_USER\Software\RegisteredApplications" /v "BaiduNetdiskImageViewer" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? 删除成功
) else (
    echo     ? 删除失败或项目不存在
)
echo.
echo 正在删除程序文件...
:: 删除程序目录
set "imageviewer_path=%APPDATA%\baidu\BaiduNetdisk\module\ImageViewer"
if exist "%imageviewer_path%" (
    echo 找到程序目录: %imageviewer_path%
    echo 正在删除程序文件...
    rmdir /s /q "%imageviewer_path%" >nul 2>&1
    if %errorlevel% equ 0 (
        echo     ? 程序文件删除成功
    ) else (
        echo     ? 程序文件删除失败，可能文件正在使用中
        echo     请手动删除: %imageviewer_path%
    )
) else (
    echo     程序目录不存在或已被删除
)
echo.
echo ==========================================
echo 卸载完成！
echo ==========================================
echo.
echo 建议重启计算机以确保所有更改生效
echo 如果问题仍然存在，
echo 请检查以下路径是否还有残留文件：
echo %APPDATA%\baidu\BaiduNetdisk\module\ImageViewer
echo.
echo 按任意键退出...
pause >nul
```
