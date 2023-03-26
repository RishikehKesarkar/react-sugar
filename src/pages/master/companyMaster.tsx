import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Control from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { companyMaster_Save } from '../../api/companyMasterApi';
import * as yup from 'yup';
import { RootState } from '../../redux/store';
import adminLayout from '../../hoc/adminLayout';
import { resetCompany } from '../../redux/reducers/companyMasterSlice';
import drpUtility from '../../common/util/drpUtilities';
import { Message } from '../../common/util/message';

const CompanyMaster = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id }: any = useParams();
    const { item, message, isSuccess, loading, isError } = useSelector((state: RootState) => state.company);

    const handleValidation = yup.object({
        shortName: yup.string().required("short name require"),
        companyName: yup.string().required("company name require"),
        companyAddress: yup.string().required("company address require"),
        //stateId: yup.number().required("state require"),
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
        initialValues: item, //factory.length==undefined ?factory:
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: data => {
            console.log("data", data);
            dispatch(companyMaster_Save(data));
        }
    })
    const option = [
        { label: "MH", id: 1 }, { label: "MH1", id: 2 }
    ];

    useEffect(() => {
        if (isSuccess) {
            toast.success(Message.success);
            navigate("/Home")
        }
        if (isError) {
            toast.error(message);
        }
        setTimeout(()=>{
            dispatch(resetCompany())},2000);
    }, [isSuccess, isError])

    useEffect(() => {
        //dispatch(get_Factory(id));
    }, [id])
    return (
        <>
            <Control.Paper>
                <form autoComplete='off' onSubmit={formik.handleSubmit} >
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("shortName")}
                                label="Short Name" error={formik.errors.shortName} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("companyName")}
                                label="company Name" fullWidth error={formik.errors.companyName} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input {...formik.getFieldProps("companyAddress")}
                                label="company Address" fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="optional address" fullWidth
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <Control.Select disablePortal label="state"
                                        id="stateId"
                                        value={formik.values.stateId}
                                        option={drpUtility.DrpState()}
                                        onChange={(_: any, value: any) => {
                                            formik.setFieldValue('stateId', value.id, true);
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <Control.Input label="city name" {...formik.getFieldProps("cityName")}
                                        error={formik.errors.cityName} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="pincode" {...formik.getFieldProps("pinCode")}
                                error={formik.errors.pinCode} />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input label="GST" fullWidth {...formik.getFieldProps("gstNumber")}
                                error={formik.errors.gstNumber} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="CST" fullWidth {...formik.getFieldProps("cstNumber")}
                                error={formik.errors.cstNumber} />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input label="TIN" fullWidth {...formik.getFieldProps("tinNumber")}
                                error={formik.errors.tinNumber} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="Pan No" fullWidth {...formik.getFieldProps("panNumber")}
                                error={formik.errors.panNumber} />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <Control.Input label="FSSAI No" fullWidth {...formik.getFieldProps("fssaiNumber")}
                                error={formik.errors.fssaiNumber} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="Mobile" fullWidth {...formik.getFieldProps("mobileNumber")}
                                error={formik.errors.mobileNumber} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Control.Input label="email" fullWidth {...formik.getFieldProps("emailAddress")}
                                error={formik.errors.emailAddress} />
                        </Grid>
                        
                        <Control.Button text="Submit" type="submit" />
                        <Control.Button text="Back" onClick={() => { navigate("/Home") }} />
                    </Grid>
                </form>
            </Control.Paper>
        </>
    )
}

export default adminLayout(CompanyMaster);