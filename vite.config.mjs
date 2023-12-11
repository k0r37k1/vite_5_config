import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Sets the project root directory
  root: resolve(__dirname, "src"),

  // Configures development environment
  dev: {
    // The port for the development server to listen on
    server: {
      port: 5000,

      // Whether to open the browser automatically when starting development
      open: true,

      // Enables hot module replacement (HMR) for rapid development
      hot: true,
    },

    // Configures Rollup options for the development build
    rollupOptions: {
      // Sets the output file names for entry chunks
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name]-[hash].js",

        // Defines a function to generate asset file names
        assetFileNames: async (asset) => {
          if (asset.name.endsWith(".js")) {
            return path.join("assets", "scripts.js");
          } else if (asset.name.endsWith(".css")) {
            return path.join("assets", "css", "style.css");
          } else {
            return path.join("assets", asset.name);
          }
        },
      },
    },
  },

  // Configures production build
  build: {
    // Sets the output directory for the production build
    outDir: resolve(__dirname, "dist"),

    // The target JavaScript version for the production build
    target: "es2015",

    // Minifies the production build using ESBuild, CSSNano, and optional HTML minification
    minify: {
      js: "esbuild",
      css: "cssnano",
      html: false,
    },

    // Disables creation of a manifest.json file for production builds
    manifest: false,

    // Disables source maps for production builds
    sourcemap: false,

    // Configures Rollup options for the production build
    rollupOptions: {
      // Defines a function to generate asset file names
      output: {
        assetFileNames: async (asset) => {
          if (asset.name.endsWith(".js")) {
            return path.join("assets", "scripts.js");
          } else if (asset.name.endsWith(".css")) {
            return path.join("assets", "css", "style.css");
          } else {
            return path.join("assets", asset.name);
          }
        },
      },
    },
  },

  // Defines custom plugins for Vite
  plugins: [],

  // Configures file resolution aliases
  resolve: {
    // Creates an alias for "@" to the project root directory
    alias: {
      "@": root,
    },

    // Defines file extensions that Vite should resolve
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass", ".json"],
  },

  // Configures CSS preprocessing options
  css: {
    // Preprocesses SCSS files using PostCSS
    preprocessorOptions: {
      scss: {
        // Include paths for SCSS files
        includePaths: [resolve(__dirname, "src/assets/scss")],

        // Applies PostCSS configuration
        postcss: {
          config: require("postcss.config.cjs"),
        },
      },
    },
  },
});
