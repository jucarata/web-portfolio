import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jucarata.github.io",
  base: import.meta.env.DEV ? undefined : "/web-portfolio",
  server: { port: 4321, host: "127.0.0.1" },
  devToolbar: { enabled: false },
});
