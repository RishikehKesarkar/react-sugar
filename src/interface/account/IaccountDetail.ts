import IcommonField from "../IcommonField";

export default interface IaccountDetail extends IcommonField {
    Id: number,
    accId: number,
    name: string,
    mobileNo: string,
    email: string,
    panNo: string,
    other: string,
    detailAction?: 'N' | 'A' | 'U' | 'D'
}