//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BGeK4duu.js
var tsrStartManifest = () => ({
  routes: {
    __root__: {
      filePath: "/app/applet/src/routes/__root.tsx",
      children: ["/", "/admin"],
      preloads: ["/assets/index-BYAlTd8L.js", "/assets/rolldown-runtime-CbXtAM7H.js"],
      scripts: [
        {
          attrs: {
            type: "module",
            async: !0,
            src: "/assets/index-BYAlTd8L.js",
          },
        },
      ],
    },
    "/": {
      filePath: "/app/applet/src/routes/index.tsx",
      children: void 0,
      preloads: ["/assets/routes-DEZG_6kW.js", "/assets/AdminAnalyticsView-RwVR7dcz.js"],
    },
    "/admin": {
      filePath: "/app/applet/src/routes/admin.tsx",
      children: void 0,
      preloads: ["/assets/admin-DS7qebMM.js", "/assets/AdminAnalyticsView-RwVR7dcz.js"],
    },
  },
});
//#endregion
export { tsrStartManifest };
