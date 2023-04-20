import IcommonField from "../IcommonField";

export default interface IroleAccess extends IcommonField{
    Id?:number,
    roleId?:number,
    roleAccess?:string
}