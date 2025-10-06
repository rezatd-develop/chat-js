import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function CuDialog(props) {
    const handleClose = () => {
        props?.handleClose()
    };

    return (
        <Dialog
            open={props?.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
        >
            <DialogTitle id="alert-dialog-title"
                sx={{ fontFamily: 'yekanBakh-bold' }}>
                {props?.dialogHeader}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"
                    sx={{ fontFamily: 'yekanBakh-bold' }}>
                    {props?.dialogContent}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
