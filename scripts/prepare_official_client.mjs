#!/usr/bin/env node
/**
 * Q Mobile v0.1.1 official UI adapter (NOT an alternative QQ client).
 * Original Tencent Connect UI: @tencent-connect/dsh-qqbot@0.5.5,
 * © 2026 Tencent Connect, MIT, LICENSE preserved in the packed TGZ.
 *
 * Three minimal changes ONLY: module loader package id, plugin detail
 * subject package match, and allowing settings panel without optional
 * desktop sidebar services. All official login, CSRF, binding REST routes,
 * credential persistence, QR display and bot protocol code stays upstream.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const official=require('@tencent-connect/dsh-qqbot/package.json');
if(official.name!=='@tencent-connect/dsh-qqbot'||official.version!=='0.5.5')
  throw Error('OFFICIAL_CLIENT_PIN_MISMATCH');
let code=fs.readFileSync('node_modules/@tencent-connect/dsh-qqbot/lib/client.js','utf8');
function one(before,after,label){
  const n=code.split(before).length-1;
  if(n!==1)throw Error(label+'_UNEXPECTED_COUNT_'+n);
  code=code.replace(before,after);
}
one('\tid: "@tencent-connect/dsh-qqbot",',
  '\tid: "dsh-qqbot-q-mobile",','CLIENT_MODULE_ID');
one('const PACKAGE_NAME = "@tencent-connect/dsh-qqbot";',
  'const PACKAGE_NAME = "dsh-qqbot-q-mobile";','PLUGINS_DETAIL_MATCH');
one('const inject = [\n\t\t\t"slots",\n\t\t\t"sidebarRight",\n\t\t\t"sidebarRightTabs"\n\t\t];',
  'const inject = ["slots"];','MOBILE_OPTIONAL_SIDEBARS');
code=code.replace(/\n\/\/# sourceMappingURL=client\.js\.map\s*$/,'\n');
for(const marker of ['/qqbot/im-qqbot/bind','settings.section',
  'plugins.detail.actions','sidebar.right.pane.tab','"手动填写"']){
  if(!code.includes(marker))throw Error('OFFICIAL_UI_MARKER_MISSING_'+marker);
}
if(code.includes('@tencent-connect/dsh-qqbot'))
  throw Error('UNPATCHED_CLIENT_PACKAGE_REF');
const notice='/*\n * Q Mobile v0.1.1 — derived from official UI,\n * @tencent-connect/dsh-qqbot@0.5.5, Copyright (c) 2026 Tencent Connect.\n * MIT; see THIRD_PARTY_LICENSE_TENCENT.txt. Unofficial Android adaptation.\n * Original QQ authentication, routes and SDK unmodified.\n */\n';
fs.mkdirSync('lib',{recursive:true});
fs.writeFileSync('lib/client.js',notice+code,'utf8');
const license=fs.readFileSync('node_modules/@tencent-connect/dsh-qqbot/LICENSE','utf8');
if(!license.includes('Copyright (c) 2026 Tencent Connect')||
   !license.includes('MIT License'))throw Error('OFFICIAL_LICENSE_CHANGED');
fs.writeFileSync('THIRD_PARTY_LICENSE_TENCENT.txt',license,'utf8');
console.log('OFFICIAL_CLIENT_UI=INCLUDED');
console.log('MOBILE_SETTINGS_WITHOUT_DESKTOP_SIDEBAR=SUPPORTED_BY_ADAPTED_CLIENT');
console.log('OFFICIAL_AUTH_AND_QQ_API=UNMODIFIED');
console.log('ANDROID_UI_E2E=NOT_YET_VERIFIED');
