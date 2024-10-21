import { sanitizeUrl } from '@braintree/sanitize-url';
import crypto from 'crypto';

export const CANNOT_BE_SANITIZED = 'about:blank'
export const COLLECTIONS={
    USERS:'users',
    FLOWS:'flows'
}

export const TAGS=[
    'utm_medium',
    'utm_source',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'source',
    'ref'
]

export function sanitizeUrlPath (url) {
    try{
        if(!url) return null
        const sanitized = sanitizeUrl(url)
        if(sanitized === CANNOT_BE_SANITIZED)
            return null
        return sanitized
    }catch(err){
        console.log(err)
        return null
    }
}

export function hashedUrlPath (url) {
    try{
        if(!url) return null
        const hash = crypto.createHash('sha256');
        hash.update(url);
        const digest = hash.digest('hex');
        return digest
    }catch(err){
        console.log(err)
        return null
    }
}