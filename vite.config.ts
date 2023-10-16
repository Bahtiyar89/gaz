import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import alias from '@rollup/plugin-alias'

const projectRootDir = resolve(__dirname);// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [react(), alias({
    entries: [
      {
        find: '~',
        replacement: resolve(projectRootDir, 'src')
      }
    ]
  })],
  define: {
    global: 'window'
  }
})
