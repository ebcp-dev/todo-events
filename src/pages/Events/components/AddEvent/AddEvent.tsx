import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEventThunk } from '../../../../api/eventListApi';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { addEvent, IEvent } from '../../../../app/redux/slices/eventListSlice';
import { AppDispatch } from '../../../../app/redux/store';

const AddEvent = () => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [eventInput, setEventInput] = useState('test 1');
  const [eventCompleted, setEventCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleAddEvent = () => {
    if (!fromDate || !toDate || !eventInput) {
      setErrorMessage('Enter an event to add.');
      setSuccessMessage(``);
    } else {
      const event: IEvent = {
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
        content: eventInput,
        isCompleted: eventCompleted
      };
      dispatch(postEventThunk({ eventObject: event }))
        .then((response) => {
          setSuccessMessage(response.payload.message);
          dispatch(addEvent(response.payload.data));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(`Failed to add event!`);
          setSuccessMessage(``);
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
      {successMessage ? (
        <Alert
          severity="success"
          onClose={() => {
            setSuccessMessage('');
          }}
        >
          {successMessage}
        </Alert>
      ) : (
        ''
      )}
      <form onSubmit={handleAddEvent}>
        <Stack spacing={2} direction={'row'} sx={{ mb: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="From"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="To"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
            />
          </LocalizationProvider>
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
