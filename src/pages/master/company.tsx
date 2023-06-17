import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Control from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import adminLayout from '../../masterLayout/adminLayout';
import Loader from '../../shared/loader';
import drp from '../../utilities/drpUtil';
import { RootState, getState } from '../../store/store';
import { sliceEnum } from '../../common/enum/Enum';
import { createNewCompany, getCompany, updateCompany } from '../../service/companyMaster-Service';
import { stateMaster_GetAll } from '../../service/stateMasterService';
import crypto from '../../common/crypto';
const Company = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [states, setState] = useState<any[]>([]);
    const { id }: any = useParams();
    const { data, status, message, httpStatus } = useSelector((state: RootState) => state.companyMaster);
    const stateArr = useSelector((state) => state);
    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message)
        else if (status == sliceEnum.success) {
            toast.success(message); navigate(-1);
        }
    }, [status, message])

    const handleValidation = yup.object({
        shortName: yup.string().required("short name require"),
        companyName: yup.string().required("company name require"),
        companyAddress: yup.string().required("company address require"),
        stateId: yup.number().required("state require"),
        cityName: yup.string().required("city name require"),
        gstNumber: yup.string().required("gst require"),
        cstNumber: yup.string().required("cst require"),
        tinNumber: yup.string().required("tin number require"),
        panNumber: yup.string().required("pan number require"),
        fssaiNumber: yup.string().required("fssai number require"),
        mobileNumber: yup.string().required("mobile number require"),
        emailAddress: yup.string().required("email require"),
    })

    const formik = useFormik({
        initialValues: data, //factory.length==undefined ?factory:
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: companydata => {
            const action = (crypto.decrypted(id)) ? updateCompany(companydata) : createNewCompany(companydata);
            dispatch(action);
        }
    })

    const option = [
        { label: "MH", id: 1 }, { label: "MH1", id: 2 }
    ];
    useEffect(() => {
        setState(drp.DrpState());
    }, [stateArr])
    useEffect(() => {
        if (crypto.decrypted(id))
            dispatch(getCompany(crypto.decrypted(id)));
        dispatch(stateMaster_GetAll());
    }, [id])
    return (
        <>
            <Control.Paper>
                <Loader isLoading={status} />
                <form autoComplete='off' onSubmit={formik.handleSubmit} >
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("shortName")}
                                error={formik.errors.shortName} label="Short Name" />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("companyName")}
                                error={formik.errors.companyName} label="company Name" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("companyAddress")}
                                error={formik.errors.companyAddress} label="company Address" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("optionalAddress")}
                                label="optional address" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <Control.Select disablePortal label="state"
                                        id="stateId"
                                        value={formik.values.stateId}
                                        option={states}
                                        onChange={(_: any, value: any) => {
                                            formik.setFieldValue('stateId', value.id, true);
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <Control.Input {...formik.getFieldProps("cityName")}
                                        error={formik.errors.cityName} label="city name" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="pincode" />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("gstNumber")}
                                error={formik.errors.gstNumber} label="GST" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("cstNumber")}
                                error={formik.errors.cstNumber} label="CST" fullWidth />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("tinNumber")}
                                error={formik.errors.tinNumber} label="TIN" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("panNumber")}
                                error={formik.errors.panNumber} label="Pan No" fullWidth />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("fssaiNumber")}
                                error={formik.errors.fssaiNumber} label="FSSAI No" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("mobileNumber")}
                                error={formik.errors.mobileNumber} label="Mobile" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("emailAddress")}
                                error={formik.errors.emailAddress} label="email" fullWidth />
                        </Grid>

                        <Control.Button text="Submit" type="submit" />
                        <Control.Button text="Back" onClick={() => { navigate(-1) }} />
                    </Grid>
                </form>
            </Control.Paper>
        </>
    )
}

export default adminLayout(Company);