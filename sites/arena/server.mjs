// A/B arena server. No dependencies.
//   node sites/arena/server.mjs            → http://localhost:8766/arena/
// Serves sites/ statically, plus:
//   GET  /api/next?mode=slot|page&slot=x   next blind pair
//   POST /api/vote                          append a vote to arena/votes.jsonl
//   GET  /api/stats                         Elo per variant, vote counts
// New variant files dropped into v3/08-vitals/slots/<slot>/ join the rotation automatically.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');   // sites/
const PAGE = path.join(ROOT, 'v3/08-vitals');
const VOTES = path.join(ROOT, 'arena/votes.jsonl');
const PORT = +process.env.PORT || 8766;
const SLOTS = ['hero', 'monday', 'dials', 'speech', 'cover', 'pause', 'audience', 'practitioner', 'consult'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.md': 'text/plain; charset=utf-8' };

const variants = slot => {
  const dir = path.join(PAGE, 'slots', slot);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /^\d+\.html$/.test(f))
    .map(f => ({ n: parseInt(f), mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => a.n - b.n);
};
const readVotes = () => fs.existsSync(VOTES)
  ? fs.readFileSync(VOTES, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
const key = side => side.slot ? `${side.slot}/${side.n}` : `preset/${side.preset}`;

function elo(votes) {
  const r = {}, games = {};
  for (const v of votes) {
    const a = key(v.left), b = key(v.right);
    r[a] ??= 1000; r[b] ??= 1000; games[a] = (games[a] || 0) + 1; games[b] = (games[b] || 0) + 1;
    if (v.choice === 'both_bad') continue;               // recorded, no rating change
    const s = v.choice === 'left' ? 1 : v.choice === 'right' ? 0 : 0.5;
    const e = 1 / (1 + 10 ** ((r[b] - r[a]) / 400));
    r[a] += 32 * (s - e); r[b] -= 32 * (s - e);
  }
  return Object.entries(r).map(([k, v]) => ({ key: k, elo: Math.round(v), games: games[k] }))
    .sort((x, y) => y.elo - x.elo);
}

// ponytail: brute-force over all pairs; fine for dozens of variants.
function next(mode, only) {
  const votes = readVotes();
  const seen = {};
  for (const v of votes) { const k = [key(v.left), key(v.right)].sort().join('|'); seen[k] = (seen[k] || 0) + 1; }
  const cands = [];
  if (mode === 'page') {
    const presets = Object.keys(JSON.parse(fs.readFileSync(path.join(PAGE, 'presets.json'))).presets);
    for (let i = 0; i < presets.length; i++) for (let j = i + 1; j < presets.length; j++)
      cands.push({ a: { preset: presets[i] }, b: { preset: presets[j] }, fresh: 0 });
  } else {
    const now = Date.now();
    for (const slot of only ? [only] : SLOTS) {
      const vs = variants(slot);
      for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) {
        const newest = Math.max(vs[i].mtime, vs[j].mtime);
        cands.push({ a: { slot, n: vs[i].n }, b: { slot, n: vs[j].n }, fresh: Math.max(0, 1 - (now - newest) / 36e5) }); // fresh within the hour
      }
    }
  }
  if (!cands.length) return null;
  // Least-compared pairs first, newly generated variants strongly preferred, jitter to break ties.
  const score = c => -(seen[[key(c.a), key(c.b)].sort().join('|')] || 0) * 2 + c.fresh * 3 + Math.random();
  const best = cands.reduce((x, y) => (score(y) > score(x) ? y : x));
  return Math.random() < 0.5 ? { left: best.a, right: best.b } : { left: best.b, right: best.a };
}

const send = (res, code, body, type = 'application/json') => {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/next') return send(res, 200, next(url.searchParams.get('mode'), url.searchParams.get('slot')));
  if (url.pathname === '/api/stats') { const v = readVotes(); return send(res, 200, { total: v.length, elo: elo(v) }); }
  if (url.pathname === '/api/vote' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 1e5) req.destroy(); });
    req.on('end', () => {
      try {
        const v = JSON.parse(body);
        if (!['left', 'right', 'tie', 'both_bad'].includes(v.choice) || !v.left || !v.right) return send(res, 400, { error: 'bad vote' });
        const rec = { ts: new Date().toISOString(), mode: v.mode, left: v.left, right: v.right, choice: v.choice,
          comment: String(v.comment || '').slice(0, 2000), view: v.view, pal: v.pal };
        fs.appendFileSync(VOTES, JSON.stringify(rec) + '\n');
        send(res, 200, { ok: true });
      } catch { send(res, 400, { error: 'bad json' }); }
    });
    return;
  }
  // Static files, confined to sites/ — plus the repo's feedback/ docs the gallery links to.
  const FEEDBACK = path.join(ROOT, '../feedback');
  const isFb = url.pathname.startsWith('/feedback/');
  const base = isFb ? FEEDBACK : ROOT;
  let p = path.normalize(path.join(base, decodeURIComponent(isFb ? url.pathname.slice('/feedback'.length) : url.pathname)));
  if (!p.startsWith(base)) return send(res, 403, 'forbidden', 'text/plain');
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) return send(res, 404, 'not found', 'text/plain');
  send(res, 200, fs.readFileSync(p), TYPES[path.extname(p)] || 'application/octet-stream');
}).listen(PORT, () => console.log(`arena on http://localhost:${PORT}/arena/`));
