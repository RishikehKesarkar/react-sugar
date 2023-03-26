import { useEffect } from "react";
import Control from "../../components";
import { Grid } from '@mui/material';
import adminLayout from "../../hoc/adminLayout";
import * as yup from 'yup';
import { useFormik } from "formik";
import drpUtility from "../../common/util/drpUtilities";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { signUp } from "../../api/signInUpApi";
import { toast } from "react-toastify";
import { Message } from "../../common/util/message";
import { useNavigate } from "react-router-dom";
import { resetSignIn } from "../../redux/reducers/signInSlice";

const handleValidation = yup.object({
  fullName: yup.string().required("full name reuire"),
  cityName: yup.string().required("city require"),
  emailAddress: yup.string().required("email require"),
  mobileNumber: yup.string().required("mobile no requie"),
  userName: yup.string().required("user name require"),
  password: yup.string().required("password require")

})

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item, message, isSuccess, isError } = useSelector((state: RootState) => state.signIn);

  useEffect(() => {
    if (isSuccess) {
      toast.success(Message.success);
      navigate("/Home")
    }
    if (isError) {
      toast.error(message);
    }
    setTimeout(() => {
      dispatch(resetSignIn())
    }, 2000);
  }, [isSuccess, isError])

  const formik = useFormik({
    initialValues: item, //factory.length==undefined ?factory:
    enableReinitialize: true,
    validationSchema: handleValidation,
    onSubmit: data => {
      console.log("data", data);
      dispatch(signUp(data));
    }
  })

  const option = [
    { label: "MH", id: 1 }, { label: "MH1", id: 2 }
  ];

  return (
    <Control.Paper>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid xs={12} sm={6} item>
            <Control.Input {...formik.getFieldProps("fullName")}
              label="full Name" error={formik.errors.fullName} />
          </Grid>
          <Grid xs={12} sm={6} item></Grid>
          <Grid xs={12} sm={6} item>
            <Control.Select disablePortal label="State"
              id="stateId"
              value={formik.values.stateId}
              option={drpUtility.DrpState()}
              onChange={(_: any, value: any) => {
                formik.setFieldValue('stateId', value.id, true);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <Control.Input label="city" fullWidth  {...formik.getFieldProps("cityName")}
              error={formik.errors.cityName} />
          </Grid>

          <Grid xs={12} sm={6} item>
            <Control.Input label="email id" fullWidth {...formik.getFieldProps("emailAddress")}
              error={formik.errors.emailAddress} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <Control.Input label="mobile no" fullWidth {...formik.getFieldProps("mobileNumber")}
              error={formik.errors.mobileNumber} />
          </Grid>

          <Grid xs={12} sm={6} item>
            <Control.Input label="user name" fullWidth {...formik.getFieldProps("userName")}
              error={formik.errors.userName} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <Control.Input label="password" fullWidth {...formik.getFieldProps("password")}
              error={formik.errors.password} />
          </Grid>

          <Grid xs={12} sm={6} item >
            <Control.Select disablePortal label="Role"
              id="roleId"
              value={formik.values.roleId}
              option={drpUtility.DrpRole()}
              onChange={(_: any, value: any) => {
                formik.setFieldValue('roleId', value.id, true);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} item hidden={false}>
            <Control.Select disablePortal label="company"
              id="companyId"
              value={formik.values.companyId}
              option={drpUtility.DrpCompany()}
              onChange={(_: any, value: any) => {
                formik.setFieldValue('companyId', value.id, true);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} item >
          </Grid>
          <Grid xs={12} sm={6} item >
            <Control.Button text="Submit" type="submit" />
          </Grid>
        </Grid>
      </form>
    </Control.Paper>
  )
}

export default adminLayout(SignUp);