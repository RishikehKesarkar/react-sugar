import { useDispatch, useSelector } from "react-redux";
import { sliceEnum } from "../common/enum/Enum";
import { stateMaster_GetAll } from "../service/stateMasterService";
import { RootState } from "../store/store";

// state dropdown
const DrpState = () => {
    var items: any;
    const dispatch = useDispatch();
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const state = useSelector((state: RootState) => state.state);
        if (state.status != sliceEnum.error) {
            if (state.dataArr.length === 0) {
                dispatch(stateMaster_GetAll());
                items = state.dataArr;
            }
            else {
                items = state.dataArr;
            }
            items.map((item: any) => { resultArray.push({ id: item.Id, label: item.stateName }) });
        }

        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}

const DrpRoles = () => {
    var items: any;
    const dispatch = useDispatch();
    let resultArray = [{ id: 0, label: "Select" }];
    try {
        const role = useSelector((state: RootState) => state.roleMaster);
        if (role.status != sliceEnum.error) {
            if (role.dataArr.length === 0) {
                dispatch(stateMaster_GetAll());
                items = role.dataArr;
            }
            else {
                items = role.dataArr;
            }
            items.map((item: any) => { resultArray.push({ id: item.Id, label: item.stateName }) });
        }

        return resultArray;
    }
    catch (ex) {
        return resultArray;
    }
}


const drp = { DrpState,DrpRoles };
export default drp;