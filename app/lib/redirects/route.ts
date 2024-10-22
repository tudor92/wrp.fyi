import { NextRequest, NextResponse } from 'next/server';
import { getConn } from '@/app/lib/redis';
import { sanitizeUrlPath, hashedUrlPath, TAGS } from '@/app/lib/utils';

export async function GET(request: NextRequest) {
  try {
    if(!request.nextUrl.searchParams.get('pathname'))
      return new Response('Bad Request', { status: 500 });

    const pathName = request.nextUrl.searchParams.get('pathname') || ''
    //security check
    if(request.cookies.get('hashed-url')?.value !== pathName.toLowerCase())
      return new Response('Bad Request', { status: 500 });

    const pathname = sanitizeUrlPath(pathName);
    if (!pathname || pathname === '') {
      return new Response('Bad Request', { status: 404 });
    }

    const digest = pathname && pathname[0] === '/' ? hashedUrlPath(pathname.substring(1)) : hashedUrlPath(pathname);
    const redisClient = await getConn();
    const redirect = await redisClient.hGetAll(`${digest}`);

    if (!redirect || redirect?.valid !== 'true') {
      return new Response('Nothing here', { status: 404 });
    }

    const props = redirect && JSON.parse(redirect?.props)
    const {passwords = null,labels = null,...rest} = props
    const searchParams = new URLSearchParams(rest)
    const changedParamas = new URLSearchParams()

    searchParams.forEach((value, key) => {
      if(value && value !== 'null' && value !== 'NULL' && TAGS.includes(key)) 
        changedParamas.append(key, value)
    })

    //special logic for passwords/ redirect to password page and send the hashed pass as props
    if(passwords){
      delete redirect.url 
    }

    if(changedParamas && changedParamas.size > 0) redirect.path = `${redirect?.path}?${changedParamas.toString()}`

   return NextResponse.json(redirect);
  } catch (err) {
    console.log(err);
    return new Response('Server error', { status: 500 });
  }
}
