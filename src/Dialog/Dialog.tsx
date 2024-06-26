'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export type CommonDialogProps = {
  onClose: () => void;
  title?: string;
  sx?: { [key: string]: string | number };
};
export type DialogProps = CommonDialogProps & {
  onConfirm?: () => void;
  content: React.ReactNode | string;
  ButtonComponent: React.FC<{ onClick: () => void }>;
  ButtonProps: any;
};

const Dialog: React.FC<DialogProps> = ({ onClose, onConfirm, title, content, ButtonComponent, ButtonProps }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleClose() {
    setDialogOpen(false);
    onClose();
  }

  function handleCancel() {
    handleClose();
  }
  return (
    <>
      <ButtonComponent
        onClick={() => {
          setDialogOpen(true);
        }}
        {...ButtonProps}
      />
      <MUIDialog open={dialogOpen} onClose={handleClose} sx={{ position: 'relative' }} PaperProps={{ sx: { pt: '1rem' } }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '0.2rem', right: '0.2rem' }}>
          <Close />
        </IconButton>
        {title && <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>}
        <DialogContent>
          {typeof content === 'string' ? (
            <DialogContentText id='confirmation-dialog-description'>{content}</DialogContentText>
          ) : (
            content
          )}
        </DialogContent>
        {onConfirm && (
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                onConfirm();
              }}
              color='primary'
            >
              Confirm
            </Button>
          </DialogActions>
        )}
      </MUIDialog>
    </>
  );
};

export default Dialog;
