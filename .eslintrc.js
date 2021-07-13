module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'brace-style': ['error', 'allman'],
        'no-throw-literal': 0,
        'max-len': ['error', 120],
        'object-shorthand': ['error', 'always'],
        curly: ['error', 'all'],
        quotes: ['error', 'single'],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'LabeledStatement',
                message:
                'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'no-continue': 0,
        'no-console': 0,
        'no-param-reassign': ['error', { props: false }],
        'linebreak-style': ['error', 'windows'],
    },
};
