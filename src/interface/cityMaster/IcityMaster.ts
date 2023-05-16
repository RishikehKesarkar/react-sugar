import IcommonField from "../IcommonField";

export default interface IcityMaster extends IcommonField{
    cityId:number,
    cityName:string,
    stateId:number,
    stateName?:string,
    pinCode:number,
    subArea:string,
}