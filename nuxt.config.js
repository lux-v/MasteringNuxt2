export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }],
    },
    router: {
        prefetchLinks: false,
    },
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi',
        '~/plugins/auth.client',
        '~/plugins/vCalendar.client'
    ],
    modules: [
        "~/modules/auth",
        "~/modules/algolia/index",
        "~/modules/cloudinary/index",
        // '@nuxtjs/cloudinary'
    ],
    buildModules: [
        '@nuxtjs/tailwindcss',
        "@nuxt/image"
    ],
    image: {
        cloudinary: {
            baseURL: 'https://res.cloudinary.com/dgopysenc/image/upload/'
        }
    },
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0
        }
    },
    publicRuntimeConfig: {
        auth: {
            cookieName: "idToken",
            clientId: "528848303668-lapkfimdqtg12ecgo0724fq1c1fta6uc.apps.googleusercontent.com"
        },
        algolia: {
            appId: "NMKU3QSRYW",
            key: "991dfdaf0f383e94c7096283ce32e646",
        },
        cloudinary: {
            apiKey: "921885162476816",
            cloudName: "dgopysenc",
        }
    },
    privateRuntimeConfig: {
        algolia: {
            appId: "NMKU3QSRYW",
            key: "4661ebcddf95380b6bb45c84e14c2920",
        },
        cloudinary: {
            apiSecret: "fGDF4a89Mb9YLRb4Sqlb7tRt9mM"
        }
    },
}
