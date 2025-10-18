/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';

const manualChunks = [
    'react-dom',
    'react-router',
    'react-select',
    'react-mosaic-component',
    'i18next',
    'lodash',
    '@tanstack',
    'axios',
    'react-toastify',
    '@emotion',
    'styled-components',
];

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
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        for (const lib of manualChunks) {
                            if (id.includes(lib)) {
                                return `vendor_${lib}`;
                            }
                        }

                        return 'vendor';
                    }
                },
            },
        },
    },
});
