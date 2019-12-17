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
    "url": "js/index.js",
    "revision": "a2977a76d591245c6836c2004d1f4d84"
  },
  {
    "url": "js/request.js",
    "revision": "b2dfb6f8b1a4376a03eeb530341936a0"
  },
  {
    "url": "index.html",
    "revision": "f679d3a00258507926c39248112e48bd"
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

  // this.addEventListener('activate', () => {
  //   workbox.precaching.cleanupOutdatedCache();
  // })
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}