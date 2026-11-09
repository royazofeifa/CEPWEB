const fs = require('node:fs');
const path = require('node:path');
const base = '/CEPWEB';
const source = path.join(__dirname, 'dist');
const target = path.join(__dirname, '_site');
fs.cpSync(source, target, { recursive: true });
let pages = 0;
function prepare(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) prepare(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8').replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
      fs.writeFileSync(file, html);
      pages++;
      for (const match of html.matchAll(/(?:href|src)="(\/CEPWEB\/[^"?#]*)/g)) {
        const local = path.join(target, match[1].slice(base.length));
        if (!fs.existsSync(local)) throw new Error(`Missing asset or page: ${match[1]}`);
      }
    }
  }
}
prepare(target);
fs.writeFileSync(path.join(target, '.nojekyll'), '');
console.log(`Prepared ${pages} HTML pages for https://royazofeifa.github.io${base}/`);
