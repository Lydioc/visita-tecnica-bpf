/* Service worker — cache-first de todos os arquivos do app (funciona 100% offline).
 *
 * VERSION: no deploy automático (GitHub Actions) o valor __BUILD__ é trocado pelo hash do commit,
 * então cada publicação gera uma versão nova. Se publicar SEM o workflow, troque este número
 * a cada alteração (ex.: '2', '3'...), senão os celulares continuam com os arquivos antigos.
 */
const VERSION = '__BUILD__';
const CACHE = 'visita-bpf-' + VERSION;

const ASSETS = [
  './',
  'index.html',
  'app.js',
  'fonts.css',
  'manifest.webmanifest',
  'fonts/BarlowCondensed-500.woff2',
  'fonts/BarlowCondensed-600.woff2',
  'fonts/BarlowCondensed-700.woff2',
  'fonts/IBMPlexSans-400.woff2',
  'fonts/IBMPlexSans-400-italic.woff2',
  'fonts/IBMPlexSans-500.woff2',
  'fonts/IBMPlexSans-600.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

// Instala em segundo plano; NÃO ativa sozinho (a página mostra "Nova versão disponível").
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(async u => {
      const res = await fetch(new Request(u, { cache: 'reload' }));   // ignora o cache HTTP do servidor
      if (!res.ok) throw new Error('Falha ao baixar ' + u + ' (' + res.status + ')');
      await cache.put(u, res);
    }));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (k.startsWith('visita-bpf-') && k !== CACHE) await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

// A página pede a ativação só depois de salvar os dados.
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch (_) {
      if (req.mode === 'navigate') {
        const home = await cache.match('index.html');
        if (home) return home;
      }
      return Response.error();
    }
  })());
});
