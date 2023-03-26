import internal from "stream";
import IcommonField from "../IcommonField";

export default interface Icompany extends IcommonField{
    Id:number,
    shortName:string,
    companyName:string,
    companyAddress: string,
    optionalAddress?:string,
    stateId:number,
    cityName:string,
    pinCode:number,
    gstNumber:string,
    cstNumber: string,
    tinNumber: string,
    panNumber: string,
    fssaiNumber: string,
    mobileNumber:number,
    emailAddress:string,
}