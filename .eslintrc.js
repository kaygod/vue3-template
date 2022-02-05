module.exports = {
    "root":true,
    "env": {
        "browser": true,
        "es2020": true,
        "node":true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    "plugins": ["vue", "@typescript-eslint"],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'camelcase':'off',
        '@typescript-eslint/explicit-module-boundary-types':'off',
        '@typescript-eslint/ban-types':'off',
        '@typescript-eslint/no-explicit-any':'off',
        '@typescript-eslint/ban-ts-comment':'off',
        '@typescript-eslint/no-empty-interface':'off'
    }
  }

 


 



 
