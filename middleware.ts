import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { sendEventPlausible } from '@/app/lib/plausible';

export async function middleware(request: NextRequest) {
    try {
        if (request.nextUrl.pathname.length < 2) {
            return NextResponse.next();
        }
        const encodedUrl = encodeURIComponent(request.nextUrl.pathname)
         const apiRedirectUrl = new URL(`/lib/redirects?pathname=${encodedUrl}`,
             request.nextUrl.origin);
        const apiRedirect = new NextRequest(apiRedirectUrl)
        apiRedirect.cookies.set('hashed-url', decodeURIComponent(encodedUrl).toLowerCase());
        const redirectData = await fetch(apiRedirect);
        if (redirectData.ok) {
            const obj = await redirectData.json();
            sendEventPlausible(`${request.nextUrl.origin}/${obj.path}`);
            if(obj?.url) return NextResponse.redirect(obj?.url, 307);
            else return NextResponse.rewrite(new URL(`/${process.env.REDIRECT_URL_PASS}${request.nextUrl.pathname}`, request.url))
        }
        return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.next();
    }
} 

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!lib/|_|_next/static|password__/|_next/image|favicon.ico|favicon.png|favicon.svg|sitemap.xml|robots.txt).*)',
    ],
};
