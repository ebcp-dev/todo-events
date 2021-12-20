import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { RootState } from '../../app/redux/store';

import EventTable from './components/EventTable/EventTable';
import AddEvent from './components/AddEvent/AddEvent';

import './Events.scss';

const Events = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const eventListState = useSelector((state: RootState) => state.eventList);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom component="div">
          Events
        </Typography>
        {errorMessage ? (
          <Alert
            severity="error"
            onClose={() => {
              setErrorMessage('');
            }}
          >
            {errorMessage}
          </Alert>
        ) : (
          ''
        )}
        <AddEvent />
      </Stack>
      {eventListState.loading ? 'loading events ...' : <EventTable />}
    </>
  );
};

export default Events;
