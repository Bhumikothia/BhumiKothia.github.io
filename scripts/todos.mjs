// Lists every TODO left in the site's content and code:  npm run todos
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const roots = ['src'];
const found = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (/\.(md|ya?ml|astro|ts)$/.test(entry.name)) {
      const lines = (await readFile(p, 'utf8')).split('\n');
      lines.forEach((line, i) => {
        if (/TODO:/.test(line) && !p.endsWith('Todo.astro') && !/Todo text=\{/.test(line)) {
          found.push(`${relative('.', p)}:${i + 1}  ${line.trim().replace(/^(#|\/\/|<!--)\s*/, '')}`);
        }
      });
    }
  }
}
for (const r of roots) await walk(r);
console.log(found.length ? found.join('\n') : 'No TODOs left.');
console.log(`\n${found.length} TODO(s). See also TODO.md for items that need Bhumi's input.`);
