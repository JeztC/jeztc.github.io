import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['node_modules']
    },
    server: {
        port: 3000,
        watch: {
            ignored: ['**/node_modules/**', '**/dist/**']
        }
    }
})