const { execSync } = require('child_process');

const args = process.argv.slice(2).join(' ');
const command = `ng generate service core/services/${args} --skip-tests --type service`;

console.log(`Ejecutando: ${command}`);
execSync(command, { stdio: 'inherit' });
