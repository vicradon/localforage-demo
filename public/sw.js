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
    "revision": "61b701a0c2195d3b5002999e8c5d622b"
  },
  {
    "url": "js/index.js",
    "revision": "a2977a76d591245c6836c2004d1f4d84"
  },
  {
    "url": "js/localforage.min.js",
    "revision": "862e9e065bcfe3944871cbf66229b3fd"
  },
  {
    "url": "js/request.js",
    "revision": "b2dfb6f8b1a4376a03eeb530341936a0"
  },
  {
    "url": "pages/404.html",
    "revision": "e3dbbe1504e95464c2abd3a043202520"
  },
  {
    "url": "pages/offline.html",
    "revision": "ae875ead9473b235efec4165e86e7fc5"
  },
  {
    "url": "request.html",
    "revision": "8e9bf63a4d02dfe2891c60d5c2661312"
  }
]);


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