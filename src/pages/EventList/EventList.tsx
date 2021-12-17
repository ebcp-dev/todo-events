import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RootState } from '../../app/redux/store';
import { addEvent, setEventList } from '../../app/redux/slices/eventListSlice';
import { getEvent } from '../../api/eventListApi';

import Event from './components/Event/Event';

import './EventList.scss';

const TodoList = () => {
  const [eventInput, setEventInput] = useState('');
  const [emptyEventError, setEmptyEventError] = useState('');
  const authState = useSelector((state: RootState) => state.auth);
  const eventListState = useSelector((state: RootState) => state.eventList);
  const dispatch = useDispatch();

  // getEvent('', '', `${authState.sessionContext.user.token}`).then((result) => {
  //   console.log(result);
  //   dispatch(setEventList({ events: result.result }));
  // });

  const handleAddTodo = () => {
    if (!eventInput) {
      setEmptyEventError('Enter an event to add.');
    } else {
      const event = {
        id: '1',
        from: new Date().toISOString(),
        to: new Date().toISOString(),
        content: eventInput,
        creator: authState.userDetails.username,
        isCompleted: false
      };
      dispatch(addEvent(event));
      setEventInput('');
      setEmptyEventError('');
    }
  };

  const handleTextInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventInput(event.currentTarget.value);
  };

  const renderEventList = eventListState.value.map((item) => {
    return (
      <Event
        eventId={item._id}
        eventFrom={item.from}
        eventTo={item.to}
        eventContent={item.content}
        key={item._id}
      />
    );
  });

  return (
    <section className="todoList-section">
      <Container>
        <p>Logged In as: {authState.userDetails.username}</p>
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom component="div">
            Event List
          </Typography>
          {emptyEventError ? (
            <Alert severity="error">{emptyEventError}</Alert>
          ) : (
            ''
          )}
          <Stack spacing={2} direction={'row'}>
            <TextField
              required
              id="outlined-required"
              label="Event"
              placeholder="Add an event"
              value={eventInput}
              onChange={handleTextInput}
            />
            <Button variant="contained" onClick={handleAddTodo}>
              Add Event
            </Button>
          </Stack>
        </Stack>
        {renderEventList}
      </Container>
    </section>
  );
};

export default TodoList;
