import IcommonField from "../IcommonField";

export default interface accountDetailFiled extends IcommonField {
    Id: number,
    accId: number,
    name: string,
    mobileNo: string,
    email: string,
    panNo: string,
    other: string,
    detailAction?: 'N' | 'A' | 'U' | 'D'
}