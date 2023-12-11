module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-mixins"),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 1,
    }),
  ],
};
