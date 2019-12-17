module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.css",
    "js/index.js",
    "js/request.js",
    "index.html",
    // "icons/favicon.ico",
    "pages/offline.html",
    "pages/404.html"
  ],
  "swDest": "public\\sw.js",
  "swSrc": "./src/sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};