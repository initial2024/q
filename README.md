# Q Mobile · DSH Android QQ Bot · v0.1.0

> **非官方二次创作 / Unofficial adapter**。官方核心始终来自
> [Tencent Connect / dsh-qqbot](https://github.com/tencent-connect/dsh-qqbot)
> 的 **0.5.5** 正式 npm 包。Tencent Connect 保留其源代码和 SDK 权利。
> 项目没有替换 QQ Bot 官方协议，也不保证账号绝对安全。

## 直接安装（Android DSH 插件页）

```text
https://raw.githubusercontent.com/initial2024/q/main/dist/dsh-qqbot-q-mobile-0.1.0.tgz
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
2. 优先尝试官方插件的 QQ Bot 设置面板；**本外壳未改造官方客户端
   UI，不能保证在 Android DSH 一定显示**。
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

配置文件为 `cordis.patch.yml`；此文件与官方 `im-qqbot` 行 ID
兼容，但包名为 `dsh-qqbot-q-mobile`。官方 0.5.5 内置客户端
绑定面板以**官方包名**识别当前插件详情页，所以本外壳
**不保证官方设置按钮在本包详情页显示**；本阶段的手机可用性
以手工本地 AppID/Secret 配置为主，不伪称已经实机扫码验收。

## 测试与发布边界

GitHub Actions 检查官方 npm 0.5.5 精确依赖、插件代理入口、
安全默认值、代码与包完整性及 `.tgz` 发布。真实手机 QQ 连接、
WebSocket 断线重连、后台保活、聊天上下文、视觉发送、扫码
界面仍需要使用者的 Android DSH 环境验证，**不能从 CI 推断**。

## 原始出处、许可与免责

详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)；
原创软件核心版权所有 Tencent Connect、MIT 许可。
Q Mobile 不是官方发布，遵守 QQ 开放平台协议与使用限制。
