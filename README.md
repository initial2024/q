# Q Mobile · DSH Android QQ Bot · v0.1.2

> **非官方二次创作 / Unofficial adapter**。官方核心始终来自
> [Tencent Connect / dsh-qqbot](https://github.com/tencent-connect/dsh-qqbot)
> 的 **0.5.5** 正式 npm 包。Tencent Connect 保留其源代码和 SDK 权利。
> 项目没有替换 QQ Bot 官方协议，也不保证账号绝对安全。

## 直接安装（Android DSH 插件页）

```text
https://raw.githubusercontent.com/initial2024/q/main/dist/dsh-qqbot-q-mobile-0.1.2.tgz
```

**此 URL 只有在 main CI 完成并且 dist 文件实际存在后才可用。**
粘贴以上以 `.tgz` 结尾的 URL 至 DSH 插件安装框。不是 Git URL、
不是 APK，不依赖 Git 命令。依赖仍需从 npm 获取：**该 TGZ 不包含离线 SDK**。

**同一 DSH profile 内只能启用一个 QQ Bot 实例**：先禁用/卸载原版
`@tencent-connect/dsh-qqbot` 插件再安装本适配外壳；不得同时注册
两个 `im-qqbot`。**不要卸载手机 QQ，不要删除 DSH 历史数据。**

## 核心完全使用官方包

- 入口代码只代理官方 `@tencent-connect/dsh-qqbot@0.5.5`。
- 官方处理 WebSocket、QQ Bot 认证、二维码绑定、白名单、消息、
  会话、审批及发送；本仓库不模拟 QQ 客户端登录。
- 不改 AppID/Secret 的存储格式，不覆盖原 DSH profile。
- 官方功能受 DSH 宿主、QQ 官方权限、网络与 Android 后台策略约束。

### 手机端绑定（单机优先）

1. 在 DSH 插件页安装并启用该 TGZ，重启 DSH Web/Node 运行时。
2. 在 DSH **设置 → QQ 机器人** 打开官方扫码/手动绑定页面。
   v0.1.2 的安装包已包含完整官方客户端 UI，并补齐 `dsh.client`；
   客户端包 ID 与详情匹配包名经过适配，顶层 UI 依赖为空，
   必须等 `slots` 服务就绪后才能注册设置页，桌面侧栏服务可缺省。
   该策略避免 QQ UI 阻断整个 DSH Web 启动。
   如果你的 DSH Android 不提供 `slots` 设置席位，该入口仍会受宿主限制。
   重启 DSH WebView/前端后检查该栏目与插件详情页「设置」按钮。
3. 如果手机上无法扫描自己屏幕上的二维码，使用 QQ Bot 平台提供的
   **官方 AppID/AppSecret**，通过 DSH 的**本地可信配置入口**填写，
   或在当前 profile 的 `cordis.patch.yml` 的 `im-qqbot` 配置项填写。
   **不要把密钥提交到本 GitHub 仓库**。
4. 首装时 `access.c2cMode=allowlist` 且名单为空，群聊为 disabled，
   所以**绑定后仍可能不响应消息**。应从官方已认证的机器人账号
   得到你的 QQ 用户 OpenID 并加入 `access.c2cAllow`；通过官方扫码
   流程绑定成功时，官方插件可能自动设置首个用户白名单。
5. 明确希望群聊开放后，按官方文档调整 `groupMode` / `groupAllow`；
   切勿默认授权陌生群或所有陌生私聊。
6. 若你的 DSH Android 不支持官方客户端席位，可改用 DSH 本地配置；
   **不部署额外公网扫码服务、不托管凭据、不绕过权限**。

### 诊断

若 DSH Android 本身具备命令行，可在插件安装目录执行：

```sh
node bin/q-mobile-doctor.mjs
```

它只检查本地官方依赖版本、Node 与运行时特征。不会输出 AppSecret，
不会登录 QQ，不能代替实际连接测试。

## 安全默认配置（相较官方）

- 私聊：`allowlist`，空列表默认全部拒绝。
- 群聊：`disabled`，需要你显式开启。
- 富媒体、视觉处理：默认关闭。
- 文件发送：路径白名单开启，自动投递关闭。
- 并发队列：`maxQueue=3`。
- 模型与 provider：直接继承当前 DSH，无自定义传输。

配置文件为 `cordis.patch.yml`，保留官方 `im-qqbot` 行 ID。
插件客户端沿用官方 `settings.section`、绑定路由、设置页及二维码组件，
并把插件详情匹配名称改为 `dsh-qqbot-q-mobile`。
这能恢复客户端入口的注册；**真实 Android 上的可见性仍需验收**，
不能把 CI 的客户端注册模拟测试当成手机 UI 通过。

## 测试与发布边界

GitHub Actions 检查官方 npm 0.5.5 精确依赖、插件代理入口、
**从官方包确定性生成的客户端 UI**（登录和扫码逻辑原样保留）、
settings.section / 详情页注册和客户端打包、
安全默认值、代码与包完整性及 `.tgz` 发布。真实手机 QQ 连接、
WebSocket 断线重连、后台保活、聊天上下文、视觉发送、扫码
界面仍需要使用者的 Android DSH 环境验证，**不能从 CI 推断**。

## 原始出处、许可与免责

详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)；
原创软件核心版权所有 Tencent Connect、MIT 许可。
Q Mobile 不是官方发布，遵守 QQ 开放平台协议与使用限制。

## v0.1.2 修复记录：设置与二维码入口

旧版 v0.1.0 仅有 Node 服务端代理，缺少 `./client` 导出、
`dsh.client.platform=web` 元数据和浏览器客户端模块，导致设置页没有 QQ
机器人入口。本版在打包阶段从官方固定版本 0.5.5 的
`lib/client.js` 生成对应客户端文件，并在压缩包内保留
`THIRD_PARTY_LICENSE_TENCENT.txt`（腾讯原版 MIT License）。
没有修改任何官方扫码路由、用户认证、白名单或 QQ SDK。
具体三项最小变更见 `scripts/prepare_official_client.mjs`。
**若 Android 宿主本身不提供 `slots` 接口，仍可能无法显示；请反馈
设置界面和插件详情页截图进行宿主侧兼容排查。**

## v0.1.2：Web boot 卡在 loading 的修复及安全恢复

### 识别问题

若屏幕显示 `HARNESS / Failed to load plugins /`
`dsh-qqbot-q-mobile: loading`，这是**浏览器插件启动门禁**，
不是 QQ SDK、二维码失效或 Android Shizuku/root 权限问题。

v0.1.1 错误地把 `slots` 设为浏览器客户端**顶层必需服务**；
Android 宿主若迟于插件提供此服务，Cordis 将在 web boot 保持
`loading`，进而拒绝加载主界面。

### 本版源码修复

- `package.json`: `dsh.client.inject=[]`；
- 官方客户端导出 `inject=[]`，不等待桌面 UI 席位；
- `apply(ctx)` 使用 `ctx.inject(["slots"], (scope) => ...)`，
  只在服务实际存在时注册官方二维码/手动绑定设置页；
- 侧栏在 `sidebarRight` 与 `sidebarRightTabs` 都具备时才注册；
- 组件异常被隔离，不让 QQ UI 导致整个 APP 无法打开；
- 官方 `/qqbot/im-qqbot/*` 路由、腾讯身份认证、凭据保存和 SDK
  均未修改。

### 手机上已卡死的恢复方法

1. 优先使用 DSH 的**救援模式或 rescue 配置**进入可用界面；
2. 在插件管理中**只禁用** `dsh-qqbot-q-mobile`，保留原配置
   和凭据。不要删除整个 `.dsh` 或清空应用数据；
3. 确认主页面恢复后，更新本插件到 v0.1.2，彻底重启
   DSH 引擎与 WebView；
4. 查看「设置 → QQ 机器人」及插件详情的「设置」按钮；
5. 若仍显示 `loading`，先回到 rescue/禁用，不要反复重装 DSH。
   反馈修复后的 Web boot 画面及脱敏日志；本版不会将 CI
   的模拟测试冒充成真实 Android UI 验收。

**保留退出路径：** 若 Android 宿主实际缺少 `slots`，本版应允许
DSH 先进入主界面，但 QQ 设置页可能要等服务可用后才出现。
不能保证任意 DSH 发行版自动具有官方 UI 所需的全部槽位。
