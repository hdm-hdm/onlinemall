module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'src':'@',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      },
      extensions:['.vue','.js','.css']
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 375,
            viewportHeiht: 667,
            unitPrecision: 5,
            // propList: [
            //   "*"
            // ],
            viewportUnit: "vw",
            // fontViewportUnit: "vw",
            selectorBlackList: ['ignore'],
            minPixelValue: 1,
            mediaQuery: false,
            // replace: true,
            exclude: [/(\/|\\)(node_modules)(\/|\\)/,/TabBar/]
          })
        ]
      }
    }
  }
//   devServer: {
//     proxy: 'http://localhost:8080',
//     public: '10.64.120.52:8080'  // 本地ip
// }
}

