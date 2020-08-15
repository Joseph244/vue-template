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
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 10,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 2,
                alignAttributesVertically: false,
                ignores: []
            }
        ],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never'
            }
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always',
                i: 'always'
            }
        ],
        'no-debugger': 2,
        'generator-star-spacing': 'off',
        'no-tabs': 'off',
        'no-unused-vars': 'off',
        'no-console': 'off',
        'no-irregular-whitespace': 'off',
        'no-useless-escape': 'off'
    }
};
