module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config',
        'plugin:prettier/recommended',
        'prettier',
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
};