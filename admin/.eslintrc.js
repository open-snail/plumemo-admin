module.exports = {
  overrides: [
    {
      files: ['**/*.vue'],
      extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/strongly-recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['vue'],
      rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/html-self-closing': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/component-name-in-template-casing': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/no-unused-components': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/no-parsing-error': 'off',
      },
    },
  ],
};
