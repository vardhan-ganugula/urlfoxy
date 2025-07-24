import crypto from 'crypto';


export const generateTXTRecord = () => {
    const randomString = crypto.randomBytes(16).toString('hex');
    return `vn-verify=${randomString}`;
}