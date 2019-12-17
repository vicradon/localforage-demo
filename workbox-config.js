module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "pages/offline.html",
    "pages/404.html"
  ],
  "swDest": "public\\sw.js",
  "swSrc": "./src/sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};