import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function ({ $config }, inject) {
    const appId = $config.algolia.appId
    const apiKey = $config.algolia.key
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }
    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
        getHomes,
    })

    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, start, end, radiusInMeters = 1500 * 15) {
        try {
            const days = []

            for (var day = parseInt(start); day <= parseInt(end); day += 86400) {
                days.push(`availability:${day}`)
            }
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    filters: days.join(' AND '),
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }
    async function getHomes() {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    hitsPerPage: 15,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }
}