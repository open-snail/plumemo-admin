module.exports = {
  overrides: [
    {
      files: '**/*.vue',
      extends: [
        'plugin:vue/essential', // -> eslint-plugin-vue
      ],
    },
    {
      files: '**/*.{ts,tsx}',
      extends: [
        '@vue/typescript/recommended', // -> @typescript-eslint/eslint-recommended & @typescript-eslint/recommended
        '@vue/prettier', // -> eslint-config-prettier & eslint-config-prettier/vue
        '@vue/prettier/@typescript-eslint', // -> eslint-config-prettier/@typescript-eslint
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
