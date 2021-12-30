import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// State management
import { AppDispatch, RootState } from '../../app/redux/Store';
import {
  emptyEventsList,
  setEventsList
} from '../../app/redux/slices/EventListSlice';
// API
import { getEventThunk } from '../../api/EventListApi';
// Components
import EventTable from './components/EventTable/EventGrid';
import AddEvent from './components/AddEvent/AddEvent';
import AlertMessage from '../../common/Alerts/AlertMessage';

import './Events.scss';

const Events = () => {
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const eventListState = useSelector((state: RootState) => state.eventList);

  useEffect(() => {
    // Set events to state
    dispatch(getEventThunk({}))
      .then((response) => {
        dispatch(setEventsList(response.payload.result));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Failed to retrieve events.');
      });
    return () => {
      // Cleanup on dismount
      dispatch(emptyEventsList());
    };
  }, [dispatch]);

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <AlertMessage
        alertType={errorMessage ? 'error' : 'success'}
        alertMessage={errorMessage}
        setAlertMessage={setErrorMessage}
      />
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
        <Box sx={{ mb: 4 }}>
          <AddEvent />
          {eventListState.loading ? 'loading events ...' : <EventTable />}
        </Box>
      </Box>
    </Container>
  );
};

export default Events;
