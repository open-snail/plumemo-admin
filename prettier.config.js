module.exports = {
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  jsxBracketSameLine: false, // jsx 标签最后的">"换行, 默认为 false
  printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个tab代表几个空格数，默认为2
  semi: true, // 行位是否使用分号，默认为true
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  endOfLine: 'lf', // 换行符，(\r\n), 默认为 lf
  trailingComma: 'all', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  proseWrap: 'preserve', // 是否要换行
};
