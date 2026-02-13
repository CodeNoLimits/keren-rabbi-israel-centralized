/**
 * Build script for Vercel deployment using Build Output API v3.
 *
 * Instead of relying on @vercel/node (which bundles 360MB of node_modules),
 * we use esbuild to create a self-contained 2.5MB serverless function bundle.
 *
 * Output structure:
 *   .vercel/output/
 *     config.json          - Routing rules
 *     static/              - Client build (from dist/public)
 *     functions/api.func/  - Bundled Express serverless function
 */
import { execSync } from "child_process";
import { mkdirSync, writeFileSync, cpSync, statSync } from "fs";
import { join } from "path";

const OUTPUT = ".vercel/output";

// Step 1: Bundle the API serverless function with esbuild
console.log("Bundling API serverless function with esbuild...");
mkdirSync(join(OUTPUT, "functions/api.func"), { recursive: true });

execSync(
  [
    "npx esbuild server/vercel.ts",
    "--bundle",
    "--platform=node",
    "--target=node20",
    "--format=esm",
    `--outfile=${join(OUTPUT, "functions/api.func/index.mjs")}`,
    "--minify",
    '--banner:js=\'import { createRequire } from "module"; const require = createRequire(import.meta.url);\'',
  ].join(" "),
  { stdio: "inherit" }
);

const bundleSize = statSync(
  join(OUTPUT, "functions/api.func/index.mjs")
).size;
console.log(
  `API bundle: ${(bundleSize / 1024 / 1024).toFixed(1)}MB (limit: 300MB)`
);

// Step 2: Write serverless function config
writeFileSync(
  join(OUTPUT, "functions/api.func/.vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.mjs",
      maxDuration: 30,
      memory: 1024,
      launcherType: "Nodejs",
    },
    null,
    2
  )
);

// Step 3: Copy static files from client build
console.log("Copying static files to output...");
mkdirSync(join(OUTPUT, "static"), { recursive: true });
cpSync("dist/public", join(OUTPUT, "static"), { recursive: true });

// Step 4: Write Build Output API routing config
writeFileSync(
  join(OUTPUT, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/assets/(.*)",
          headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
          },
          continue: true,
        },
        {
          src: "/images/(.*)",
          headers: { "Cache-Control": "public, max-age=86400" },
          continue: true,
        },
        {
          src: "/attached_assets/(.*)",
          headers: { "Cache-Control": "public, max-age=31536000" },
          continue: true,
        },
        { src: "/api/(.*)", dest: "/api" },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" },
      ],
    },
    null,
    2
  )
);

console.log("Build Output API ready in .vercel/output/");
