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
    "revision": "e5490df38be72caf51de4ab790e794e2"
  },
  {
    "url": "build/app/app.ecmgvq5d.js",
    "revision": "79c306550e431dd77659f854870f52d6"
  },
  {
    "url": "build/app/app.iwyerpk5.js",
    "revision": "216604ae993fe73b01e92b7b945e5295"
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
    "url": "build/app/eju5grxq.entry.js",
    "revision": "7a3bb91915ead15590df45f542d933bb"
  },
  {
    "url": "build/app/eju5grxq.sc.entry.js",
    "revision": "5bbf0aff81b56a06eddab7b336917263"
  },
  {
    "url": "build/app/fnhcyi53.entry.js",
    "revision": "1671c2608e77e67c513891dec948a453"
  },
  {
    "url": "build/app/fnhcyi53.sc.entry.js",
    "revision": "b60190ee0c0eca0e00ba6a112719c866"
  },
  {
    "url": "index.html",
    "revision": "a8b61f89f9c250653d70e7011ab2a6f2"
  },
  {
    "url": "manifest.json",
    "revision": "9e7474bd130a8ecda9b039f905041492"
  }
]);