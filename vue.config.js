module.exports = {
    devServer: {
        proxy: {
            '/admin': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': ''
                }
            },
            '/community':{
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/community': ''
                }
            }
        }
    }

}
