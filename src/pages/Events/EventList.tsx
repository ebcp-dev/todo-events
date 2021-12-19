import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { RootState, AppDispatch } from '../../app/redux/store';
import {
  IEvent,
  setEventsList,
  emptyEventsList
} from '../../app/redux/slices/eventListSlice';
import { getEventThunk } from '../../api/eventListApi';

import Event from './components/Event/Event';
import AddEvent from './components/AddEvent/AddEvent';

import './EventList.scss';

const EventList = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const eventListState = useSelector((state: RootState) => state.eventList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEventThunk({}))
      .then((response) => {
        dispatch(setEventsList(response));
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
    return () => {
      emptyEventsList();
    };
  }, [dispatch]);

  const renderEventList = eventListState.events.map((item: IEvent) => {
    return (
      <Event
        key={item._id ? item._id : item.id}
        eventId={`${item._id ? item._id : item.id}`}
        eventFrom={item.from}
        eventTo={item.to}
        eventContent={item.content}
      />
    );
  });

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom component="div">
          Event List
        </Typography>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
        <AddEvent />
      </Stack>
      <Stack spacing={2} sx={{ mb: 4 }}>
        {eventListState.loading ? 'loading events ...' : renderEventList}
      </Stack>
    </>
  );
};

export default EventList;
