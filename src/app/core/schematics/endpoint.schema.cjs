const { spawn } = require('child_process');

// lanzar json-server
function runJsonServer(file, port) {
  console.log(`Iniciando json-server para ${file} en el puerto ${port}...`);

  const server = spawn('json-server', ['--watch', file, '--port', port], {
    stdio: 'inherit',
    shell: true,
  });

  server.on('close', (code) => {
    console.log(`json-server para ${file} terminó con código ${code}`);
  });
}

// Iniciar json-server
runJsonServer('src/app/data/db/gallery.json', 3001);
runJsonServer('src/app/data/db/destacados.json', 3005);
runJsonServer('src/app/data/db/blog.json', 3009);
