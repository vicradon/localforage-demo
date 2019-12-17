importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);


  workbox.strategies.cacheFirst({
    cacheName: 'cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 365 * 30 * 24 * 60 * 60, // 1 year
      })
    ]
  });
  
  this.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
      event.respondWith(
        fetch(event.request.url).catch(error => {
          return caches.match('pages/offline.html');
        })
      );
    }
    else {
      event.respondWith(caches.match(event.request)
        .then(function (response) {
          return response || fetch(event.request);
        })
      );
    }
  });


} else {
  console.log(`Boo! Workbox didn't load 😬`);
}