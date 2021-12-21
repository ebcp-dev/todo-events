import React from 'react';
// Material UI
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import './AlertMessage.scss';

const AlertMessage = (props) => {
  return (
    <Snackbar
      open={props.alertMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        props.setAlertMessage('');
      }}
    >
      <Alert
        // 'severity' prop of Alert Component accepts AlertColor type
        severity={props.alertType as AlertColor}
        onClose={() => {
          props.setAlertMessage('');
        }}
      >
        {props.alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
