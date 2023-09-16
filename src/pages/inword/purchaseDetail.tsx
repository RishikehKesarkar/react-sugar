import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setpurchase, setpurchaseDetail } from "../../store/reducer/purchaseSlice";
import { RootState } from "../../store/store";
import { CalculateGstAmt } from "../../common/commonMethod";

import Control from "../../components"; // Make sure to import Control from the correct path
import IpurchaseDetail from "../../interface/purchase/IpurchaseDetail";
import Ipurchase from "../../interface/purchase/Ipurchase";
import crypto from "../../common/crypto";
import drp from "../../utilities/drpUtil";
import { EitemType } from "../../common/enum/Enum";

interface PurchaseDetailProps {
  detailRows: IpurchaseDetail[];
  purcId: string;
  purchaseValue: Ipurchase;
  calculatePurchaseTotals: any
}

const PurchaseDetail: React.FC<PurchaseDetailProps> = ({
  detailRows,
  purcId,
  purchaseValue,
  calculatePurchaseTotals
}) => {
  const dispatch = useDispatch();
  const purchaseDetail = useSelector(
    (state: RootState) => state.purchase.purchaseDetail
  );

  const onSubmit = (purchaseD: IpurchaseDetail) => {
    const newSelected = detailRows ? [...detailRows] : [];
    purchaseD.purchaseId = (crypto.decrypted(purcId)) ? Number(crypto.decrypted(purcId)) : 0;
    const indexPosition = newSelected.findIndex((row) => row === purchaseDetail);
    if (indexPosition >= 0) {
      newSelected[indexPosition] = { ...newSelected[indexPosition], ...purchaseD };
    } else {
      newSelected.push(purchaseD);
    }
    const calculatedAmt = calculatePurchaseTotals(newSelected);
    const updatedPurchaseValue = {
      ...purchaseValue,
      ...calculatedAmt
    };

    dispatch(setpurchase(updatedPurchaseValue));
    dispatch(setpurchaseDetail(null));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: purchaseDetail,
    enableReinitialize: true,
    onSubmit,
  });
  const calculateItemAmount = (qtl: any, rate: any) => {
    const newQuantal = qtl != '' ? parseFloat(qtl) : 0;
    const newRate = rate != '' ? parseFloat(rate) : 0;
    formik.setFieldValue("itemAmount", newQuantal * newRate);
  }
  const { getFieldProps, values } = formik;

  return (
    <Control.Paper>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Control.GridContainer>
          <Control.GridItem>
            <Control.Select
              disablePortal label="item"
              value={values.itemId}
              option={drp.DrpItem(EitemType.Item)}
              id="itemId"
              onChange={(_: any, value: any) => {
                formik.setFieldValue('itemId', value.id, true);
              }}
            />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("brandId")} fullWidth label="brand code" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("quantal")} onChange={(e: any) => {
              formik.handleChange(e);
              calculateItemAmount(e.target.value, formik.values.rate);
            }} fullWidth label="qntl" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("packing")} fullWidth label="packing" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("bags")} fullWidth label="bags" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("rate")} onChange={(e: any) => {
              formik.handleChange(e);
              calculateItemAmount(formik.values.quantal, e.target.value);
            }} fullWidth label="rate" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("itemAmount")} disabled fullWidth label="item amount" />
          </Control.GridItem>
          <Control.GridItem>
            <Control.Input {...getFieldProps("narration")} fullWidth label="narration" />
          </Control.GridItem>
          <Control.GridItem></Control.GridItem>
          <Control.GridItem>
            <Control.Button type="submit" text="submit" />
          </Control.GridItem>
        </Control.GridContainer>
      </form>
    </Control.Paper>
  );
};

export default PurchaseDetail;
