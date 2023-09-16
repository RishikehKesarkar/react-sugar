import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

import Control from "../../components";
import adminLayout from "../../masterLayout/adminLayout";
import drp from "../../utilities/drpUtil";
import { createNewPage, getPage, updatePage } from "../../service/pageService";
import { RootState } from "../../store/store";

const PageMaster = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useSelector((state: RootState) => state.pages);
    const handleValidation = yup.object({
        pageName: yup.string().test('compare pages value', 'select page', (value: any) => {
            const value2 = "Select";
            return value.toLowerCase() !== value2.toLowerCase();
        }),
        title: yup.string().required('title require'),
        path: yup.string().required('path require'),
    });

    const formik = useFormik({
        initialValues: page,
        validationSchema: handleValidation,
        enableReinitialize: true,
        onSubmit: pageData => {
            console.log("pageData", pageData);
            const action = (pageData.Id === 0 || pageData.Id == null) ? createNewPage(pageData) : updatePage(pageData);
            dispatch(action);
        }
    });

    const handleChange = (value: any) => {
        if (value !== null) {
            dispatch(getPage(value.id));
            const result = page.path === "" ? `/${value.id.split('_')[0]}/` : page.path;
            formik.setFieldValue('pageName', value.id); // Update the field value
            formik.setFieldValue('path', result); // Update other related field values if needed
        }
    };

    return (
        <Control.Paper>
            <form onSubmit={formik.handleSubmit}>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="Pages"
                            id="pageName"
                            value={formik.values.pageName}
                            option={drp.DrpPages()}
                            onChange={(_: any, value: any) => handleChange(value)}
                            error={formik.touched.pageName && formik.errors.pageName}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input
                            {...formik.getFieldProps("title")}
                            error={formik.touched.title && formik.errors.title}
                            fullWidth
                            label="title"
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="Main menu"
                            id="menuId"
                            value={formik.values.menuId}
                            option={drp.DrpMenus()}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('menuId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="sub menu"
                            id="subMenuId"
                            value={formik.values.subMenuId}
                            option={drp.DrpSubMenu(formik.values.menuId)}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('subMenuId', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input
                            {...formik.getFieldProps("path")}
                            error={formik.touched.path && formik.errors.path}
                            fullWidth
                            label="path"
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="Route type"
                            id="routeType"
                            value={formik.values.routeType}
                            option={drp.DrpRouteType()}
                            onChange={(_: any, value: any) => {
                                formik.setFieldValue('routeType', value.id, true);
                            }}
                        />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Select
                            disablePortal
                            label="hidden"
                            id="hidden"
                            value={formik.values.hidden}
                            option={[{ id: 1, label: "true" }, { id: 0, label: "false" }]}
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
    );
};

export default adminLayout(PageMaster);
