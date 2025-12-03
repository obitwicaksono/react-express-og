import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // remove '@react-oauth/google' so it gets bundled
      // external: [ /* ...other externals... */ ],
    }
  }
})
