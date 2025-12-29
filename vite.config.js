import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'https://gophora-backend-5oap2q2jqa-uc.a.run.app',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // Remove the define section - it's not needed
  }
})