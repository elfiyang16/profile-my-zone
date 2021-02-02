const babelOption = {
  presets: ["babel-preset-gatsby"],
}
module.exports = require("babel-jest").createTransformer(babelOption)
