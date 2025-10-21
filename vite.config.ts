import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['node_modules']
    },
    server: {
        port: 3000,
        open: true,
        watch: {
            ignored: ['**/node_modules/**', '**/build/**']
        }
    },
    build: {
        outDir: 'build',
        sourcemap: false,
    }
})