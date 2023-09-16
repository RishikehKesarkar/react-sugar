import Control from "../../components";
import { Grid } from '@mui/material';
import adminLayout from "../../masterLayout/adminLayout";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import Popup from "../../shared/popup";
import AccountDetail from "./accountDetail";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccount, getAccount, getAccountDetail, getAllAccounts, updateAccount } from "../../service/accountMaster-Service";
import { RootState } from "../../store/store";
import DetailTable from "../../shared/DetailTable";
import { imgIcon } from "../../assets/imgIcon";
import { setaccountDetail, setaccountDetails } from "../../store/reducer/accountMasterSlice";
import { useFormik } from "formik";
import drp from "../../utilities/drpUtil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import crypto from "../../common/crypto";
import ButtonPopup from "../../shared/buttonPopup";
import Loader from "../../shared/loader";
import { sliceEnum } from "../../common/enum/Enum";
import { toast } from "react-toastify";
import Iaccount from "../../interface/account/Iaccount";
import * as yup from "yup";
import IaccountDetail from "../../interface/account/IaccountDetail";

const headCells: IHeadCell[] = [
    {
        id: 'name',
        numeric: false,
        label: 'Name'
    },
    {
        id: 'mobileNo',
        numeric: true,
        label: 'Mobile',
        filter: true
    },
    {
        id: 'email',
        numeric: false,
        label: 'Email'
    },
];

const Account = () => {
    const { id } = useParams();
    const [openPopup, setOpenPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const drcroption = [
        { label: "Debit", id: 'debit' }, { label: "Credit", id: 'credit' }
    ];
    const { accounts, account, status, httpStatus, message } = useSelector((state: RootState) => state.account);
    useEffect(() => {
        if (httpStatus === '403') {
            navigate('/', { state: { from: location }, replace: true });
        } else if (status === sliceEnum.error) {
            toast.error(message);
        } else if (status === sliceEnum.success) {
            toast.success(message);
            navigate(-1);
        }
    }, [status, message, httpStatus]);
    useEffect(() => {
        if (accounts.length == 0) {
            dispatch(getAllAccounts());
        }
        if (crypto.decrypted(id)) {
            dispatch(getAccount(crypto.decrypted(id)));
        }
    }, [id, dispatch]);

    const handleDetailAddClick = () => {
        const handleAddClick = () => {
            dispatch(setaccountDetail(null));
            setOpenPopup(true);
        };
        return (
            <imgIcon.Tooltip title="Add">
                <imgIcon.IconButton id="Add" onClick={handleAddClick} color='primary'>
                    <imgIcon.AddIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };

    const handleDetailEditClick = (props: any) => {
        const { row } = props;
        const handleEditClick = () => {
            setOpenPopup(true);
            dispatch(setaccountDetail(row));
        };
        return (
            <imgIcon.Tooltip title="edit">
                <imgIcon.IconButton id="edit" size="small" onClick={handleEditClick} color='primary'>
                    <imgIcon.EditIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };
    const handleDetailDeleteClick = (props: any) => {
        const { row } = props;
        const newSelected = account.accountContactDetail ? [...account.accountContactDetail] : [];
        const handleDeleteClick = () => {
            const foundIndex = newSelected.findIndex((looprow) => looprow === row);
            if (row.Id == 0) {
                newSelected.splice(foundIndex, 1);
            }
            else {
                const updatedRow = { ...row, detailAction: "D" }; // Create a new object with the updated detailAction property
                newSelected[foundIndex] = updatedRow;
            }
            dispatch(setaccountDetails(newSelected));
        };
        return (
            <imgIcon.Tooltip title="delete">
                <imgIcon.IconButton size="small" id="delete" onClick={handleDeleteClick} color='error'>
                    <imgIcon.DeleteIcon />
                </imgIcon.IconButton>
            </imgIcon.Tooltip>
        );
    };
    const onSubmit = useCallback(
        (account: Iaccount) => {
            console.log("account", account);
            const action = (crypto.decrypted(id)) ? updateAccount(account) : createNewAccount(account);
            dispatch(action);
        },
        [dispatch]
    );
    const checkPresentValue = (values: any) => {
        const { shortName, accountName } = values;
        const isShortNamePresent = accounts.some((row) => row.shortName === shortName);
        const isAccountNamePresent = accounts.some((row) => row.accountName === accountName);
        return {
            shortName: !isShortNamePresent, // Return true if shortName is not present
            accountName: !isAccountNamePresent, // Return true if accountName is not present
        };
    };

    // ...

    const handleValidation = yup.object({
        shortName: yup.string().required("Short Name is required")
            .test({ name: "is-present", test: (value, context) => checkPresentValue(context.parent).shortName, message: "Short Name is already present.", }),
        accountName: yup.string().required("Account Name is required")
            .test({ name: "is-present", test: (value, context) => checkPresentValue(context.parent).accountName, message: "Account Name is already present.", }),
        // ... Other fields validation rules ...
    });

    const formik = useFormik({
        initialValues: account,
        validationSchema: handleValidation,
        enableReinitialize: true,
        onSubmit
    });
    const { errors, touched } = formik;
    return (
        <Control.Paper>
            <Loader isLoading={status} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Control.Input label="short Name" {...formik.getFieldProps('shortName')}
                                    error={touched.shortName && errors.shortName} />
                            </Grid>
                            <Grid xs={12} sm={7} item>
                                <Control.Input
                                    label="account Name" fullWidth {...formik.getFieldProps('accountName')}
                                    error={touched.accountName && errors.accountName}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Select
                                    disablePortal label="account type"
                                    value={formik.values.acType}
                                    option={drp.DrpaccountType()}
                                    id="acType"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('acType', value.id, true);
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select
                                    disablePortal label="limit"
                                    value={formik.values.limitBy}
                                    option={[{ id: 0, label: 'No Limit' }, { id: 1, label: 'By Limit' }]}
                                    id="limitBy"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('limitBy', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Control.Input label="interest Rate" {...formik.getFieldProps('interestRate')} />
                            </Grid>
                            <Grid item>
                                <Control.Input label="commision Rate" {...formik.getFieldProps('commisionRate')} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Control.Input label="insurance Rate" {...formik.getFieldProps('insuranceRate')} />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Control.Input label="Address" fullWidth multiline {...formik.getFieldProps('accountAddress')} />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Control.Input label="optional Address" fullWidth multiline {...formik.getFieldProps('optionalAddress')} />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Select
                                    disablePortal label="state"
                                    value={formik.values.stateId || 0}
                                    option={drp.DrpState()}
                                    id="stateId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select
                                    disablePortal label="City"
                                    value={formik.values.cityId}
                                    option={drp.DrpCity(formik.values.stateId)}
                                    id="cityId"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('cityId', value.id, true);
                                    }}

                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <label>Distance</label> <label>Pincode</label>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Input label="opening balance" fullWidth {...formik.getFieldProps('openingBalance')} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select
                                    disablePortal label="DRCR"
                                    value={formik.values.drcr || ''}
                                    option={drcroption}
                                    id="drcr"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('drcr', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Input label="Bank opening balance" fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="Bank DRCR"
                                    value={formik.values.bankOpDrcr || ''}
                                    option={drcroption}
                                    id="bankOpDrcr"
                                    onChange={(_: any, value: any) => {
                                        formik.setFieldValue('bankOpDrcr', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailTable
                            headCells={headCells}
                            rows={account.accountContactDetail}
                            actions={true}
                            tableActions={{
                                handleAddClick: handleDetailAddClick,
                                handleEditClick: handleDetailEditClick,
                                handleDeleteClick: handleDetailDeleteClick
                            }}
                        />
                    </Grid>
                    <ButtonPopup actions={[{ label: 'Submit', type: 'submit', color: 'success' },
                    { label: 'back', onClick: () => { navigate(-1) }, color: 'primary' }
                    ]} />
                </Grid>
            </form>

            <Popup
                title="Account Detail"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AccountDetail rows={account.accountContactDetail} accountId={id} />
            </Popup>
        </Control.Paper>
    );
};
//Account.layout = adminLayout;
export default adminLayout(Account);
