import { useState } from "react";
import Control from "../../components";
import adminLayout from "../../masterLayout/adminLayout";
import drp from "../../utilities/drpUtil";
import jsxElement from "../../Routes/pages";
import { ERouteType, sliceEnum } from "../../common/enum/Enum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useFormik } from "formik";
import { createNewPage, getPage, updatePage } from "../../service/pageService";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const DrpPages = () => {
    let resultArray = [{ id: "Select", label: "Select" }];
    const keys = Object.keys(jsxElement);
    keys.map(key => resultArray.push({ id: key, label: key }));

    return resultArray;
}
function isNumber(x: any) {
    return parseFloat(x) == x
};
const DrpRouteType = () => {
    let resultArray = [];
    for (var enumMember in ERouteType) {
        if (isNumber(enumMember)) {
            resultArray.push({ id: Number(enumMember), label: ERouteType[enumMember] })
        }
    }
    return resultArray;
}
const DrpHidden = [
    { id: 1, label: "true" },
    { id: 0, label: "false" }
]

const PageMaster = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useSelector((state: RootState) => state.pages);
    const handleValidation = yup.object({
        pageName: yup.string().test('compare pages value', 'select page',
            function (value: any) {
                //let value1 = this.parent['pageName'];
                let value2 = "Select";
                if (value.toLowerCase() === value2.toLowerCase())
                    return false;
                else
                    return true;
            },
        ),
        title: yup.string().required('title require'),
        path: yup.string().required('path require'),
    })
    const formik = useFormik({
        initialValues: page,
        validationSchema: handleValidation,
        enableReinitialize: true,
        onSubmit: pageData => {
            console.log("pagesData", pageData)
            const action = (pageData.Id === 0 || pageData.Id == null) ? createNewPage(pageData) : updatePage(pageData);
            dispatch(action);
        }
    })
    const handleChange = (value: any) => {
        if (value !== null) {
            dispatch(getPage(value.id));
            formik.setFieldValue('pageName', value.id, true);
            let result;
            if (page.path === "") {
                let dashpos = value.id.indexOf("_");
                if (dashpos > 0)
                    result = "/".concat(value.id.substring(0, dashpos), '/');
                else
                    result = "/".concat(value.id, '/');

                formik.setFieldValue('path', result, true);
                formik.setFieldValue('pageName', value.id, true);
            }
        }

    }
    return (
        <Control.Paper>
            <form onSubmit={formik.handleSubmit}>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Select disablePortal label="Pages"
                            id="pageName"
                            value={formik.values.pageName}
                            option={DrpPages()}
                            onChange={(_: any, value: any) => { handleChange(value) }}
                            error={formik.errors.pageName}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("title")}
                            error={formik.errors.title} fullWidth label="title" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select disablePortal label="Main menu"
                            id="menuId"
                            value={formik.values.menuId}
                            option={drp.DrpMenus()}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('menuId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select disablePortal label="sub menu"
                            id="subMenuId"
                            value={formik.values.subMenuId}
                            option={drp.DrpSubMenu(formik.values.menuId)}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('subMenuId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input {...formik.getFieldProps("path")}
                            error={formik.errors.path} fullWidth label="path" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select disablePortal label="Route type"
                            id="routeType"
                            value={formik.values.routeType}
                            option={DrpRouteType()}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('routeType', value.id, true);
                            }}
                        />
                    </Control.GridItem>

                    <Control.GridItem>
                        <Control.Select disablePortal label="hidden"
                            id="hidden"
                            value={formik.values.hidden}
                            option={DrpHidden}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('hidden', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.GridContainer style={{ marginLeft: "58%", marginTop: '1%' }}>
                            <Control.Button text="Submit" type="submit" />
                            <Control.Button text="Back" onClick={() => { navigate(-1) }} />
                        </Control.GridContainer>
                    </Control.GridItem>
                </Control.GridContainer>
            </form>
        </Control.Paper>
    )
}

export default adminLayout(PageMaster);