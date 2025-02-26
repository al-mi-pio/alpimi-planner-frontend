module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'eslint-plugin-react-compiler',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'prettier',
        'plugin:storybook/recommended',
    ],
    ignorePatterns: [
        'dist',
        'storybook-static',
        'node_modules',
        '.eslintrc.cjs',
        'vite.config.ts',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': 'error',
        'react-compiler/react-compiler': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
