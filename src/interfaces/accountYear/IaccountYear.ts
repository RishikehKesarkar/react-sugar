import { DateTimePickerProps } from "@mui/x-date-pickers";
import IcommonField from "../IcommonField";

export default interface IaccountYear extends IcommonField{
    Id:number,
    year:string,
    startDate: string,
    endDate:string,
    companyId:number,
}