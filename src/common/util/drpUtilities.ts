import { useDispatch,useSelector } from "react-redux";
import { getAllFactory } from "../../api/factoryApi";
import { RootState } from "../../redux/store";

const DrpFactory = () => {
   var items: any;
    const factory = useSelector((state: RootState) => state.factory);
    const dispatch = useDispatch();
    if (factory.items.length === 0) {
        dispatch(getAllFactory());
        items=factory.items;
    }
    else{
        items=factory.items;
    }
    let resultArray = [{ id: 0, label: "Select" }];
    items.map((item: any) => { resultArray.push({ id: item.Id, label: item.factoryName }) });

    return resultArray;
}

const drpUtility = { DrpFactory };
export default drpUtility;