importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);


  const htmlHandler = workbox.strategies.cacheFirst({
    cacheName: 'cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 365 * 30 * 24 * 60 * 60, // 1 year
      })
    ]
  });

  workbox.routing.registerRoute(/\.html/, args => {
    return htmlHandler.handle(args).then(response => {
      if (!response) {
        return caches.match('pages/offline.html');
      } else if (response.status === 404) {
        return caches.match('pages/404.html');
      }
      return response;
    });
  });
  

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}