import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { RootState, AppDispatch } from '../../app/redux/store';
import {
  setEventsList,
  emptyEventsList
} from '../../app/redux/slices/eventListSlice';
import { getEventThunk } from '../../api/eventListApi';

import EventTable from './components/EventTable/EventTable';
import AddEvent from './components/AddEvent/AddEvent';

import './Events.scss';

const Events = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const eventListState = useSelector((state: RootState) => state.eventList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEventThunk({}))
      .then((response) => {
        dispatch(setEventsList(response.payload.result));
      })
      .catch((error) => {
        console.log(error);

        setErrorMessage(`Failed to retrieve events.`);
      });
    return () => {
      emptyEventsList();
    };
  }, [dispatch]);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom component="div">
          Events
        </Typography>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
        <AddEvent eventsList={eventListState.events} />
      </Stack>
      {eventListState.loading ? (
        'loading events ...'
      ) : (
        <EventTable eventRows={eventListState.events} />
      )}
    </>
  );
};

export default Events;
