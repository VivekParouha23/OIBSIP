// Front-end demo only: real apps must hash and verify passwords on a server.
const USERS = 'oibsip_users', SESSION = 'oibsip_session';
const getUsers = () => { try { return JSON.parse(localStorage.getItem(USERS)) || {}; } catch { return {}; } };

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
const randomSalt = () => Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, '0')).join('');

async function register(email, password) {
  email = email.trim().toLowerCase();
  if (!email || !password) return 'Please fill in both fields.';
  if (password.length < 8 || !/\d/.test(password)) return 'Password needs at least 8 characters and 1 number.';
  const users = getUsers();
  if (users[email]) return 'An account with this email already exists.';
  const salt = randomSalt();
  users[email] = { salt, hash: await sha256(salt + password) };
  localStorage.setItem(USERS, JSON.stringify(users));
  return null;
}

async function login(email, password) {
  email = email.trim().toLowerCase();
  if (!email || !password) return 'Please fill in both fields.';
  const u = getUsers()[email];
  if (!u || (await sha256(u.salt + password)) !== u.hash) return 'Incorrect email or password.';
  localStorage.setItem(SESSION, email);
  return null;
}
const currentUser = () => localStorage.getItem(SESSION);
const logout = () => { localStorage.removeItem(SESSION); location.href = 'login.html'; };
