module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },
    env: {
        browser: true
    },
    extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
    plugins: ['vue', 'prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'vue/max-attributes-per-line': [
        //     'error',
        //     {
        //         singleline: 5,
        //         multiline: {
        //             max: 1,
        //             allowFirstLine: false
        //         }
        //     }
        // ],
        eqeqeq: 'off',
        // 'vue/html-indent': [
        //     'error',
        //     4,
        //     {
        //         attribute: 1,
        //         baseIndent: 1,
        //         closeBracket: 2,
        //         alignAttributesVertically: false,
        //         ignores: []
        //     }
        // ],
        // 'vue/html-closing-bracket-spacing': [
        //     'error',
        //     {
        //         startTag: 'never',
        //         endTag: 'never'
        //     }
        // ],
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        'no-template-curly-in-string': 'off',
        'generator-star-spacing': 'off',
        'no-tabs': 'off',
        'no-unused-vars': 'off',
        'no-console': 'off',
        'no-irregular-whitespace': 'off',
        'no-useless-escape': 'off'
        // 'prettier/prettier': 'error',
        // // allow async-await
        // 'generator-star-spacing': 'off',
        // // allow debugger during development
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-eval': 'off',
        // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
        // 'vue/script-indent': ['error', 4, { baseIndent: 2 }]
    },
    globals: {
        $: true,
        d3: true
    }
};
