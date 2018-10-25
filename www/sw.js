importScripts('workbox-v3.4.1/workbox-sw.js')
if (self.workbox) {
  console.log('Workbox loaded');
} else {
  console.log('Workbox failed to load');
}
self.workbox.skipWaiting();
self.workbox.clientsClaim();

/*self.workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  self.workbox.strategies.networkFirst()
);

self.workbox.routing.registerRoute(
  /.*\.css/,
  self.workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);*/

self.workbox.precaching.precacheAndRoute([
  {
    "url": "build/app.css",
    "revision": "7ada6021f5ceaa2bd6f85fcfce946372"
  },
  {
    "url": "build/app.js",
    "revision": "4ff6d39a320e3f26e56fc4ad28cb9272"
  },
  {
    "url": "build/app/1nholcjs.entry.js",
    "revision": "d6784e94225243c3adc93b5e4785f2a1"
  },
  {
    "url": "build/app/1nholcjs.sc.entry.js",
    "revision": "b450dfbd665ed05619544697b9b55201"
  },
  {
    "url": "build/app/app.ebtbvlf7.js",
    "revision": "781b5bbcb17b8dce952aebd68ea54d3c"
  },
  {
    "url": "build/app/app.x3i4rb4y.js",
    "revision": "5f78b8adbe1851d65d35e40a2de11e29"
  },
  {
    "url": "build/app/blg1m9fd.entry.js",
    "revision": "04b83533d143068c2600f2a4065cb224"
  },
  {
    "url": "build/app/blg1m9fd.sc.entry.js",
    "revision": "a466222ee0785e090e2d4083c9fe810d"
  },
  {
    "url": "build/app/xs76pxz3.entry.js",
    "revision": "c52efaa71cf7c4867eb8b157f1804174"
  },
  {
    "url": "build/app/xs76pxz3.sc.entry.js",
    "revision": "fa88f7f3f93b77a9c48deff3dc4b9b3e"
  },
  {
    "url": "index.html",
    "revision": "4ac64d36e46036730b71b0a5acdc43a2"
  },
  {
    "url": "manifest.json",
    "revision": "9e7474bd130a8ecda9b039f905041492"
  }
]);