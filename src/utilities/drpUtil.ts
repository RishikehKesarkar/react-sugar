import { sliceEnum } from "../common/enum/Enum";
import { getState } from "../store/store";

const DrpState = () => {
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const state = getState().state;
        if (state.status != sliceEnum.error) {
            if (state.dataArr.length !== 0) {
                state.dataArr.map((item) => { resultArray.push({ id: item.Id, label: item.stateName }) });
            }
        }
        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

const DrpRoles = () => {
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const role = getState().roleMaster;
        if (role.status != sliceEnum.error) {
            if (role.dataArr.length !== 0) {
                role.dataArr.map((item) => { resultArray.push({ id: item.Id, label: item.roleName }) });
            }

        }
        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

const DrpMenus = (menuId: number = 0) => {
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const menu = getState().menu;
        if (menu.status != sliceEnum.error) {
            if (menuId == 0) {
                if (menu.menus.length !== 0) {
                    menu.menus.map((item) => { resultArray.push({ id: item.menuId, label: item.menuName }) });
                }
            }
            else if (menuId > 0) {
                const menus = menu.menus.filter(men => men.fMenuId == menuId);
                if (menus.length !== 0) {
                    menus.map((item) => { resultArray.push({ id: item.menuId, label: item.menuName }) });
                }
            }
        }
        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

const DrpSubMenu = (MenuId: any) => {
    let resultArray = [{ id: 0, label: "Select" }];
    let subMenu;
    try {
        if (MenuId > 0 && MenuId != undefined)
            subMenu = DrpMenus(MenuId);
        else
            subMenu = resultArray;

        return subMenu;
    }
    catch (ex) {
        return resultArray;
    }
}


const drp = { DrpState, DrpRoles, DrpMenus, DrpSubMenu };
export default drp;