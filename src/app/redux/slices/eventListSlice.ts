import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface IEvent {
  _id?: string;
  id?: string;
  from: string;
  to: string;
  content: string;
  isCompleted?: boolean;
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
      const dateTimeFormat = new Intl.DateTimeFormat('en-us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
      const event = {
        ...action.payload,
        // parse from ISOstring
        from: dateTimeFormat.format(new Date(action.payload.from)),
        to: dateTimeFormat.format(new Date(action.payload.to))
      };
      state.events.push(event);
    },
    setEventsList: (state, action) => {
      state.loading = true;

      action.payload.forEach((event) => {
        const dateTimeFormat = new Intl.DateTimeFormat('en-us', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        state.events.push({
          ...event,
          // api returns event._id to event.id after postEvent
          // but getEvents response has event._id
          id: event._id ? event._id : event.id,
          // parse from ISOstring
          from: dateTimeFormat.format(new Date(event.from)),
          to: dateTimeFormat.format(new Date(event.to))
        });
      });

      state.loading = false;
    },
    removeEvent: (state, action) => {
      const updatedEvents = state.events.filter(
        (event) => event.id !== action.payload.id
      );
      state.events = updatedEvents;
    },
    updateEvent: (state, action) => {
      // find event by id in state
      state.events.find((obj, index) => {
        // remove by index if found

        if (obj.id === action.payload) {
          state.events.splice(index, 1);
        }
      });
    },
    removeLastEvent: (state) => {
      state.events.pop();
    },
    emptyEventsList: (state) => {
      state.events = [];
    }
  }
});

export const {
  addEvent,
  setEventsList,
  removeEvent,
  updateEvent,
  removeLastEvent,
  emptyEventsList
} = eventListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.eventList.events;

export default eventListSlice.reducer;
