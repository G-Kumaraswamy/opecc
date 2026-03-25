// ─── .env Loader for Vanilla JS ───
// Fetches and parses the .env file at runtime

const ENV = {};
let loaded = false;

async function loadEnv() {
  if (loaded) return ENV;
  try {
    const response = await fetch('/.env');
    if (!response.ok) throw new Error('.env not found');
    const text = await response.text();
    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) return;
      const key = line.substring(0, eqIndex).trim();
      const value = line.substring(eqIndex + 1).trim();
      ENV[key] = value;
    });
    loaded = true;
  } catch (e) {
    console.warn('Could not load .env file:', e.message);
  }
  return ENV;
}

// Load immediately
const envReady = loadEnv();

export { ENV, envReady };
export default ENV;
