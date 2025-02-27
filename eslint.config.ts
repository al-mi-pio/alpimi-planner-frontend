// import reactCompiler from 'eslint-plugin-react-compiler';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginRefresh from 'eslint-plugin-react-refresh';

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginStorybook from 'eslint-plugin-storybook';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        ignores: ['dist', 'storybook-static', 'node_modules'],
    },
    {
        languageOptions: {
            parser: tsParser,
            globals: globals.browser,
        },
    },
    js.configs.recommended,
    // @ts-expect-error Wrong type
    ...ts.configs.recommended,
    // @ts-expect-error Wrong type
    {
        ...pluginReact.configs.flat.recommended,
        settings: { react: { version: 'detect' } },
    },
    {
        // @ts-expect-error Wrong type
        plugins: {
            'react-refresh': pluginRefresh,
            'react-hooks': pluginReactHooks,
            prettier: pluginPrettier,
            storybook: pluginStorybook,
        },
        rules: {
            ...eslintConfigPrettier.rules,
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'error',
            // 'react-compiler/react-compiler': 'error',
        },
    },
    //Doesn't work for some reason
    // reactCompiler.configs.recommended,
] satisfies Linter.Config[];
