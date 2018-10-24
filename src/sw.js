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

self.workbox.precaching.precacheAndRoute([]);