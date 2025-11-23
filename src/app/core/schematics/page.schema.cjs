// generate-page.cjs
const { execSync } = require('child_process');

const args = process.argv.slice(2).join(' ');
const command = `ng generate component routes/pages/${args} --type page --skip-tests`;

console.log(`Ejecutando: ${command}`);
execSync(command, { stdio: 'inherit' });
