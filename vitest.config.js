import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      // jsdom needs a concrete origin so localStorage / matchMedia based code paths work
      environmentOptions: {
        jsdom: {
          url: 'http://localhost/',
        },
      },
      exclude: [...configDefaults.exclude, 'e2e/**'],
      setupFiles: ['./src/__tests__/setup.js'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
