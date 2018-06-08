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
        vendor: ['axios']
    },

    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ]

}