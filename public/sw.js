const CACHE_NAME = "e-rapor-ulil-albab-v1";

const STATIC_CACHE = [
  "/",
  "/manifest.json",
  "/logo.png"
];

// =========================================================
// INSTALL
// =========================================================

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );

  self.skipWaiting();
});

// =========================================================
// ACTIVATE
// =========================================================

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

// =========================================================
// FETCH
// =========================================================

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Hanya tangani request GET
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Jangan cache API
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Jangan cache Next.js development/HMR
  if (
    url.pathname.startsWith("/_next/webpack") ||
    url.pathname.includes("hot-update")
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Jangan cache response yang tidak valid
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === "opaque"
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // Fallback halaman utama jika offline
          if (request.mode === "navigate") {
            return caches.match("/");
          }

          return new Response("Offline", {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        });
    })
  );
});