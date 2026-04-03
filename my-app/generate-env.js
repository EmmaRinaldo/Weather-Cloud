const fs = require('fs');
require('dotenv').config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const apiUrl = process.env.API_URL;

if (!googleClientId || !apiUrl) {
  console.error('Missing environment variables: GOOGLE_CLIENT_ID and/or API_URL');
  process.exit(1);
}

const content = `export const environment = {
  production: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'},
  googleClientId: '${googleClientId}',
  apiUrl: '${apiUrl}',
};
`;

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.ts', content);
fs.writeFileSync('./src/environments/environment.development.ts', content);

console.log('environment.ts generated successfully');
