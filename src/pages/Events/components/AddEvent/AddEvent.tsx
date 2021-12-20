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
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
// State management
import { addEvent, IEvent } from '../../../../app/redux/slices/eventListSlice';
import { AppDispatch } from '../../../../app/redux/store';
// API
import { postEventThunk } from '../../../../api/eventListApi';

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
    if (!fromDate || !toDate || !eventInput) {
      setErrorMessage('Enter an event to add.');
      setSuccessMessage(``);
    } else if (fromDate.getTime() >= toDate.getTime()) {
      setErrorMessage(`'To' date must be after 'From' date.`);
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

  const successAlert = (
    <Snackbar
      open={successMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setSuccessMessage('');
      }}
    >
      <Alert
        severity="success"
        onClose={() => {
          setSuccessMessage('');
        }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      {errorAlert}
      {successAlert}
      <Grid container spacing={1}>
        <Grid item>
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
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Event"
            placeholder="Add an event"
            value={eventInput}
            onChange={handleTextInput}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={eventCompleted} onChange={handleCheckbox} />
            }
            label="Completed"
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddEvent}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddEvent;
