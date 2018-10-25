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
    "revision": "0496532e5d0f8fa9996dac3401cd0491"
  },
  {
    "url": "build/app/app.avsaqkhk.js",
    "revision": "02f4804248641ce61670562443aa4454"
  },
  {
    "url": "build/app/app.m0rcqbrb.js",
    "revision": "334442401adb7a6caaa5de2b06ab0bbb"
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
    "url": "build/app/fjbqyxiy.entry.js",
    "revision": "7e36ea617232e94a97732417611ccb7b"
  },
  {
    "url": "build/app/fjbqyxiy.sc.entry.js",
    "revision": "390d0cf26672364fd7e736682df19849"
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
    "revision": "8a1c1182fbe1647bce37f5a92afff7be"
  },
  {
    "url": "manifest.json",
    "revision": "9e7474bd130a8ecda9b039f905041492"
  }
]);