import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
    // Gzip compression for production
    ...(process.env.NODE_ENV === "production" 
      ? [
          compression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
          }),
          compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
          })
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Optimizations for Lighthouse
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          // React vendor chunk
          'react-vendor': ['react', 'react-dom', 'react-hook-form'],
          
          // Radix UI chunks - grouped by functionality
          'radix-ui-overlay': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-hover-card',
          ],
          'radix-ui-forms': [
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-label',
          ],
          'radix-ui-navigation': [
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-menubar',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-tabs',
          ],
          'radix-ui-misc': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-toast',
          ],
          
          // Other heavy vendors
          'query-vendor': ['@tanstack/react-query'],
          'router-vendor': ['wouter'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'chart-vendor': ['recharts'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
