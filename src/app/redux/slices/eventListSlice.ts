import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface Event {
  _id: string;
  from: string;
  to: string;
  content: string;
  isCompleted: boolean;
  creator: string;
}

// Define a type for the slice state
interface EventListState {
  value: Array<Event>;
}

// Define the initial state using that type
const initialState: EventListState = {
  value: []
};

export const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.value.push(action.payload);
    },
    setEventList: (state, action) => {
      state.value = action.payload.events;
    },
    removeEvent: (state, action) => {
      const eventIndex = state.value.indexOf(action.payload);

      if (eventIndex > -1) {
        state.value.splice(eventIndex, 1);
      }
    },
    removeLastEvent: (state) => {
      state.value.pop();
    }
  }
});

export const { addEvent, setEventList, removeEvent, removeLastEvent } =
  eventListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.eventList.value;

export default eventListSlice.reducer;
