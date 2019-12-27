console.log("service worker started");

const CACHE_NAME = "jp.lpg.space-v1";
const urlsToCache = [
  "/",
  "/hiragana/",
  "/katakana/",
  "/mtg/",
  "/style.css",
  "/index.js",
];

async function cacheBaseUrls() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
}

async function clearCache() {
  await caches.delete(CACHE_NAME);
}

async function handleFetch(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.ok && !response.redirected) {
      await cache.put(request.url, response.clone());
    }

    return response;
  } catch (err) {
    return cache.match(request);
  }
}

self.addEventListener("fetch", event => {
  event.respondWith(handleFetch(event.request));
});

self.addEventListener("activate", event => {
  console.log("activate");
  event.waitUntil(clearCache().then(cacheBaseUrls));
});