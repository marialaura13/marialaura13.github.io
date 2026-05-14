// Service Worker para PWA com suporte iOS
const CACHE_NAME = 'maria-laura-portfolio-v1';
const STATIC_CACHE = 'maria-laura-static-v1';
const DYNAMIC_CACHE = 'maria-laura-dynamic-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      }),
      caches.open(STATIC_CACHE),
      caches.open(DYNAMIC_CACHE),
    ])
  );
  // Force activation imediatamente
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Limpa caches antigos
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE) {
            console.log('Cache antigo deletado:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Força o SW a assumir o controle imediatamente
  self.clients.claim();
});

// Fetch event - Stale while revalidate com fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external resources (CDN, etc)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Stale while revalidate strategy
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then((cache) => {
      return cache.match(request).then((response) => {
        // Retorna cache imediatamente
        const fetchPromise = fetch(request).then((networkResponse) => {
          // Atualiza cache com nova versão
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback para versão em cache ou offline page
          return response || caches.match('/index.html') || new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:50px auto;padding:20px;color:#333;}h1{color:#00bfff;}</style></head><body><h1>Offline</h1><p>Sem conexão disponível. Por favor, verifique sua conexão de internet.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        });

        return response || fetchPromise;
      });
    })
  );
});

// Background sync para iOS (fallback)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-contact-form') {
    event.waitUntil(Promise.resolve());
  }
});

// Message handling para comunicação com app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
