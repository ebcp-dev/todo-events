import { createSlice } from '@reduxjs/toolkit';
// import { getEventThunk } from '../../../api/eventListApi';

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
      state.events.push(action.payload);
    },
    setEventsList: (state, action) => {
      if (action.payload.meta.requestStatus === 'pending') {
        state.loading = true;
      }
      if (action.payload.meta.requestStatus === 'fulfilled') {
        state.events = action.payload.payload.result;
        state.loading = false;
      }
      if (action.payload.meta.requestStatus === 'rejected') {
        state.loading = false;
      }
    },
    removeEvent: (state, action) => {
      const eventIndex = state.events.indexOf(action.payload);

      if (eventIndex > -1) {
        state.events.splice(eventIndex, 1);
      }
    },
    removeLastEvent: (state) => {
      state.events.pop();
    },
    emptyEventsList: (state) => {
      state.events.splice(0, state.events.length);
    }
  }
});

export const {
  addEvent,
  setEventsList,
  removeEvent,
  removeLastEvent,
  emptyEventsList
} = eventListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.eventList.events;

export default eventListSlice.reducer;
