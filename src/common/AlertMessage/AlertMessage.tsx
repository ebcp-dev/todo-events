import React, { useState } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';

import './AlertMessage.scss';

const AlertMessage = (props: { alertType: string; alertMessage: string }) => {
  const [open, setOpen] = useState(true);
  return open ? (
    <Alert
      severity={props.alertType as AlertColor}
      onClose={() => {
        setOpen(!open);
      }}
    >
      {props.alertMessage}
    </Alert>
  ) : (
    <></>
  );
};

export default AlertMessage;
