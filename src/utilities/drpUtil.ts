import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERouteType, EaccountType, sliceEnum } from "../common/enum/Enum";
import { stateMaster_GetAll } from "../service/stateMasterService";
import { RootState } from "../store/store";
import { getAllMenu } from "../service/menuMaster-Service";
import { getSessionUser } from "../common/commonMethod";
import { getAllRoles } from "../service/roleMaster-Service";
import jsxElement from "../Routes/pages";
import { getAllCities } from "../service/cityMaster-Service";

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

const DrpRouteType = () => {
    return Object.entries(ERouteType).filter(([key]) => !isNaN(Number(key)))
        .map(([id, label]) => ({ id: Number(id), label }));
};

const DrpaccountType = () => {
    return Object.entries(EaccountType).map(([label, id]) => ({ id: id, label }));
}

const drp = { DrpState, DrpCity, DrpRoles, DrpMenus, DrpSubMenu, DrpPages, DrpRouteType, DrpaccountType };
export default drp;
