const fs = require('fs');
require('dotenv').config();

const apiUrl = process.env.API_URL || process.env.apiUrl;

if (!apiUrl) {
  console.error('Missing environment variable: API_URL');
  process.exit(1);
}

const content = `export const environment = {
  production: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'},
  apiUrl: '${apiUrl}',
};
`;

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.ts', content);
fs.writeFileSync('./src/environments/environment.development.ts', content);

console.log('environment.ts generated successfully');
