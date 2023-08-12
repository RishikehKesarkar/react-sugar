import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import Control from '../../components';
import adminLayout from '../../masterLayout/adminLayout';
import drp from '../../utilities/drpUtil';
import crypto from '../../common/crypto';
import { getCity, updateCity } from '../../service/cityMaster-Service';
import { stateMaster_GetAll } from '../../service/stateMasterService';
import { sliceEnum } from '../../common/enum/Enum';
import { RootState } from '../../store/store';
import IcityMaster from '../../interface/cityMaster/IcityMaster';
import ButtonPopup from '../../shared/buttonPopup';

const City = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [states, setStates] = useState<any[]>([]);

    const { city, status, httpStatus, message } = useSelector(
        (state: RootState) => state.City
    );

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

    // useEffect(() => {
    //     setStates(drp.DrpState());
    // }, [stateArr]);

    useEffect(() => {
        // dispatch(stateMaster_GetAll());
        if (crypto.decrypted(id)) {
            dispatch(getCity(crypto.decrypted(id)));
        }
    }, [id]);

    const handleValidation = yup.object({
        cityName: yup.string().required('City name is required'),
        pinCode: yup.number().required('Pin code is required'),
        stateId: yup.number().required('State is required'),
    });

    const onSubmit = useCallback(
        (cityData: IcityMaster) => {
            console.log("cityData", cityData);
            dispatch(updateCity(cityData));
        },
        [dispatch]
    );

    const handleBackClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const formik = useFormik({
        initialValues: city || {},
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit,
    });

    const { getFieldProps, errors } = formik;

    return (
        <Control.Paper>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input
                            {...getFieldProps('cityName')}
                            error={errors.cityName ?? ''}
                            fullWidth
                            label="City name"
                        />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>
                    <Control.GridItem>
                        <Control.Input
                            {...getFieldProps('pinCode')}
                            error={errors.pinCode ?? ''}
                            fullWidth
                            label="Pin code"
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...getFieldProps('subArea')} fullWidth label="Sub Area" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="State"
                            id="stateId"
                            value={formik.values.stateId}
                            option={drp.DrpState()}
                            onChange={({ _, value }: any) => {
                                formik.setFieldValue('stateId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>
                    <Control.GridItem>
                        <ButtonPopup actions={[{ label: 'Submit', color: 'primary', type: "submit" },
                        { label: 'Back', onClick: handleBackClick, color: 'secondary' }]} />
                    </Control.GridItem>

                </Control.GridContainer>
            </form>
        </Control.Paper>
    );
};

export default adminLayout(City);
