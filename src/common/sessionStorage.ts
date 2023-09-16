import store from "../store/store";
import crypto from "./crypto";

interface getProps {
    name: string
}
interface setProps extends getProps {
    value: any
}

const set = (data: setProps) => {
    sessionStorage.setItem(data.name, data.value);
}
const get = (name: getProps) => {
    return sessionStorage.getItem(name.name);
}
const remove = (name: getProps) => {
    sessionStorage.removeItem(name.name)
}

export const TestSession = () => {
    return store.getState().auth.data?.userId || 0;
}

const SessionStorage = { set, get, remove };
export default SessionStorage;
