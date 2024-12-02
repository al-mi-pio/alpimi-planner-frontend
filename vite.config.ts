/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react-swc';

import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        include: ['**/*.{test,unit}.?(c|m)[jt]s?(x)'],
    },
    plugins: [
        react(),
        basicSsl({
            name: 'alpimi',
            domains: ['alpimi.pl'],
            certDir: '/.devServer/cert',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
