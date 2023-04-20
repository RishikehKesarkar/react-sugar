import IcommonField from "../IcommonField";
import IsignIn from "./IsignIn";

export default interface IsignUp extends IcommonField,IsignIn {
    Id:number,
    fullName:string,
    stateId:number,
    stateName?:string,
    //cityId:number,
    cityName:string,
    emailAddress:string,
    mobileNumber: number,
    companyId:number,
    comapnyName?:string,
    roleId:number,
    roleName?:string

}