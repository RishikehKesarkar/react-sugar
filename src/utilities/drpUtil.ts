import { useDispatch, useSelector } from "react-redux";
import { sliceEnum } from "../common/enum/Enum";
import { stateMaster_GetAll } from "../service/stateMasterService";
import { RootState, dispatch, getState } from "../store/store";

// state dropdown
const DrpState = () => {
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const state = getState().state;
        if (state.status != sliceEnum.error) {
            if (state.dataArr.length != 0) {
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
            if (role.dataArr.length === 0) {
                role.dataArr.map((item) => { resultArray.push({ id: item.Id, label: item.roleName }) });
            }

        }
        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}


const drp = { DrpState, DrpRoles };
export default drp;