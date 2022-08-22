import base64js from 'base64-js';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const encodeObject = (obj: {[key: string]: any}) => {
  const stringifiedObj = JSON.stringify(obj);
  const uint8array = encoder.encode(stringifiedObj);
  return base64js.fromByteArray(uint8array);
};

export const decodeBase64 = (encoded: string) => {
  const byteArray = base64js.toByteArray(encoded);
  const stringifiedObj = decoder.decode(byteArray);
  return JSON.parse(stringifiedObj);
};