import fetch from 'node-fetch'
import { getErrorResponse, unWrap } from "../../../utils/fetchUtils"
import { getHeaders } from "../helpers"

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    const appId = algoliaConfig.appId

    return {
        create: async (homeId, payload) => {
            try {
                return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        },

    }
}