import React from "react";
import Control from "../../components";
import { Grid } from '@mui/material';
import adminLayout from "../../masterLayout/adminLayout";

const Account = () => {
    const option = [
        { label: "MH", id: 1 }, { label: "MH1", id: 2 }
    ];
    return (
        <Control.Paper>
            <form>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid item><Control.Input label="short Name" />
                            </Grid>
                            <Grid xs={12} sm={7} item>
                                <Control.Input
                                    label="account Name" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="account type"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="limit"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Control.Input label="interest Rate" />
                            </Grid>
                            <Grid item>
                                <Control.Input label="commision Rate" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Control.Input label="insurance Rate" />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Control.Input label="Address" fullWidth multiline />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Control.Input label="optional Address" fullWidth multiline />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="state"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="City"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <label >Distance</label> <label >Pincode</label>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Input label="opening balance" fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="DRCR"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Input label="Bank opening balance" fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="Bank DRCR"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <Control.Select disablePortal label="Bank DRCR"
                                    option={option}
                                    id="id"
                                    onChange={(_: any, value: any) => {
                                        //formik.setFieldValue('stateId', value.id, true);
                                    }}
                                />
                            </Grid>
                            {/* <Grid xs={12} sm={6} item>
                                <Control.CheckBox label="Is Carporate Party" />
                            </Grid> */}
                        </Grid>
                    </Grid>

                    

                </Grid>
            </form>
        </Control.Paper>
    )
}

export default adminLayout(Account);