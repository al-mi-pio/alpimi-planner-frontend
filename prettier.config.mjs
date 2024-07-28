/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    importOrder: ['react', '<THIRD_PARTY_MODULES>', '^@/(.*)$'],
    importOrderSeparation: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default config;
