// import reactCompiler from 'eslint-plugin-react-compiler';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginRefresh from 'eslint-plugin-react-refresh';

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { rules as prettierRules } from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginStorybook from 'eslint-plugin-storybook';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        ignores: ['dist', 'storybook-static', 'node_modules'],
    },
    {
        languageOptions: {
            parser: tsParser,
            globals: globals.browser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    js.configs.recommended,
    ...tsConfigs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        settings: { react: { version: 'detect' } },
    },
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
        settings: {
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true,
                    project: ['./tsconfig.app.json', './tsconfig.node.json'],
                }),
            ],
        },
    },
    {
        plugins: {
            'react-refresh': pluginRefresh,
            'react-hooks': pluginReactHooks,
            prettier: pluginPrettier,
            storybook: pluginStorybook,
        },
        rules: {
            ...prettierRules,
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'error',
            'import-x/default': 'off',
            'import-x/no-named-as-default': 'off',
            'import-x/extensions': [
                'error',
                'ignorePackages',
                { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
            ],
            // 'react-compiler/react-compiler': 'error',
        },
    },
    //Doesn't work for some reason
    // reactCompiler.configs.recommended,
];
