/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';

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
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', { target: '19' }]],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
