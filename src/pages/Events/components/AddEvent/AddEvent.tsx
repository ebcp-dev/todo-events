import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEventThunk, postEventThunk } from '../../../../api/eventListApi';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import {
  addEvent,
  emptyEventsList,
  IEvent,
  setEventsList
} from '../../../../app/redux/slices/eventListSlice';
import { AppDispatch } from '../../../../app/redux/store';

const AddEvent = () => {
  const [eventInput, setEventInput] = useState('test 1');
  const [eventCompleted, setEventCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleAddEvent = () => {
    if (!eventInput) {
      setErrorMessage('Enter an event to add.');
    } else {
      const minusHour = new Date();
      minusHour.setHours(minusHour.getHours() - 1);
      const event: IEvent = {
        from: minusHour.toISOString(),
        to: new Date().toISOString(),
        content: eventInput,
        isCompleted: eventCompleted
      };
      dispatch(postEventThunk({ eventObject: event }))
        .then((response) => {
          if (response.meta.requestStatus === 'rejected') {
            setErrorMessage('Failed to add event.');
          } else {
            dispatch(addEvent(response.payload.data));
          }
        })
        .catch((error) => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
        });
      setEventInput('');
      setEventCompleted(false);
      setErrorMessage('');
    }
  };

  const handleTextInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventInput(event.currentTarget.value);
  };

  const handleCheckbox = () => {
    setEventCompleted(!eventCompleted);
  };
  return (
    <>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
      <form onSubmit={handleAddEvent}>
        <Stack spacing={2} direction={'row'} sx={{ mb: 4 }}>
          <TextField
            required
            id="outlined-required"
            label="Event"
            placeholder="Add an event"
            value={eventInput}
            onChange={handleTextInput}
          />
          <FormControlLabel
            control={
              <Checkbox checked={eventCompleted} onChange={handleCheckbox} />
            }
            label="Completed"
          />
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddEvent;
