const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const bundle = path.join(root, 'assets', 'main-BsKo9vWW.js');
const backup = path.join(root, 'main-BsKo9vWW.original.js');
if (!fs.existsSync(backup)) fs.copyFileSync(bundle, backup);
let source = fs.readFileSync(backup, 'utf8');

function replaceOnce(before, after) {
  const first = source.indexOf(before);
  if (first < 0 || source.indexOf(before, first + 1) >= 0) {
    throw new Error(`Expected one occurrence: ${before.slice(0, 80)}`);
  }
  source = source.slice(0, first) + after + source.slice(first + before.length);
}

replaceOnce('<span>看完广告再闯一次</span></button><p id="death-ad-note" class="leyuan-ad-note" role="status" aria-live="polite"></p>', '<span>重闯本关</span></button>');
replaceOnce('自动：死亡等待时切换；复活后恢复战斗音乐', '自动：死亡等待时切换；重闯后恢复战斗音乐');
replaceOnce('this.model.retry(),this.clearInputs(),this.handleEvents()', 'this.model.retry(),this.save(),this.clearInputs(),this.handleEvents()');
replaceOnce('t.querySelector("span").textContent="看完广告再闯一次",u("#death-ad-note").textContent="观看完成后，再点击按钮重闯本关。",', 't.querySelector("span").textContent="重闯本关",');

const start = source.indexOf('async function Pa(){');
const end = source.indexOf('}export{Ia as entryReady};', start);
if (start < 0 || end < 0) throw new Error('Retry handler not found');
source = source.slice(0, start) + 'function Pa(){if(g!=="defeat"||N)return;Z.enter(),M(""),ot(),w.retry(),I()' + source.slice(end);

fs.writeFileSync(bundle, source);
console.log('Death retry now restarts the current chapter without an ad.');
