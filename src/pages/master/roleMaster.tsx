import { useEffect, useState } from "react";
import Control from "../../components";
import adminLayout from "../../hoc/adminLayout";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import TableView from "../../common/table";
import { Grid } from "@mui/material";
import routeConfig from "../../common/routes/routesConfig";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { roleMaster_GetById, roleMaster_Save } from "../../api/roleMasterApi";
import { useFormik } from "formik";
import * as yup from "yup";

const columnDefs = [
    { headerName: 'Select', field: 'Select', filter: true },
    { headerName: 'Sr No', field: 'Id', filter: true },
    { headerName: 'Page Name', field: 'pageName' },
]

const RoleMaster = () => {
    const dispatch = useDispatch();
    const { item } = useSelector((state: RootState) => state.role);
    const Id = 3;
    const [rowData, setRowData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const tempArr: any = [];

    const handleValidation = yup.object({
        roleName: yup.string().required("role name require"),
    })
    const formik = useFormik({
        initialValues: item,
        enableReinitialize: true,
        validationSchema: handleValidation,
        onSubmit: data => {
            console.log("onSubmit", data);
            dispatch(roleMaster_Save(data));
        }
    })


    const checkboxChange = (e: any) => {
        const { checked, id } = e.target;
        if (id.toLowerCase() == "checkall") {
            const checkedValue = rowData.map((row: any) => { tempArr.push(row.Id); return { ...row, isChecked: checked } });
            setRowData(checkedValue);
        }
        else {
            const checkedValue = rowData.map((row: any) =>
                row.Id == id ? { ...row, isChecked: checked } : row);

            checkedValue.filter(filter => filter.isChecked === true).map(reId => { tempArr.push(reId.Id) });
            setRowData(checkedValue);
        }
        formik.setFieldValue('roleAccess.roleAccess', tempArr.toString(), true);
    }

    useEffect(() => {
        dispatch(roleMaster_GetById(Id))
    }, [Id])

    useEffect(() => {
        let routeArray: any = [];
        //if (item.roleAccess?.roleAccess != undefined) {
        const roleAccess = item.roleAccess?.roleAccess;
        routeConfig.filter(route => route.Id != undefined).
            map(s => {
                var id: any = s.Id?.toString();
                routeArray.push({
                    Id: s.Id, pageName: s.title,
                    isChecked: roleAccess?.includes(id) ? true : false
                })
            })
        //}
        setRowData(routeArray);
    }, [item])
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
                    <Grid item xs={12}>
                        <Control.Input value={search} onChange={(e: any) => { setSearch(e.target.value) }} />
                        <TableView filter={search}
                           rowData={rowData}
                            columnDefs={columnDefs}
                            checkboxOnchange={checkboxChange}
                        />
                    </Grid>
                </Control.GridContainer>

            </form>
        </Control.Paper>
    )
}

export default adminLayout(RoleMaster); 