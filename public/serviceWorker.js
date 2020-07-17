const staticCacheName = "version-v2";
const assets = ["/", "./index.html", "./static"];

// self = this;

// Install SW
self.addEventListener("install", (event) => {
  console.log("Service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets");
      return cache.addAll(assets);
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  console.log("Sevice worker has been activated");
  //   const cacheWhiteList = [];
  //   cacheWhiteList.push(cacheName);

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  console.log("Fetch event", event);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
