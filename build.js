const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const COMMON = {
  entryPoints: ['./src/index.ts'],
  minify: false,
  sourcemap: true,
  platform: 'node',
  target: 'node14',
  bundle: true,
  plugins: [nodeExternalsPlugin()],
}

const buildOptions =[
  {
    ...COMMON,
    format: 'cjs',
    target: 'es2015',
    outfile: 'dist/index.node.js',
  },
  {
    ...COMMON,
    format: 'esm',
    target: 'es2017',
    outfile: 'dist/index.node.mjs',
    banner:{
      js: `
      import { fileURLToPath } from 'url';
      import path from 'path';
      import { createRequire as topLevelCreateRequire } from 'module';
      const require = topLevelCreateRequire(import.meta.url);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      `
    },
  },
]

buildOptions.forEach(options => {
  esbuild.build(options)
    .then(() => console.log(`${options.format} Built Successfully!`))
    .catch(() => process.exit(1))
})
