import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// State management
import { AppDispatch, RootState } from '../../app/redux/store';
import { setEventsList } from '../../app/redux/slices/eventListSlice';
// API
import { getEventThunk } from '../../api/eventListApi';
// Components
import EventTable from './components/EventTable/EventTable';
import AddEvent from './components/AddEvent/AddEvent';

import './Events.scss';

const Events = () => {
  // Feedback alerts
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
        setErrorMessage('Failed to retrieve events.');
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
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="div">
          Events
        </Typography>
        {errorAlert}
        <Box sx={{ mb: 4 }}>
          <AddEvent />
          {eventListState.loading ? 'loading events ...' : <EventTable />}
        </Box>
      </Box>
    </Container>
  );
};

export default Events;
