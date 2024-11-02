'use server'

import { getConn } from "../../lib/redis"
import { sanitizeUrlPath, hashedUrlPath } from "../../lib/utils"
import { redirect } from 'next/navigation'

export async function getLinkData(slug: string) {
    const pathname = sanitizeUrlPath(slug);
    if (!pathname || pathname === '') {
        throw new Error('Invalid pathname');
    }

    const digest = pathname && pathname[0] === '/' ? hashedUrlPath(pathname.substring(1)) : hashedUrlPath(pathname);
    const redisClient = await getConn();
    const redirect = await redisClient.hGetAll(`${digest}`);

    if (!redirect || redirect?.valid !== 'true') {
        throw new Error('Link not found');
    }

    return redirect;
}

export async function checkPassword(formData: FormData) {
    const password = formData.get('password') as string;
    const slug = formData.get('slug') as string;
    let validPassword = false;
    let linkData;

    try {
        linkData = await getLinkData(slug);
        const linkProps = JSON.parse(linkData.props);

        if (linkProps.passwords && linkProps.passwords.length > 0) {
            validPassword = linkProps.passwords.some((p: { password: string }) => p.password === password);
        }

    } catch (error) {
        console.error('Error checking password:', error);
        throw error
    }

    if (validPassword) redirect(linkData.url);
}