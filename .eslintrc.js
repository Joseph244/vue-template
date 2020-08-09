module.exports = {
    root: true,
    globals: {
        process: true,
        d3: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    plugins: ['babel', 'prettier'],
    rules: {
        'no-debugger': 2,
        'generator-star-spacing': 'off',
        'no-tabs': 'off',
        'no-unused-vars': 'off',
        'no-console': 'off',
        'no-irregular-whitespace': 'off',
        'no-useless-escape': 'off'
    }
};
