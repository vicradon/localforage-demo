importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "css/keyframes.css",
    "revision": "02377c5dc1d27b4516c8a79828977a17"
  },
  {
    "url": "css/style.css",
    "revision": "5dde884d5e9dece5364927d87be71b73"
  },
  {
    "url": "index.html",
    "revision": "f679d3a00258507926c39248112e48bd"
  },
  {
    "url": "icons/favicon.ico",
    "revision": "7575174179418593302e37022e48a9cf"
  },
  {
    "url": "pages/offline.html",
    "revision": "36205f13735aff01a19d308f4a046386"
  },
  {
    "url": "pages/404.html",
    "revision": "e3dbbe1504e95464c2abd3a043202520"
  }
]);


  workbox.strategies.staleWhileRevalidate({
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