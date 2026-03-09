
const fs = require('fs');

const html = fs.readFileSync('src/index.html', 'utf-8');
const css = fs.readFileSync('src/style.css', 'utf-8');
const js = fs.readFileSync('src/script.js', 'utf-8');
const data = fs.readFileSync('src/data.json', 'utf-8');

const finalJs = `
const data = ${data};
${js.replace("fetch('data.json').then(response => response.json())", "Promise.resolve(data)")}
`;

const finalHtml = html
    .replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
    .replace('<script src="script.js"></script>', `<script>${finalJs}</script>`);

fs.writeFileSync('dist/index.html', finalHtml);

console.log('Website built successfully! Open dist/index.html in your browser.');
