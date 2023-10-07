// https://gist.github.com/srestraj/c61d0a025f53ab7f99bd875eace5cc84
import jwt_decode from "jwt-decode";

export default ({ $config }, inject) => {
    window.initAuth = init
    addScript()

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
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'center',
                width: 250
            }
        )
    }

    function parseUser(res) {
        const credential = jwt_decode(res.credential);

        console.log("credential:", credential)
    }
}