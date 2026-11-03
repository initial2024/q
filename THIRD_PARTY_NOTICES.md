# 官方来源、二次创作与风险声明

## 官方实现（必须保留的原始版权）

- 官方项目：https://github.com/tencent-connect/dsh-qqbot
- 官方 npm 包：`@tencent-connect/dsh-qqbot@0.5.5`
- 官方标签：https://github.com/tencent-connect/dsh-qqbot/releases/tag/0.5.5
- 标签提交：`a4a01fa9f122e187733fbd990c3d6a41e4d7e538`
- 官方 MIT 版权所有者：**Copyright (c) 2026 Tencent Connect**。
- 官方 LICENSE：https://github.com/tencent-connect/dsh-qqbot/blob/0.5.5/LICENSE
- 连接方式与协议由官方 SDK/插件实现；本仓库未复制、替换或破解。

官方依赖为运行时的 **exact pinned npm dependency**。安装时 npm/pnpm
会从 npm 仓库下载官方包及其声明的依赖。Q Mobile TGZ 内没有官方插件
源码副本；安装依赖之后官方包自己的 MIT LICENSE 仍随官方包保留。

## 本仓库的独立二创（initial2024/q）

1. `dsh-qqbot-q-mobile` 是 Android DSH 的非官方安装外壳。
2. 只导出/委托官方 Cordis `name`/`inject`/`Config`/`apply`；
   **不拦截 QQ 帐号凭据、消息或私有 API，不实现自定义 QQ 协议**。
3. 额外提供默认拒绝的私聊白名单、默认禁用的群聊和富媒体开关。
4. 额外提供不联网、不显示密钥的手机运行环境诊断脚本。
5. 提供 Android 单机手工绑定指引和 CI 测试；不修改安装包签名。

## 免责声明与风险边界

本项目为**非官方二次创作**，不是腾讯、Tencent Connect 或 DSH 官方版本，
无官方认证或认可。使用官方 Bot 平台、凭据和 SDK 不代表一定不封号；
仍需遵守 QQ 平台规则、速率限制、机器人权限和相关法律法规。**不保证
账户绝对安全、不提供规避风控或自动绕过权限的能力。**

凭据仅应填写在用户自己的 DSH 配置或官方可信授权流程中；严禁将
AppSecret、令牌、二维码票据、QQ 数据写入 GitHub、提交日志或可公开文件。

本项目按现状提供，不提供任何担保。Android 真机扫码界面、后台连接保活、
具体宿主 Cordis UI 席位是否兼容均需真实设备验证。安装成功不等于机器人
已经与 QQ 平台连接成功。
