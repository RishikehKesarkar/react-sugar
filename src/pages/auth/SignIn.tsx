import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate, useLocation } from "react-router-dom";
import { Copyright } from '../../shared/Copyright';
import Loader from '../../shared/loader';
import { sliceEnum } from '../../common/enum/Enum';
import { signIn } from '../../service/authService';
import crypto from '../../common/crypto';
import { checkConnection } from '../../service/checkConnection-Service';
import { toast } from 'react-toastify';
import SessionStorage from '../../common/sessionStorage';
import { getAllMenu } from '../../service/menuMaster-Service';
import { getSessionUser } from '../../common/commonMethod';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { initialAuth } from '../../store/reducer/authSlice';
const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Home";
  const { data, status, httpStatus, message } = useSelector((state: RootState) => state.auth);
  const [disable, setdisable] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(sliceEnum.idle)
  React.useEffect(() => {
    const checkConn = checkConnection().then(res => {
      setdisable(false);
    }).catch(errr => { setdisable(true); toast.error(errr.message) });
  }, [dispatch])
  React.useEffect(() => {
    setisLoading(sliceEnum.idle);
    if (httpStatus == '403') {
      SessionStorage.remove({ name: 'uinfo' });
      dispatch(initialAuth(null));
    }
    else if (httpStatus == '401')
      toast.error(message)
  }, [httpStatus])
  React.useEffect(() => {
    console.log("data", data);
    if (status == sliceEnum.success) {
      SessionStorage.set({ name: 'uinfo', value: crypto.encryptData(data) })
      dispatch(getAllMenu(getSessionUser()?.userId));
      navigate(from, { replace: true });
    }
  }, [status])

  const initialValues = {
    user: '',
    pwd: ''
  }
  const handleValidation = yup.object({
    user: yup.string().required('user name require'),
    pwd: yup.string().required('password require')
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: handleValidation,
    onSubmit: credental => {
      setisLoading(sliceEnum.loading);
      dispatch(signIn(credental));
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={isLoading} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                {...formik.getFieldProps('user')}
                autoFocus label="email" required
                fullWidth
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...formik.getFieldProps('pwd')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disable}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}