import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { AppDispatch, RootState } from '../../app/redux/store';
import { getEventThunk } from '../../api/eventListApi';
import { setEventsList } from '../../app/redux/slices/eventListSlice';

import EventTable from './components/EventTable/EventTable';
import AddEvent from './components/AddEvent/AddEvent';

import './Events.scss';

const Events = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const eventListState = useSelector((state: RootState) => state.eventList);

  useEffect(() => {
    dispatch(getEventThunk({}))
      .then((response) => {
        dispatch(setEventsList(response.payload.result));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Failed to retrieve events.`);
      });
  }, [dispatch]);

  const errorAlert = (
    <Snackbar
      open={errorMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setErrorMessage('');
      }}
    >
      <Alert
        severity="error"
        onClose={() => {
          setErrorMessage('');
        }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" component="div">
          Events
        </Typography>
        {errorAlert}
        <AddEvent />
        {eventListState.loading ? 'loading events ...' : <EventTable />}
      </Stack>
    </>
  );
};

export default Events;
