import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const file=readFileSync(new URL('../lib/client.js',import.meta.url),'utf8');
const manifest=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
test('the official 0.5.5 QR/settings frontend is bundled, remapped and declared',()=>{
  assert.equal(manifest.version,'0.1.1');
  assert.equal(manifest.exports['./client'],'./lib/client.js');
  assert.equal(manifest.dsh.client.platform,'web');
  assert.ok(manifest.files.includes('lib/client.js'));
  assert.ok(manifest.files.includes('THIRD_PARTY_LICENSE_TENCENT.txt'));
  assert.match(file,/id: "dsh-qqbot-q-mobile"/);
  assert.match(file,/const PACKAGE_NAME = "dsh-qqbot-q-mobile"/);
  assert.match(file,/const inject = \["slots"\]/);
  assert.match(file,/\/qqbot\/im-qqbot\/bind/);
  assert.match(file,/\/qqbot\/im-qqbot\/bind\/manual/);
  assert.match(file,/settings\.section/);
  assert.match(file,/plugins\.detail\.actions/);
  assert.match(file,/QQ 机器人/);
  assert.match(file,/手动填写/);
  assert.ok(!file.includes('window.__ModuleLoader__.load({\n\tid: "@tencent-connect/dsh-qqbot"'));
});
test('real official UI registers Android settings with slots alone',()=>{
  let loaderId,client;
  const window={
    __ModuleLoader__:{load(module){
      loaderId=module.id;
      client=module.factory(name=>{
        if(name==='react')return {};
        throw Error('UNEXPECTED_CLIENT_DEPENDENCY_'+name);
      });
    }}
  };
  // The official UI bundle must remain browser-loadable even when the
  // desktop sidebar services are absent. No DSH agents/auth/network mocked.
  runInNewContext(file,{window,console,setTimeout,clearTimeout});
  assert.equal(loaderId,'dsh-qqbot-q-mobile');
  assert.equal(client.name,'im-qqbot-client');
  assert.deepEqual(Array.from(client.inject),['slots']);
  const registered=[];
  const slots={
    inject(name,cb){const off=cb();return typeof off==='function'?off:()=>{};},
    register(spec,view){registered.push({spec,view});return ()=>{};}
  };
  const ctx={
    slots,
    effect(){}, // host disposal API
    inject(_deps,fn){fn({slots,layout:{selectPanel(){}}});}
  };
  client.apply(ctx);
  const settings=registered.find(x=>x.spec.name==='settings.section');
  assert.equal(settings.spec.id,'qqbot');
  assert.equal(settings.spec.label,'QQ 机器人');
  assert.equal(typeof settings.view,'function');
  assert.ok(registered.some(x=>x.spec.name==='plugins.detail.actions'));
  assert.ok(registered.some(x=>x.spec.name==='main'));
  assert.ok(registered.some(x=>x.spec.name==='sidebar.panellist'));
});
test('copyright and original license preserved in built distribution',()=>{
  const license=readFileSync(new URL('../THIRD_PARTY_LICENSE_TENCENT.txt',import.meta.url),'utf8');
  assert.match(license,/Copyright \(c\) 2026 Tencent Connect/);
  assert.match(license,/MIT License/);
  const notice=readFileSync(new URL('../THIRD_PARTY_NOTICES.md',import.meta.url),'utf8');
  assert.match(notice,/非官方/);
  assert.match(notice,/v0.1.1/);
});
