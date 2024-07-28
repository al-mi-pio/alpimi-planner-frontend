import pluginReact from 'eslint-plugin-react';

import pluginJs from '@eslint/js';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    {
        languageOptions: {
            parserOptions: {
                project: [
                    './tsconfig.json',
                    './tsconfig.app.json',
                    './tsconfig.node.json',
                ],
                tsconfigRootDir: __dirname,
            },
        },
    },
    { settings: { react: { version: 'detect' } } },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    { rules: { 'react/react-in-jsx-scope': 'off' } },
];
