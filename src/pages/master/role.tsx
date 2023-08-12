import adminLayout from "../../masterLayout/adminLayout";
import { useFormik } from "formik";
import * as yup from 'yup';
import Control from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { RootState, getState } from "../../store/store";
import { toast } from "react-toastify";
import { ERouteType, sliceEnum } from "../../common/enum/Enum";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import CustomTable from "../../shared/CustomTable";
import crypto from "../../common/crypto";
import { createNewRole, getRole, updateRole } from "../../service/roleMaster-Service";

const headCells: IHeadCell[] = [
    {
        id: 'Id',
        numeric: false,
        disablePadding: true,
        label: 'sr No'
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'page Name'
    },
]

const Role = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [pageArr, setPageArr] = useState<any>([])
    const { data, status, httpStatus, message } = useSelector((state: RootState) => state.roleMaster);
    const auth = getState().auth.data;
    const { pages } = useSelector((state: RootState) => state.pages);
    const { id } = useParams();

    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message)
        else if (status == sliceEnum.success) {
            toast.success(message); navigate('/role');
        }
    }, [status, message])

    useEffect(() => {
        if (crypto.decrypted(id)) {
            dispatch(getRole(crypto.decrypted(id)));
        }
    }, [id])

    const roleAccess = data.roleAccess?.pages;
    let pageArray: any = [];
    useMemo(() => {
        pages.filter(frows => frows.routeType === ERouteType.private).map((page) => {
            var id: any = page.Id?.toString();
            pageArray.push({
                Id: page.Id,
                path: page.path, title: page.title,
                icon: page.icon, component: page.component,
                hidden: page.hidden, routeType: page.routeType,
                selected: (roleAccess?.includes(id)) ? true : false
            })

        })
        setPageArr(pageArray);
    }, [roleAccess])

    const handleValidation = yup.object({
        roleName: yup.string().required("role name require"),
    })

    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: roledata => {
            const action = (crypto.decrypted(id)) ? updateRole(roledata) : createNewRole(roledata);
            dispatch(action);
        }
    })

    const getTableValue = (props: any) => {
        formik.setFieldValue('roleAccess.pages', props.toString(), true);
    }

    return (
        <Control.Paper>
            <form autoComplete='off' onSubmit={formik.handleSubmit} >
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("roleName")} fullWidth
                            label="role Name" error={formik.errors.roleName} />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>

                    <Control.GridItem>
                        <Control.Input label="discription" {...formik.getFieldProps("description")}
                            fullWidth multiline />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>

                    <Control.GridItem></Control.GridItem>
                    <div>
                        <Control.Button text="Submit" type="submit" />
                        <Control.Button text="Back" onClick={() => navigate(-1)} />
                    </div>

                    <CustomTable tableName="Role" headCells={headCells} rows={pageArr}
                        checkboxRequire={true} tableActions={{ getTableValue }} />
                </Control.GridContainer>
            </form>
        </Control.Paper>
    )

}

export default adminLayout(Role);