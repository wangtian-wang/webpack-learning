module.exports = {
  module: {
    rules: [
      {
        test: /.\css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        include: resolve(__dirname, "src"),
        loader: "eslint-loader",
        enforce: pre,
        enforce: post, // 延迟执行
        // enforce: 不写 就是默认中间执行
        options: {},
      },
      {
        oneOf: [],
      },
    ],
  },
};
