import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Material UI
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// Material Icons
import AddIcon from '@mui/icons-material/Add';
// State management
import { addEvent, IEvent } from '../../../../app/redux/slices/EventListSlice';
import { AppDispatch } from '../../../../app/redux/Store';
// API
import { postEventThunk } from '../../../../api/EventListApi';
// Components
import AlertMessage from '../../../../common/Alerts/AlertMessage';

import './AddEvent.scss';

const AddEvent = () => {
  // Set default toDate 1 hour ahead of fromDate
  const defaultFromDate = new Date();
  const defaultToDate = new Date(defaultFromDate);
  defaultToDate.setHours(defaultToDate.getHours() + 1);
  // Form values
  const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
  const [toDate, setToDate] = useState<Date | null>(defaultToDate);
  const [eventInput, setEventInput] = useState('');
  const [eventCompleted, setEventCompleted] = useState(false);
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleAddEvent = () => {
    // Fields can't be empty
    if (!fromDate || !toDate || !eventInput) {
      setErrorMessage('Enter an event to add.');
      setSuccessMessage('');
      // 'fromDate' must be before 'toDate'
    } else if (fromDate.getTime() >= toDate.getTime()) {
      setErrorMessage(`'To' date must be after 'From' date.`);
      setSuccessMessage('');
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
          setErrorMessage('Failed to add event!');
          setSuccessMessage('');
        });
      setEventCompleted(false);
      setEventInput('');
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
      <AlertMessage
        alertType={errorMessage ? 'error' : 'success'}
        alertMessage={errorMessage ? errorMessage : successMessage}
        setAlertMessage={errorMessage ? setErrorMessage : setSuccessMessage}
      />
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleAddEvent}
        sx={{
          marginTop: 2
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="From"
              renderInput={(props) => <TextField {...props} />}
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="To"
              renderInput={(props) => <TextField {...props} />}
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
            />
          </LocalizationProvider>
          <TextField
            required
            error={errorMessage ? true : false}
            id="outlined-required"
            label="Event"
            placeholder="Add an event"
            value={eventInput}
            onChange={handleTextInput}
          />
          <FormControlLabel
            label="Completed"
            control={
              <Checkbox checked={eventCompleted} onChange={handleCheckbox} />
            }
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddEvent}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddEvent;
