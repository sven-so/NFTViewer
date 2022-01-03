import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: "./",
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
})