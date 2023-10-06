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
        script: [
            {
                src: 'https://accounts.google.com/gsi/client',
            },
        ],
    },
    router: {
        prefetchLinks: false,
    },
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi',
        // '~/plugins/auth.client'
    ],
    modules: [],
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
        }
    },
    privateRuntimeConfig: {

    }
}