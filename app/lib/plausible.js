import { fetchRequest } from "./fetch/fetchWrapper";
import { headers } from 'next/headers'

export function clientHeaders() {
    const FALLBACK_IP_ADDRESS = '0.0.0.0'
    const forwardedFor = headers().get('x-forwarded-for')
    const userAgent = headers().get('user-agent')
    const headersClient = { 'User-Agent': userAgent, 'X-Debug-Request': true }

    if (forwardedFor) {
        headersClient['X-Forwarded-For'] = forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
    }
    else {
        headersClient['X-Forwarded-For'] = headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
    }

    return headersClient
}

export async function sendEventPlausible(pathname) {
    try {
        const url = `${process.env.PLAUSIBLE_URL}/api/event`
        const body = {
            method: "POST",
            body: JSON.stringify({ "name": "pageview", "url": pathname, "domain": `${process.env.PLAUSIBLE_APP_ENTRY}`, 
                referrer: headers().get('referer')}),
            headers: clientHeaders()
        }
        const r = await fetchRequest(url, body)
        if (r.status !== 202) {
            const t = await r.text()
            throw new Error(t)
        }
    } catch (err) {
        console.error(err)
    }
}