import IcommonField from "../IcommonField";

export default interface IgstMaster extends IcommonField {
    Id:number,
    name:string,
    rate:number,
    igst:number,
    sgst:number,
    cgst:number,
    yearCode:number
}