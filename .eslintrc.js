module.exports = {
  root: true, // So parent files don't get applied
  // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境，不矛盾
  // 主流的库或构建系统都能支持，列表见官方文档：http://eslint.cn/docs/user-guide/configuring#specifying-environments
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // parser 解析代码时的参数
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      // 支持属性："globalReturn", "impliedStrict", "jsx", "experimentalObjectRestSpread"
      jsx: true,
    },
  },
  // 指定环境为我们提供了其预置的全局变量
  // 对于那些我们自定义的全局变量，可以在这里指定
  // 设为 true 表示不应该被重写，设为 false 表示可以被重写
  globals: {
    // 如："var1": true, "var2": false
  },
  // 这里指定插件，插件名一般为 eslint-plugin-xxx，这里可以缩写为 xxx
  // 插件提供了除 eslint 规定之外额外的规则
  // plugin 与 extend 的区别：extend 提供的是 eslint 现有规则的一系列预设
  // 而 plugin 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候
  // 就可以借用插件来实现了
  plugins: [],
  // 具体或改写的规则配置
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  // 两种格式："rule-name": 0/1/2    "rule-name": [0/1/'error', configDetail]
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // 语句强制分号结尾
    semi: ['error', 'always'],
    // 空行最多不能超过2行
    'no-multiple-empty-lines': ['error', { max: 2 }],
    // 混用tab和空格
    'no-mixed-spaces-and-tabs': ['error'],
    // 换行使用LF
    'linebreak-style': ['error', 'unix'],
    // 允许非default export
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-export': 'off',
    //function前面不空格，prettier rule
    'space-before-function-paren': 'off',
    // -- start TODO: Remove when is https://github.com/babel/babel-eslint/issues/530 fixed
    'template-curly-spacing': 'off',
    indent: 'off',
    // -- end
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    // printWidth is 120 in prettier
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-unused-vars': [
      'error',
      {
        // 允许声明未使用变量
        vars: 'local',
        // 在使用的参数之前定义的不检测
        args: 'after-used',
        // 忽略以_开始或 h 的参数
        argsIgnorePattern: '^_|^h$',
      },
    ],
  },
  // Specially files setting
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser
      extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the end of extends array.
      ],
      rules: {
        // defined on the @typescript-eslint/no-unused-vars
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-this-alias': ['error', { allowedNames: ['vm'] }],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            // 允许声明未使用变量
            vars: 'local',
            // 在使用的参数之前定义的不检测
            args: 'after-used',
            // 忽略以_开始或 h 的参数
            argsIgnorePattern: '^_|^h$',
          },
        ],
      },
    },
    {
      files: ['**/*.tsx'],
      plugins: ['local'],
      rules: {
        'local/jsx-uses-my-pragma': 'error',
        'local/jsx-uses-vars': 'error',
      },
    },
    // override by above
    {
      files: ['shims-tsx.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  // Adding Shared Settings
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
};
