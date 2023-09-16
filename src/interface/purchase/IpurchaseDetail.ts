import { EtranType } from "../../common/enum/Enum";
import IcommonField from "../IcommonField";

export default interface IpurchaseDetail extends IcommonField {
    Id: number;
    purchaseId: number;
    tranType: EtranType;
    itemId: number;
    brandId: number;
    quantal: number;
    packing: number;
    bags: number;
    rate: number;
    itemAmount: number;
    narration: string;
    companyId: number;
    yearId: number;
    detailAction?: 'N' | 'A' | 'U' | 'D'
}
