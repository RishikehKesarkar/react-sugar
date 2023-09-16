import IcommonField from "../IcommonField";

export default interface IitemMaster extends IcommonField {
    itemId: number,
    itemType: number,
    itemName: string,
    rate: number,
    purchaseAc: number,
    saleAc: number,
    vatAc: number,
    openingBal: number,
    kgPerKatta: number,
    minRate: number,
    maxRate: number,
    companyCode: number,
    branchCode: number,
    hsn: string,
    openingValue: number,
    gstCode: number,
    markaSet: number,
    supercost: number,
    packing: number,
    lodingGst: number,
    markaPerc: number,
    superPerc: number,
    ratePer: number,
    isService: number
}