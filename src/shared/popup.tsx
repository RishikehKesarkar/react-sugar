import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, PaperProps, Typography } from '@mui/material';
import Draggable from 'react-draggable';
import Control from '../components';
import CloseIcon from '@mui/icons-material/Close';

const PaperComponent = (props: PaperProps) => {
    const draggableRef = React.useRef(null);
    return (
        <Draggable
            nodeRef={draggableRef}
            handle="#scroll-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={draggableRef} />
        </Draggable>
    )
}

interface PopupProps {
    title: string;
    children: any;
    openPopup: boolean;
    setOpenPopup: any;
}

export default function Popup(props: PopupProps) {
    const { title, children, openPopup, setOpenPopup } = props;
    const scroll: DialogProps['scroll'] = ('paper');

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (openPopup) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openPopup]);

    return (
        <div>

            <Dialog
                open={openPopup}
                onClose={() => { setOpenPopup(false) }}
                PaperComponent={PaperComponent}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                hideBackdrop={true} maxWidth='md'
            >
                <DialogTitle id="scroll-dialog-title">
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Control.ActionButton size="small" color="secondary" variant='outlined' onClick={() => setOpenPopup(false)}>
                            <CloseIcon />
                        </Control.ActionButton>
                    </div>
                </DialogTitle>
                <div style={{
                    border: '2px solid', padding: '20px', width: '100%', minWidth:'30%', resize: 'both',
                    overflow: 'auto'
                }}>
                    <DialogContent dividers={scroll === 'paper'}>
                        {/* <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        > */}
                        {children}
                        {/* </DialogContentText> */}
                    </DialogContent>
                </div>
                {/* <DialogActions>
                    <Button onClick={() => { setOpenPopup(false) }}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>

        </div>
    );
}