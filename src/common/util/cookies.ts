import Cookies from "js-cookie";

const setCookies = (name: any, value: any) => {
    Cookies.set(name, value)
}

const getCookies: any = (name: any) => {
    return Cookies.get(name);
}

export { setCookies, getCookies };
