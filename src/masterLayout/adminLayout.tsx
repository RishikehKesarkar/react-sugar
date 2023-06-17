import React from "react";
import { Header } from "../shared/header";
import Sidebar from "../shared/sidebar";
import { Copyright } from "../shared/Copyright";
import { Box, CssBaseline } from "@mui/material";
import { styled } from '@mui/material/styles';

const drawerwidth: number = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const adminLayout = (ChildComponent: any) => {

    const RenderHtml = () => {
        const [open, setOpen] = React.useState(false);
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} setOpen={setOpen} drawerwidth={drawerwidth} />
                {/* <!-- Sidebar--> */}
                <Sidebar open={open} setOpen={setOpen} drawerwidth={drawerwidth} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <ChildComponent />
                    <Copyright />
                </Box>
            </Box>
        );
    };

    return RenderHtml;
};

export default adminLayout;
