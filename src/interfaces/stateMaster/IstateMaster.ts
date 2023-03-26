import IcommonField from "../IcommonField";

export default interface IstateMaster extends IcommonField{
    Id:number,
    shortName:string,
    stateName:string,
    countryId:number,
    longitude:string,
    latitude:string,
    
}