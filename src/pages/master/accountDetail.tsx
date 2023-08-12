import { useFormik } from "formik";
import Control from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCallback } from "react";
import IaccountDetail from "../../interface/account/IaccountDetail";
import { setaccountDetail, setaccountDetails } from "../../store/reducer/accountMasterSlice";
import crypto from "../../common/crypto";
import * as yup from 'yup';

interface IaccountDetailProps {
    rows: IaccountDetail[] | undefined,
    accountId: string | undefined
}
const AccountDetail = (props: IaccountDetailProps) => {
    const { rows, accountId } = props;
    const { accountContactDetail } = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();

    const onSubmit = useCallback((accountD: IaccountDetail) => {
        const newSelected = rows ? [...rows] : [];
        console.log("start", newSelected);
        accountD.accId = (crypto.decrypted(accountId)) ? Number(crypto.decrypted(accountId)) : 0;
        const indexPosition = newSelected?.findIndex((row: any) => row === accountContactDetail);
        console.log("indexPosition", indexPosition);
        if (indexPosition >= 0) {
            accountD.detailAction = (accountD.Id == 0) ? 'A' : 'U';
            newSelected[indexPosition] = { ...newSelected[indexPosition], ...accountD };
        }
        else {
            console.log("else");
            accountD.detailAction = "A";
            newSelected.push(accountD);
        }
        dispatch(setaccountDetails(newSelected))
        dispatch(setaccountDetail(null));
        formik.resetForm();
    }, [rows, accountContactDetail, dispatch]);

    const handleValidation = yup.object({
        name: yup.string().required('name is required'),
        mobileNo: yup.number().required('mobileNo is required'),
        email: yup.string().required('email is required'),
        panNo: yup.string().required('panNo is required'),
    });

    const formik = useFormik({
        initialValues: accountContactDetail,
        validationSchema: handleValidation,
        enableReinitialize: true,
        onSubmit,
    });

    const { getFieldProps, errors, touched } = formik;

    return (
        <Control.Paper>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('name')} fullWidth label="Name"
                            error={touched.name && errors.name} />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('mobileNo')} fullWidth label="mobileNo"
                            error={touched.mobileNo && errors.mobileNo} />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('email')} fullWidth label="email"
                            error={touched.email && errors.email} />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('panNo')} fullWidth label="panNo"
                            error={touched.panNo && errors.panNo} />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('other')} fullWidth label="other" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Button type="submit" text="submit" />
                    </Control.GridItem>
                </Control.GridContainer>
            </form>
        </Control.Paper>
    );
};

export default AccountDetail;
