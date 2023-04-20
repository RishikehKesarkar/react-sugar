import IcommonField from "../IcommonField";
import IroleAccess from "./IroleAccess";
export default interface IroleMaster extends IcommonField{
    Id:number,
    roleName:string,
    description:string,
    roleAccess?:IroleAccess
}