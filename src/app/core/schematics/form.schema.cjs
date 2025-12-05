// generate-page.cjs
const { execSync } = require('child_process');

const args = process.argv.slice(2).join(' ');
const command = `ng generate component shared/forms/${args} --type form --skip-tests`;

console.log(`Ejecutando: ${command}`);
execSync(command, { stdio: 'inherit' });
