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
        '~/plugins/auth.client'
    ],
    modules: [
        "~/modules/auth",
        "~/modules/algolia/index",

    ],
    buildModules: ['@nuxtjs/tailwindcss'],
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
        }
    },
    privateRuntimeConfig: {
        algolia: {
            appId: "NMKU3QSRYW",
            key: "4661ebcddf95380b6bb45c84e14c2920",
        }
    },
}
