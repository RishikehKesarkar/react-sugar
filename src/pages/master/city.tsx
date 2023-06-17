import { useState, useEffect } from 'react';
import Control from "../../components";
import adminLayout from "../../masterLayout/adminLayout";
import { useSelector, useDispatch } from 'react-redux';
import drp from '../../utilities/drpUtil';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import * as yup from 'yup';
import { useFormik } from 'formik';
import crypto from '../../common/crypto';
import { getCity, updateCity } from '../../service/cityMaster-Service';
import { stateMaster_GetAll } from '../../service/stateMasterService';
import { sliceEnum } from '../../common/enum/Enum';
import { toast } from 'react-toastify';
const City = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [states, setState] = useState<any[]>([]);
    const stateArr = useSelector((state) => state);
    const { city, status, httpStatus, message } = useSelector((state: RootState) => state.City);

    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message)
        else if (status == sliceEnum.success) {
            toast.success(message); navigate(-1);
        }
    }, [status, message])

    useEffect(() => {
        setState(drp.DrpState());
    }, [stateArr]);
    useEffect(() => {
        dispatch(stateMaster_GetAll());

        if (crypto.decrypted(id))
            dispatch(getCity(crypto.decrypted(id)));
    }, [id])

    const handleValidation = yup.object({
        cityName: yup.string().required('city name require'),
        pinCode: yup.number().required('pin code require'),
        stateId: yup.number().required('state require')
    })

    const formik = useFormik({
        initialValues: city,
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: cityData => {
            dispatch(updateCity(cityData));
        }
    })

    return (
        <Control.Paper>
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("cityName")} error={formik.errors.cityName}
                            fullWidth label="city name" />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("pinCode")} error={formik.errors.pinCode}
                            fullWidth label="pin code" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("subArea")}
                            fullWidth label="sub Area" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select disablePortal label="state"
                            id="stateId"
                            value={formik.values.stateId}
                            option={states}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('stateId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>

                    <Control.GridItem></Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer>
                            <Control.GridItem></Control.GridItem>
                            <Control.GridItem>
                                <Control.GridContainer>
                                    <Control.GridItem>
                                        <Control.Button text="Submit" type="submit" />
                                    </Control.GridItem>
                                    <Control.GridItem>
                                        <Control.Button text="Back" onClick={() => { navigate(-1) }} />
                                    </Control.GridItem>
                                </Control.GridContainer>
                            </Control.GridItem>

                        </Control.GridContainer>
                    </Control.GridItem>
                </Control.GridContainer>
            </form>
        </Control.Paper>
    )
}

export default adminLayout(City);