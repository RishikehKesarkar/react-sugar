import { useSelector } from "react-redux";
import IgstField from "../interface/gst/IgstField";
import IgstMaster from "../interface/gst/IgstMaster";
import store, { RootState } from "../store/store";
import crypto from "./crypto";
import SessionStorage from "./sessionStorage";
const initialval = {
    userId: 0
}
export const getSessionUser = () => {
    const user = SessionStorage.get({ name: 'uinfo' });
    if (user)
        return crypto.decryptData(user);
    else
        return initialval;
}

export const CalculateGstAmt = (amount: number, gst: IgstMaster) => {
    let gstcalAmt: IgstField = {};
    gstcalAmt.cgstAmount = gst.cgst != null ? amount * gst.cgst / 100 : 0;
    gstcalAmt.sgstAmount = gst.sgst != null ? amount * gst.sgst / 100 : 0;
    gstcalAmt.igstAmount = gst.igst != null ? amount * gst.igst / 100 : 0;
    gstcalAmt.cgst = gst.cgst; gstcalAmt.sgst = gst.sgst; gstcalAmt.igst = gst.igst;
    return gstcalAmt;
}