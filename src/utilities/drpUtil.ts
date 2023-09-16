import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERouteType, EaccountType, sliceEnum, EitemType } from "../common/enum/Enum";
import { stateMaster_GetAll } from "../service/stateMasterService";
import { RootState } from "../store/store";
import { getAllMenu } from "../service/menuMaster-Service";
import { getSessionUser } from "../common/commonMethod";
import { getAllRoles } from "../service/roleMaster-Service";
import jsxElement from "../Routes/pages";
import { getAllCities } from "../service/cityMaster-Service";
import { getAllAccounts } from "../service/accountMaster-Service";
import { getAllgst } from "../service/gstMaster-Service";
import { getAllitem } from "../service/itemMaster-Service";

export interface IdrpUtil {
    id: number | string;
    label: string;
}

const initialItem: IdrpUtil = { id: 0, label: "Select" };

const useDataArray = (status: sliceEnum | string, dataArr: any[], action: any) => {
    const dispatch = useDispatch();

    useMemo(() => {
        if (status !== sliceEnum.error && dataArr.length === 0) {
            dispatch(action);
        }
    }, [status, dataArr, dispatch, action]);
};

const DrpState = () => {
    const state = useSelector((state: RootState) => state.state);
    useDataArray(state.status, state.dataArr, stateMaster_GetAll());
    if (!(state.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...state.dataArr.map((item) => ({ id: item.Id, label: item.stateName }))];
};

const DrpCity = (stateId: number) => {
    const city = useSelector((state: RootState) => state.City);
    useDataArray(city.status, city.cities, getAllCities());
    if (!(city.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...city.cities.filter((filtercity) => filtercity.stateId == stateId)
        .map((item) => ({ id: item.cityId, label: item.cityName }))];
}

const DrpRoles = () => {
    const role = useSelector((state: RootState) => state.roleMaster);
    useDataArray(role.status, role.dataArr, getAllRoles());
    if (!(role.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...role.dataArr.map((item) => ({ id: item.Id, label: item.roleName }))];
};

const DrpMenus = () => {
    const menu = useSelector((state: RootState) => state.menu);
    useDataArray(menu.status, menu.menus, getAllMenu(getSessionUser()?.userId));
    if (!(menu.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...menu.menus.map((item) => ({ id: item.menuId, label: item.menuName }))];
};

const DrpSubMenu = (MenuId: any) => {
    const menu = useSelector((state: RootState) => state.menu);
    const filteredMenus = menu.menus.filter((men) => men.fMenuId === MenuId);
    if (!(menu.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...filteredMenus.map((item) => ({ id: item.menuId, label: item.menuName }))];
};
const DrpPages = () => {
    const resultArray = [initialItem, ...Object.keys(jsxElement).map(key => ({ id: key, label: key }))];
    return resultArray;
};
const DrpAccounts = (accountType?: string) => {
    const account = useSelector((state: RootState) => state.account);
    useDataArray(account.status, account.accounts, getAllAccounts());

    let filteredAccounts = [...account.accounts]; // Create a new array
    if (accountType) {
        filteredAccounts = filteredAccounts.filter((types) => types.acType === accountType);
    }
    if (!(account.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...filteredAccounts.map((item) => ({ id: item.accountId, label: item.accountName }))];
}
const DrpGst = () => {
    const gst = useSelector((state: RootState) => state.gst);
    useDataArray(gst.status, gst.gsties, getAllgst());
    if (!(gst.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...gst.gsties.map((item) => ({ id: item.Id, label: item.name }))];
}
const DrpRouteType = () => {
    return Object.entries(ERouteType).filter(([key]) => !isNaN(Number(key)))
        .map(([id, label]) => ({ id: Number(id), label }));
};
const DrpaccountType = () => {
    return Object.entries(EaccountType).map(([label, id]) => ({ id: id, label }));
}
const DrpitemType = () => {
    return [initialItem, ...Object.entries(EitemType).map(([label, id]) => ({ id: id, label }))];
}
const DrpItem = (itemtype?: number) => {
    const item = useSelector((state: RootState) => state.item);
    useDataArray(item.status, item.items, getAllitem());
    let filteredItems = [...item.items]; // Create a new array
    if (itemtype) {
        filteredItems = filteredItems.filter((types) => types.itemType === itemtype);
    }
    if (!(item.status !== sliceEnum.error)) return [initialItem];
    return [initialItem, ...filteredItems.map((x) => ({ id: x.itemId, label: x.itemName }))];
}

const drp = {
    DrpState, DrpCity, DrpRoles, DrpMenus, DrpSubMenu, DrpPages,
    DrpRouteType, DrpaccountType, DrpAccounts, DrpGst, DrpitemType, DrpItem
};
export default drp;
