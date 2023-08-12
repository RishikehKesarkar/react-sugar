import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Controls from '../components';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Draggable from 'react-draggable'; // Import react-draggable

const StyledDialog = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
}));

const useStyles = makeStyles((theme: Theme) => ({
    dialogTitle: {
        paddingRight: '0px',
    },
}));

interface PopupProps {
    title: string;
    children: any;
    openPopup: boolean;
    setOpenPopup: any;
}

export default function Popup(props: PopupProps) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <StyledDialog>
            <Draggable handle=".draggable-title">
                <Dialog open={openPopup} maxWidth="md" BackdropProps={{ invisible: true }}>
                    {/* The handle=".draggable-title" restricts the dragging behavior to the title element */}
                    <DialogTitle
                        sx={{ paddingRight: '0px' }}
                        className={classes.dialogTitle + " draggable-title"} // Add the class "draggable-title" to the DialogTitle
                    >
                        <div style={{ display: 'flex' }}>
                            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                                {title}
                            </Typography>
                            <Controls.ActionButton color="secondary" onClick={() => setOpenPopup(false)}>
                                <CloseIcon />
                            </Controls.ActionButton>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {children}
                    </DialogContent>
                </Dialog>
            </Draggable>
        </StyledDialog>
    );
}
