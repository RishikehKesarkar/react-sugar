import adminLayout from "../../masterLayout/adminLayout";
import { useFormik } from "formik";
import * as yup from 'yup';
import Control from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import store, { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { sliceEnum } from "../../common/enum/Enum";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import CustomTable from "../../common/CustomTable";
import pages from "../../Routes/pages";
import { pageInterface } from "../../Routes/pages";
import crypto from "../../common/crypto";
import { getRole } from "../../service/roleMaster-Service";

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

const RoleMaster = () => {
    const dispatch = useDispatch();
    const [tablevalue, setTablevalues] = useState<any>({});
    const [pageArr, setPageArr] = useState<readonly pageInterface[]>([])
    const { data, dataArr, status, httpStatus, message } = useSelector((state: RootState) => state.roleMaster);
    const { roles } = useSelector((state: RootState) => state.auth.data);
    const { id } = useParams();

    useEffect(() => {
        if (id != null && id != "")
            dispatch(getRole(crypto.decrypted(id)));
    }, [id])

    useEffect(() => {
        console.log("data", data.roleAccess?.roleAccess);
        pages.map((page) => {
            page.selected = data.roleAccess?.roleAccess?.includes(page.Id.toString()) ? true : false
        })
        setPageArr(pages);
    }, [data.roleAccess?.roleAccess])

    const handleValidation = yup.object({
        roleName: yup.string().required("role name require"),
    })
    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: roledata => {
            console.log("onSubmit", roledata);
        }
    })

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
                    <Control.GridItem><Control.Button text="Submit" type="submit" /> </Control.GridItem>
                    <CustomTable tableName="Role" headCells={headCells} rows={pageArr}
                        checkboxRequire={true} outTableValueState={setTablevalues} />
                </Control.GridContainer>
            </form>
        </Control.Paper>
    )

}

export default adminLayout(RoleMaster);