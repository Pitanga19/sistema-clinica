// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import a11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.tsx', '**/*.ts'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': a11y,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'jsx-quotes': ['error', 'prefer-single'],
        },
    },
    prettier,
]

export const ignores = ['node_modules', 'dist', 'build']
