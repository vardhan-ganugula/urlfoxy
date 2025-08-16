import crypto from 'crypto';

export const generateShortHash = (url) => {
    console.log("Generating short hash for URL:", url);
    const hash = crypto.createHash('md5').update(url).digest('hex');

    return base62Encode(BigInt("0x" + hash).toString());

}


function base62Encode(num) {
    console.log(num)
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encoded = '';

    while (num > 0) {
        encoded = chars[num % 62] + encoded;
        num = Math.floor(num / 62);
    }

    return encoded.slice(0,7) || '0';

}

