import HmacMD5 from 'crypto-js/hmac-md5'
import EncBase64 from 'crypto-js/enc-base64'

export const url ='https://authservice.priaid.ch/login'
export const urlHealth = 'https://healthservice.priaid.ch'
export const apiKey = process.env.REACT_APP_KEY
export const secretKey = process.env.REACT_APP_SECRET_KEY
export const computedHash = HmacMD5(url, secretKey)
export const computedHashString = computedHash.toString(EncBase64)