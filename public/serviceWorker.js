const staticCacheName = "version-v2";
// const assets = [
//   "/",
//   "./index.html",
//   "./static",
//   "./static/css/main.3e6cf5ff.chunk.css",
//   "./static/css/main.3e6cf5ff.chunk.css.map",
//   "./static/js/2.cb426b82.chunk.js",
//   "./static/js/2.cb426b82.chunk.js.LICENSE.txt",
//   "./static/js/2.cb426b82.chunk.js.map",
//   "./static/js/main.5ede2531.chunk.js",
//   "./static/js/main.5ede2531.chunk.js.map",
//   "./static/js/runtime-main.bccd1c6d.js",
//   "./static/js/runtime-main.bccd1c6d.js.map",
//   "./static/media/undraw_Stability_ball_b4ia.4cb18637.svg",
// ];

const assets = ["/", "./index.html", "./static"];

self = this;

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
  //   console.log("Fetch event", event);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
