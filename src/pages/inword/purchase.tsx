import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EaccountType, sliceEnum } from "../../common/enum/Enum";
import Control from "../../components";
import adminLayout from "../../masterLayout/adminLayout";
import { getGst } from "../../service/gstMaster-Service";
import Loader from "../../shared/loader";
import Popup from "../../shared/popup";
import drp from "../../utilities/drpUtil";
import PurchaseDetail from "./purchaseDetail";
import { imgIcon } from "../../assets/imgIcon";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import DetailTable from "../../shared/DetailTable";
import { RootState } from "../../store/store";
import { useFormik } from "formik";
import useCommonHook from "../../hooks/useCommonHook";
import { setpurchase, setpurchaseDetail } from "../../store/reducer/purchaseSlice";
import { CalculateGstAmt } from "../../common/commonMethod";
import { getPurchase } from "../../service/purchase-Service";
import { fDateTime } from "../../common/formatDate";
import ButtonPopup from "../../shared/buttonPopup";
import { useParams } from "react-router-dom";
import crypto from "../../common/crypto";

const headCells: IHeadCell[] = [
    { id: "itemId", numeric: false, label: "itemId" },
    { id: "quantal", numeric: true, label: "quantal", filter: true },
    { id: "itemAmount", numeric: true, label: "itemAmount" },
];
const Purchase = () => {
    const { id } = useParams();
    const [openPopup, setOpenPopup] = useState(false);
    const { dispatch, navigate } = useCommonHook();
    const { purchase } = useSelector((state: RootState) => state.purchase);
    const { gst, status } = useSelector((state: RootState) => state.gst);
    useEffect(() => {
        if (crypto.decrypted(id)) {
            dispatch(getPurchase(crypto.decrypted(id)));
        }
    }, [id, dispatch]);
    const formik = useFormik({
        initialValues: purchase,
        enableReinitialize: true,
        onSubmit: val => { }
    });
    const { getFieldProps, values, setFieldValue, setValues } = formik;

    const calculatePurchaseTotals = (newSelected?: any[]) => {
        newSelected = newSelected == undefined ? purchase.purchaseDetail : newSelected;
        const filteredItems = newSelected?.filter((item) => item.detailAction !== "D");
        const subTotalAmt = filteredItems?.reduce((accumulator, currentItem) =>
            accumulator + (Number(currentItem.itemAmount) || 0), 0);

        const netQty = filteredItems?.reduce((total, currentItem) =>
            total + (Number(currentItem.quantal) || 0), 0);

        const amt = CalculateGstAmt(subTotalAmt, gst);
        const frtAmt = (values.lessFrtRate ?? 0) * netQty;
        let tcsAmount: number = 0; let tdsAmount: number = 0;

        const billAmount = Math.round(
            subTotalAmt +
            Number(amt.cgstAmount) +
            Number(amt.sgstAmount) +
            Number(amt.igstAmount) +
            Number(values.bankCommi ?? 0) +
            Number(values.otherAmount ?? 0) +
            Number(values.cashAdvance ?? 0) -
            frtAmt
        );
        tcsAmount = Math.round((billAmount * values.tcsRate) / 100);
        tdsAmount = Math.round((subTotalAmt * values.tdsRate) / 100);
        const netPayable = Math.round(billAmount + tcsAmount - tdsAmount);
        return {
            purchaseDetail: newSelected, subTotal: subTotalAmt, netQtl: netQty,
            cgstAmount: amt.cgstAmount, sgstAmount: amt.sgstAmount, igstAmount: amt.igstAmount,
            cgst: amt.cgst, sgst: amt.sgst, igst: amt.igst,
            freight: frtAmt, billAmount, netPayable, tcsAmount, tdsAmount
        };
    };

    const handleActionClick = (props: any, action: string) => {
        const { row } = props;
        const newSelected = values.purchaseDetail
            ? [...values.purchaseDetail]
            : [];

        if (row.purchaseId === 0) {
            newSelected.splice(newSelected.indexOf(row), 1);
        } else {
            newSelected[newSelected.indexOf(row)] = {
                ...row, detailAction: action == "Delete" ? 'D' : 'N',
            };
        }
        setValues({
            ...values,
            ...calculatePurchaseTotals(newSelected),
        })
        // const updatedPurchaseValue = {
        //     ...values,
        //     ...calculatePurchaseTotals(newSelected),
        // };
        // dispatch(setpurchase(updatedPurchaseValue));
    };
    const handleDetailAddClick = () => {
        return (
            <imgIcon.Tooltip title="Add">
                <imgIcon.IconButton id="Add" onClick={() => setOpenPopup(true)} color='primary'>
                    <imgIcon.AddIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip >
        );
    };
    const handleDetailUndoClick = (props: any) => {
        return (
            <imgIcon.Tooltip title="Undo">
                <imgIcon.IconButton id="Undo" onClick={() => handleActionClick(props, "Undo")} color='primary' size="small">
                    <imgIcon.ReplayIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };
    const handleDetailDeleteClick = (props: any) => {
        return (
            <imgIcon.Tooltip title="delete">
                <imgIcon.IconButton size="small" id="delete" onClick={() => handleActionClick(props, "Delete")} color='error'>
                    <imgIcon.DeleteIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };
    const handleDetailEditClick = (props: any) => {
        const { row } = props;
        const handleEditClick = () => {
            setOpenPopup(true);
            dispatch(setpurchaseDetail(row));
        };
        return (
            <imgIcon.Tooltip title="edit">
                <imgIcon.IconButton id="edit" size="small" onClick={handleEditClick} color='primary'>
                    <imgIcon.EditIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };
    const handleChageEvent = () => {
        const updatedValues = calculatePurchaseTotals(values.purchaseDetail);
        setValues({
            ...values, ...updatedValues
        });
    };
    const handleTdsTcsRateChange = (eventName: 'tcs' | 'tds', newValue: any) => {
        console.log("Handletcs", values.tcsRate);
        console.log("Handletds", values.tdsRate);
    };
    useMemo(() => {
        if (gst && status) {
            handleChageEvent();
        }
    }, [gst, status]);

    return (
        <Control.Paper>
            <Loader isLoading={sliceEnum.idle} />
            <form>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('shortName')} label="Short Name" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('doNo')} label="DO No" />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.datePicker {...getFieldProps('docDate')}
                                    value={values.docDate || ''}
                                    onChange={(date: any) => setFieldValue('docDate', date.$d)}
                                    format="DD/MM/YYYY" name="date" label="date" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="retail stock"
                                    value={values.retailStock}
                                    option={[{ id: 1, label: 'Yes' }, { id: 0, label: 'No' }]}
                                    id="retailStock"
                                    onChange={(_: any, value: any) => {
                                        setFieldValue('retailStock', value.id, true);
                                    }}
                                />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="from"
                                    value={values.fromId}
                                    option={drp.DrpAccounts()}
                                    id="fromId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('fromId', value.id, true);
                                    }}
                                />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="unit"
                                    value={values.unitId}
                                    option={drp.DrpAccounts()}
                                    id="unitId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('unitId', value.id, true);
                                    }}
                                />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="mill"
                                    value={values.fromId}
                                    option={drp.DrpAccounts(EaccountType.Mill)}
                                    id="millId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('millId', value.id, true);
                                    }}
                                />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="broker"
                                    value={values.fromId}
                                    option={drp.DrpAccounts(EaccountType.Broker)}
                                    id="brokerId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('brokerId', value.id, true);
                                    }}
                                />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Select
                                    disablePortal label="gst"
                                    value={values.gstId || 0}
                                    option={drp.DrpGst()}
                                    id="gstId"
                                    onChange={(_: any, value: any) => {
                                        setFieldValue('gstId', value.id, true);
                                        dispatch(getGst(value.id));
                                    }}
                                />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.datePicker {...getFieldProps('millInvDate')}
                                    value={values.millInvDate || ''}
                                    onChange={(date: any) => setFieldValue('millInvDate', date.$d)}
                                    format="DD/MM/YYYY" name="invoice date" label="invoice date" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('billNo')} label="bill no" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('fromStation')} label=" from" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('toStation')} label="to" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('grade')} label="grade" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('lorryNo')} label="lorry no" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('wearhouse')} label="wearhouse" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('netQtl')}
                                    value={values.netQtl || ''} label="net qty" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('ewayBillNo')} label="eway bill" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('dueDays')}
                                    value={values.dueDays || ''} label="due day" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <Grid item xs={12} sm={6}>
                        <DetailTable headCells={headCells} rows={values.purchaseDetail} actions={true}
                            tableActions={{
                                handleAddClick: handleDetailAddClick,
                                handleDeleteClick: handleDetailDeleteClick,
                                handleUndoClick: handleDetailUndoClick,
                                handleEditClick: handleDetailEditClick
                            }} />
                    </Grid>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem></Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('subTotal')}
                                    value={values.subTotal || ''} label="subtotal" fullWidth />
                            </Control.GridItem>
                            <Control.GridItem></Control.GridItem>
                            <Control.GridItem>
                                <Control.GridContainer>
                                    <Grid item xs={12} sm={4}>
                                        <Control.Input {...getFieldProps('cgst')}
                                            value={values.cgst || ''} label="cgst %" />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Control.Input {...getFieldProps('cgstAmount')}
                                            value={values.cgstAmount || ''} label="cgst amt" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Control.Input {...getFieldProps('sgst')}
                                            value={values.sgst || ''} label="sgst %" />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Control.Input {...getFieldProps('sgstAmount')}
                                            value={values.sgstAmount || ''} label="sgst amt" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Control.Input {...getFieldProps('igst')}
                                            value={values.igst || ''} label="igst %" />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Control.Input {...getFieldProps('igstAmount')}
                                            value={values.igstAmount || ''} label="igst amt" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Control.Input
                                            {...getFieldProps('lessFrtRate')} value={values.lessFrtRate || ''}
                                            onBlur={() => {
                                                handleChageEvent(); // Call the custom function on blur.
                                            }}
                                            label="frt %"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Control.Input {...getFieldProps('freight')} label="frt amt"
                                            value={values.freight || ''} fullWidth />
                                    </Grid>
                                </Control.GridContainer>
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.GridContainer>
                                    <Control.GridItem>
                                        <Control.Input {...getFieldProps('bankCommi')} value={values.bankCommi || ''}
                                            onBlur={() => {
                                                handleChageEvent(); // Call the custom function on blur.
                                            }} label="bank commi" fullWidth />
                                    </Control.GridItem>
                                    <Control.GridItem>
                                        <Control.Input {...getFieldProps('otherAmount')} value={values.otherAmount || ''}
                                            onBlur={() => {
                                                handleChageEvent(); // Call the custom function on blur.
                                            }} label="other amt" fullWidth />
                                    </Control.GridItem>
                                </Control.GridContainer>
                            </Control.GridItem>
                            <Control.GridItem>
                                <Control.GridContainer>
                                    <Grid item xs={12} sm={4}>
                                        <Control.Input {...getFieldProps('cashAdvance')} value={values.cashAdvance || ''}
                                            onBlur={() => {
                                                handleChageEvent(); // Call the custom function on blur.
                                            }} label="cash adv" />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Control.Input {...getFieldProps('billAmount')} label="bill amt" fullWidth />
                                    </Grid>
                                </Control.GridContainer>
                            </Control.GridItem>
                            <Grid item xs={12} sm={2}>
                                <Control.Input {...getFieldProps('tcsRate')} label="tcs %" value={values.tcsRate || ''}
                                    onChange={(e: any) => { formik.handleChange(e); formik.setFieldValue('tdsRate', 0, true); }}
                                    onBlur={() => {
                                        handleChageEvent(); // Call the custom function on blur.
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Control.Input {...getFieldProps('tcsAmount')} label="tcs amt"
                                    value={values.tcsAmount || ''} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Control.Input {...getFieldProps('tdsRate')} label="tds %" value={values.tdsRate || ''}
                                    onChange={(e: any) => { formik.handleChange(e); formik.setFieldValue('tcsRate', 0, true); }}
                                    onBlur={() => {
                                        handleChageEvent(); // Call the custom function on blur.
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Control.Input {...getFieldProps('tdsAmount')} label="tds amt"
                                    value={values.tdsAmount || ''} fullWidth />
                            </Grid>
                            <Control.GridItem></Control.GridItem>
                            <Control.GridItem>
                                <Control.Input {...getFieldProps('netPayable')} label="net payable" fullWidth />
                            </Control.GridItem>
                        </Control.GridContainer>
                    </Control.GridItem>
                    <ButtonPopup actions={[{ label: 'Submit', type: 'submit', color: 'success' },
                    { label: 'back', onClick: () => { navigate(-1) }, color: 'primary' }
                    ]} />
                </Control.GridContainer>
            </form>
            <Popup title="details" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <PurchaseDetail detailRows={values.purchaseDetail} purcId={"0"}
                    purchaseValue={formik.values} calculatePurchaseTotals={calculatePurchaseTotals} />
            </Popup>
        </Control.Paper>
    )
}

export default adminLayout(Purchase);


