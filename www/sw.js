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
    "revision": "accc1f4f21a30a26325ebc8062a513e3"
  },
  {
    "url": "build/app/app.6mcnx1wv.js",
    "revision": "e8c08d5f559586d17ac6b07523a0cbe6"
  },
  {
    "url": "build/app/app.pqodiy5g.js",
    "revision": "a6a383218e46515c6c6c30da766f7030"
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
    "url": "build/app/wegb9yaj.entry.js",
    "revision": "59e801f72689af221872c62065a91aa5"
  },
  {
    "url": "build/app/wegb9yaj.sc.entry.js",
    "revision": "941182e2b9fa4a21da655c04610af070"
  },
  {
    "url": "build/app/y9ygxct6.entry.js",
    "revision": "63d6205c2b7a5c247c313220d4147dc7"
  },
  {
    "url": "build/app/y9ygxct6.sc.entry.js",
    "revision": "9091a812c1f595194abda88e89bbbac1"
  },
  {
    "url": "index.html",
    "revision": "64168deec578b48d43a7451c3110bd47"
  },
  {
    "url": "manifest.json",
    "revision": "9e7474bd130a8ecda9b039f905041492"
  }
]);