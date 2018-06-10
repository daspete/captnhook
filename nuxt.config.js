require('dotenv').config();

const nodeExternals = require('webpack-node-externals')

module.exports = {
    
    /*
     ** Headers of the page
     */
    head: {
        title: 'Captn Hook',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },
    
    /*
     ** Global CSS
     */
    css: ['~/assets/css/main.scss'],
    
    /*
     ** Add axios globally
     */
    build: {
        //vendor: ['axios'],

        extractCSS: true,

        extend(config, { isServer }) {
            if (isServer) {
                config.externals = [
                    nodeExternals({ whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/] })
                ]
            }
        }
    },

    serverMiddleware: [
        '~/server/index.js'
    ],

    plugins: [
        '~/plugins/vue-awesome',
        '~/plugins/components'
    ],

    modules: [
        '@nuxtjs/axios'
    ]

}
