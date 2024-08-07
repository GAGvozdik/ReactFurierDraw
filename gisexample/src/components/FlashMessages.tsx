import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface FlashMessageProps {
  text: string;
  type: 'success' | 'error' | 'info';
}

const FlashMessage: React.FC<FlashMessageProps> = ({ text, type }) => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
      enqueueSnackbar('I love snacks.');
    };
  
    const handleClickVariant = (variant: VariantType) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('This is a success message!', { variant });
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick}>Show snackbar</Button>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
        </React.Fragment>
    );
};


export default FlashMessage;