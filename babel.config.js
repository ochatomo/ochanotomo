module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: [
    //   [
    //     "transform-runtime",
    //     {
    //       polyfill: true,
    //       regenerator: true,
    //     },
    //   ],
    // ],
  };
};
