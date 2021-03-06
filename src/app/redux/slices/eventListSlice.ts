import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../Store';

export interface IEvent {
  _id?: string;
  id?: string;
  from: string;
  to: string;
  content: string;
  isCompleted: boolean;
  creator?: string;
}

// Define a type for the slice state
interface EventListState {
  events: Array<IEvent>;
  loading: boolean;
}

// Define the initial state using that type
const initialState: EventListState = {
  events: [],
  loading: false
};

export const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload];
    },
    setEventsList: (state, action) => {
      state.loading = true;
      const setEvents: IEvent[] = [];
      action.payload.forEach((event) => {
        setEvents.push({
          ...event,
          // api returns event._id to event.id after postEvent
          // but getEvents response has event._id
          id: event._id ? event._id : event.id
        });
      });

      state.events = state.events.concat(setEvents);
      state.loading = false;
    },
    removeEvent: (state, action) => {
      const updatedEvents = state.events.filter(
        (event) => event.id !== action.payload
      );
      state.events = updatedEvents;
    },
    emptyEventsList: (state) => {
      state.events = [];
    }
  }
});

export const { addEvent, setEventsList, removeEvent, emptyEventsList } =
  eventListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.eventList.events;

export default eventListSlice.reducer;
