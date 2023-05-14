module.exports = {
  outputDir: './dist/app',

  configureWebpack: {
    resolve: {
      // 给路径起别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // 跨域的服务器地址
        target: 'https://127.0.0.1:3000',
        // 是否允许跨域
        changeOrigin: true,
        // 替换掉请求路径的/json_demo“”
        pathRewrite: { '^/api': "" }
      },
    }
  }
}