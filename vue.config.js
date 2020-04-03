const path = require("path"); //路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 生产环境
const isProduction = process.env.NODE_ENV === 'production';
//引入文件的方法
function resolve(dir) {
    return path.join(__dirname,dir)
}

// 配置跨域
module.exports = {
    //基本路径
    publicPath:'/',
    // 输出文件目录
    outputDir:'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: "./",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    // indexPath: './',
    // eslint-loader 是否在保存的时候检查
    lintOnSave:true,
    devServer:{
        compress:false, //开启压缩
        //open :true , //自动开启浏览器
        //代理
        proxy:{
            '/apply':{
                target:'http://api.zouzhengming.com/api/v1' ,//需要跨域的服务器地址
                ws:true,   //websocket(和后台保持持续的连接,与后台形成一个通道)
                changeOrigin:true, //是否允许跨域
                pathRewrite:{   //重写服务器
                    '/apply':'/'
                }
            }
        }
    },
    // css 相关配置
    css:{
        // 是否使用css分离插件 ExtractTextPlugin
        extract:true,
        // sourceMap是什么(主要是方便开发人员的错误定位)
        sourceMap:false,
        // css 预设器配置项
        loaderOptions:{
            sass:{
                data: `
                    @import "@/assets/common/index.scss";
                `
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
    },
    // webpack配置
  chainWebpack: config => {
    //配置别名 不配置会报错
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/img"))
      .set("@scss", resolve("src/assets/common"));
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
      // 生产环境注入cdn
    
    }
  },
    configureWebpack: config => {
        if (isProduction) {
            //用cdn方式引入

            // 为生产环境修改配置...
            config.plugins.push(
            //生产环境自动删除console
            new UglifyJsPlugin({
                uglifyOptions: {
                    //压缩
                compress: {
                    // warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                },
                },
                //关闭sourceMap 映射 开启后耗时会大大增加
                sourceMap: false,
                //使用多进程并行运行来提高构建速度
                parallel: true,
            })
            );
        }else{
            // 为开发环境修改配置...
            //也可以为测试环境配置
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap:false,
    // 启用并行化。默认并发运行数：os.cpus().length - 1。并行化可以显著加速构建
   parallel: require('os').cpus().length > 1,
}