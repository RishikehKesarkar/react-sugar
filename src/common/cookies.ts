import Cookies from "js-cookie";

const setCookie = (name: any, value: any) => {
    Cookies.set(name, value, { secure: true, path: '/',expires:24 * 60 * 60 * 1000  })
}

const getCookie:any = (name: any) => {
    return Cookies.get(name);
}

const removeCookie=(name:any)=>{
        Cookies.remove(name);
}

export { setCookie, getCookie,removeCookie };