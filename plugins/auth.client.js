// https://gist.github.com/srestraj/c61d0a025f53ab7f99bd875eace5cc84
import jwt_decode from "jwt-decode";
import Cookie from 'js-cookie'
import { unWrap } from "../utils/fetchUtils";

export default ({ $config, store }, inject) => {
    window.initAuth = init
    addScript()

    inject("auth", {
        signOut
    })

    function addScript() {
        const script = document.createElement('script')
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true

        script.onload = init;
        document.head.appendChild(script)
    }

    function init() {
        window.google.accounts.id.initialize({
            client_id: $config.auth.clientId,
            callback: parseUser,
            context: "signin"
        })

        window.google.accounts.id.renderButton(
            document.getElementById('googleButton'),
            {
                type: 'standard',
                size: 'large',
                text: 'signed_in',
                shape: 'rectangular',
                logo_alignment: 'center',
                width: 250
            }
        )
    }

    async function parseUser(res) {
        const id_token = res.credential;
        // const credential = jwt_decode(id_token);

        if (!id_token) {
            Cookie.remove($config.auth.cookieName)
            store.commit('auth/user', null)
            return
        }

        Cookie.set($config.auth.cookieName, id_token)

        try {
            const response = await unWrap(await fetch('/api/user'))
            const user = response.json

            store.commit("auth/user", {
                fullName: user.name,
                profileUrl: user.image
            })
        } catch (error) {
            console.error(error)
        }
    }

    function signOut() {
        google.accounts.id.disableAutoSelect();
        Cookie.remove($config.auth.cookieName)
        store.commit('auth/user', null)
    }
}