require('dotenv').config();

function requireVars(...vars) {
  vars.forEach(v => {
    if (!process.env[v]) {
      throw new Error(`❌ Missing required env var: ${v}`);
    }
  });
}

module.exports = {
  requireVars,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 8001,
  APP_SECRET: process.env.APP_SECRET || 'dev-secret-change-me'
};
