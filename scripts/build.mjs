import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
const destination = new URL('../dist/', import.meta.url);
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const file of ['index.html', 'src', 'assets']) await cp(new URL(`../${file}`, import.meta.url), new URL(file, destination), { recursive: true });
await writeFile(new URL('.nojekyll', destination), '');
console.log('Built static site in dist/. No runtime dependencies or secrets.');
