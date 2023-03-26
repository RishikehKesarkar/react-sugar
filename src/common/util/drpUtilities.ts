import { useDispatch, useSelector } from "react-redux";
import { stateMaster_GetAll } from "../../api/stateMasterApi";
import { companyMaster_GetAll } from "../../api/companyMasterApi";
import { roleMaster_GetAll } from "../../api/roleMasterApi";
import { RootState } from "../../redux/store";
import Dispatch from "./dispatch";
// state dropdown
const DrpState = () => {
    var items: any;
    const dispatch = useDispatch();
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const state = useSelector((state: RootState) => state.state);
        if (!state.isError) {
            if (state.items.length === 0) {
                dispatch(stateMaster_GetAll());
                items = state.items;
            }
            else {
                items = state.items;
            }
            items.map((item: any) => { resultArray.push({ id: item.Id, label: item.stateName }) });
        }

        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

// company dropdown
const DrpCompany = () => {
    var items: any;
    const dispatch = useDispatch();
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const companys = useSelector((state: RootState) => state.company);
        if (!companys.isError) {
            if (companys.items.length === 0) {
                dispatch(companyMaster_GetAll());
                items = companys.items;
            }
            else {
                items = companys.items;
            }
            items.map((item: any) => { resultArray.push({ id: item.Id, label: item.companyName }) });
        }

        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

// role dropdown
const DrpRole = () => {
    var items: any;
    const dispatch = useDispatch();
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const roles = useSelector((state: RootState) => state.role);
        if (!roles.isError) {
            if (roles.items.length === 0) {
                dispatch(roleMaster_GetAll());
                items = roles.items;
            }
            else {
                items = roles.items;
            }
            items.map((item: any) => { resultArray.push({ id: item.Id, label: item.roleName }) });
        }
        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

const drpUtility = { DrpState, DrpCompany, DrpRole };
export default drpUtility;