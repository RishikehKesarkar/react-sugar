import CryptoJS from "crypto-js";

var key = CryptoJS.enc.Utf8.parse('1234567887654321');
var iv = CryptoJS.enc.Utf8.parse('1234567887654321');
const secretPass = "XkhZG4fW2t2W";

// AES encryption
const encryptData = (value: any) => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        secretPass
    ).toString();
    return data;
};
const decryptData = (value: any) => {
    const bytes = CryptoJS.AES.decrypt(value, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};

const encrypted = (data: any) => {
    var encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
        {
            keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
        });
    const encryptString = encryptData.toString();
    if (encryptString.includes('/')) {
        return encryptString.replace('/', '');
    }
    else
        return encryptString;
}

// AES decrypt
const decrypted = (data: any) => {
    var decryptData = CryptoJS.AES.decrypt(data, key,
        {
            keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
        });
    return CryptoJS.enc.Utf8.stringify(decryptData);
}

const crypto = { encrypted, decrypted, encryptData, decryptData };
export default crypto;