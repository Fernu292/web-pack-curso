const fs = require('fs');

//Creando script para servidor, que pueda usar variables de entorno
fs.writeFileSync('./env', `API=${process.env.API}\n`);