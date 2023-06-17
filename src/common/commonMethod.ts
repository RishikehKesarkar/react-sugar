import crypto from "./crypto";
import SessionStorage from "./sessionStorage";
const initialval = {
    userId: 0
}
export const getSessionUser = () => {
    const user = SessionStorage.get({ name: 'uinfo' });
    if (user)
        return crypto.decryptData(user);
    else
        return initialval;
}