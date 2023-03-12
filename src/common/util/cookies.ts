import Cookies from "js-cookie";

const setCookies = (value: any) => {
    Cookies.set('loader', value)
}

const getCookies:any=(name:any)=>{
    return Cookies.get(name);
}

export {setCookies,getCookies};
