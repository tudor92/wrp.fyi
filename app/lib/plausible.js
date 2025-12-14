'use server'

import { headers } from 'next/headers'

export async function clientHeaders() {
    const FALLBACK_IP_ADDRESS = '0.0.0.0'
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const userAgent = headersList.get('user-agent')
    const headersClient = {
        'User-Agent': userAgent || 'Mozilla/5.0',
        'Content-Type': 'application/json',
    }

    if (forwardedFor) {
        headersClient['X-Forwarded-For'] = forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
    } else {
        headersClient['X-Forwarded-For'] = headersList.get('x-real-ip') ?? FALLBACK_IP_ADDRESS
    }

    return headersClient
}

export async function sendEventPlausible(pageUrl) {
    try {
        const url = `${process.env.PLAUSIBLE_URL}/api/event`
        const headersList = await headers()
        const referrer = headersList.get('referer') || ''

        // Build the headers
        const requestHeaders = await clientHeaders()

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                name: "pageview",
                url: pageUrl,
                domain: process.env.PLAUSIBLE_APP_ENTRY,
                referrer: referrer,
            }),
            headers: requestHeaders,
            cache: 'no-store',
        })

        if (response.status !== 202) {
            const text = await response.text()
            console.error('Plausible event failed:', response.status, text)
        }
    } catch (err) {
        console.error('Plausible error:', err)
    }
}
