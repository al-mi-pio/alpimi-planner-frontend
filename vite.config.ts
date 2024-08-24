/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react-swc';

import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
    },
    plugins: [
        react(),
        basicSsl({
            name: 'alpimi',
            domains: ['alpimi.pl'],
            certDir: '/.devServer/cert',
        }),
    ],
});
