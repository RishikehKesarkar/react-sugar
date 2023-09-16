import IcommonField from "../IcommonField";
import IpurchaseDetail from "../../interface/purchase/IpurchaseDetail";
import IgstField from "../gst/IgstField";
import { EtranType } from "../../common/enum/Enum";

export default interface Ipurchase extends IcommonField,IgstField {
    purchaseId: number;
    tranType: EtranType;
    doNo: number;
    docDate: string;
    retailStock:number;
    fromId: number;
    unitId: number;
    millId: number;
    fromStation: string;
    toStation: string;
    grade: string;
    lorryNo: string;
    wearhouse: string;
    brokerId: number;
    gstId: number;
    billNo: string;
    millInvDate: string;
    subTotal: number;
    lessFrtRate: number;
    freight: number;
    cashAdvance: number;
    bankCommi: number;
    otherAmount: number;
    billAmount: number;
    dueDays: number;
    netQtl: number;
    ewayBillNo: string;
    tcsRate: number;
    tcsAmount: number;
    netPayable: number;
    tdsRate: number;
    tdsAmount: number;
    companyId: number;
    yearId: number,
    purchaseDetail: IpurchaseDetail[]
}
