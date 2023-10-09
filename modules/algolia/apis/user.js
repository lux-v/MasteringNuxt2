import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'
import { getHeaders } from "../helpers"

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    const appId = algoliaConfig.appId

    return {
        create: async (identity, payload) => {
            try {
                return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        },
        getById: async (identity) => {
            try {
                return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                    headers,
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        }
    }
}