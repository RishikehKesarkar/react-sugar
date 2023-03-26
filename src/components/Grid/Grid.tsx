import { Grid as MuiGrid } from "@mui/material";

export const GridContainer = (props: any) => {
    const { ...other } = props;
    return (
        <MuiGrid container spacing={1} {...other}>
            {props.children}
        </MuiGrid>
    )
}

export const GridItem = (props: any) => {
    const { ...other } = props;
    return (
        <MuiGrid xs={12} sm={6} item {...other}>
            {props.children}
        </MuiGrid>
    )
}
