

export default ({
    //favicon: '/assets/favicon.ico',
    title: 'Test assignment',

    // mfsu: {
    //     strategy: 'normal'
    // },

    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,

    styles: [
        'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;300;400&display=swap'
    ],

    proxy: {
        // '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: {'^/api': ''},
        // }
    }
});
