import React, { useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Typography, IconButton, createTheme, Theme
} from '@mui/material'
import { makeStyles } from "@mui/styles";
import Controls from "../components/index";
import '../assets/css/dialogbox.css';
// import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

// const useStyles = makeStyles((theme:Theme) => ({
//     dialog: {
//         padding: "2",
//         position: 'absolute',
//         top: "5"
//     },
//     dialogTitle: {
//         textAlign: 'center'
//     },
//     dialogContent: {
//         textAlign: 'center'
//     },
//     dialogAction: {
//         justifyContent: 'center'
//     },
//     titleIcon: {
//         backgroundColor: theme.palette.secondary.light,
//         color: theme.palette.secondary.main,
//         '&:hover': {
//             backgroundColor: theme.palette.secondary.light,
//             cursor: 'default'
//         },
//         '& .MuiSvgIcon-root': {
//             fontSize: '8rem',
//         }
//     }
// }))

interface IDialogBoxProps {
    confirmDialog: { isOpen: boolean, isLoading: boolean, title: string, subTitle?: string, onConfirm: any },
    setConfirmDialog: any
}
export default function DialogBox(props: IDialogBoxProps) {
    const { confirmDialog, setConfirmDialog } = props;
    useEffect(() => {
        setConfirmDialog(confirmDialog);
    }, [confirmDialog])
    return (
        <Dialog open={confirmDialog.isOpen} >
            <DialogTitle className="dialogTitle">
                <IconButton disableRipple className="titleIcon">
                    {/* <NotListedLocationIcon /> */}
                </IconButton>
            </DialogTitle>
            <DialogContent className="dialogContent">
                <Typography variant="h6">
                    {confirmDialog?.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog?.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className="dialogAction">
                <Controls.Button
                    text="No"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button disabled={confirmDialog.isLoading}
                    text={confirmDialog.isLoading ? "...Loading" : "Yes"}
                    color="error"
                    onClick={confirmDialog?.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
