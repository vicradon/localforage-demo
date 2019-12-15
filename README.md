[![Netlify Status](https://api.netlify.com/api/v1/badges/892a13cf-09d2-496f-b54d-5e69b4b4b8f2/deploy-status)](https://app.netlify.com/sites/localforage-demo/deploys)

# Builiding an offline ready app using workbox CLI

This project was made with the sole extent of learning workbox and localforage. During the project build stage, I discovered new ways to develop and write code. I shared a few things I learnt along the way.

You can check out the app here https://localforage-demo.netlify.com/

## Using Workbox CLI
1. Use express or possibly parcel to run build processes
2. Using express means you need __copyfiles__, a library that does copying on the terminal
  Just do
  ```shell
    npm install copyfiles -D
  ```

  You have to run the copyfiles command to copy all files from your src to your build
  Add this to your scripts section of your package.json
  ```json
  "scripts": {
    "copy": "copyfiles -u 1 src/**/**/* src/**/* src/* build",
    "build": "npm run copy && workbox injectManifest workbox-config.js",
    "start": "node server.js"
  },
  ```
3. Then call the workbox wizard command with a tag, `--injectManifest`
  You should have the CLI installed. If you don't, use 
  ```shell
    npm install --global workbox-cli
  ```
  
  ```shell
    workbox wizard --injectManifest
  ```
4. This would create a new service worker in the build dir.
5. Then, running the command `workbox injectManifest workbox-config.js` would add the neccessary code to the service worker in the build directory for what is to be cached based on the config
6. You can modify the config to prevent workbox from caching everything on your website. The initial config we set would cache everything on the website.

