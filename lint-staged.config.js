module.exports = {
  '*.{js?(x),ts?(x)}': ['node ./scripts/prettier.js write-changed'],
};
