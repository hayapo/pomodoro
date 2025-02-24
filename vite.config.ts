import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';
	return {
		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : undefined,
		},
		plugins: [
			remix({
				future: {
					v3_fetcherPersist: true,
					v3_relativeSplatPath: true,
					v3_throwAbortReason: true,
					v3_singleFetch: true,
					v3_lazyRouteDiscovery: true,
				},
			}),
			tsconfigPaths(),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./app"),
			}
		}
	}
});
