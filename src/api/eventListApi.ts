import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// Utils
import axiosWithAuth from './axiosWithAuth';

const apiUrl = 'http://localhost:4000/';

export const userSignUpThunk = createAsyncThunk(
  'users/userSignUp',
  async (args: { user }) => {
    const signUpResponse = await axios.post(
      apiUrl + 'api/user/signup',
      args.user
    );

    return await signUpResponse.data;
  }
);

export const userLoginThunk = createAsyncThunk(
  'users/userLogin',
  async (args: { user }) => {
    const loginResponse = await axios.post(
      apiUrl + 'api/user/login',
      args.user
    );

    return await loginResponse.data;
  }
);

export const getEventThunk = createAsyncThunk(
  'events/getEvents',
  async (args: { offset?: string; limit?: string }) => {
    const offsetParam = args.offset ? `?offset=${args.offset}` : '';
    const limitParam = args.limit ? `&limit=${args.limit}` : '';
    const getUrl = apiUrl + `api/event/${offsetParam}${limitParam}`;

    const getResponse = await axiosWithAuth().get(getUrl);

    return await getResponse.data;
  }
);

export const postEventThunk = createAsyncThunk(
  'events/postEvent',
  async (args: { eventObject }) => {
    const postResponse = await axiosWithAuth().post(
      apiUrl + 'api/event/',
      args.eventObject
    );

    return await postResponse.data;
  }
);

export const putEventThunk = createAsyncThunk(
  'events/putEvent',
  async (args: { eventObject }) => {
    const editId = args.eventObject._id
      ? args.eventObject._id
      : args.eventObject.id;
    const putResponse = await axiosWithAuth().put(
      apiUrl + `api/event/${editId}`,
      args.eventObject
    );

    return await putResponse.data;
  }
);

export const deleteEventThunk = createAsyncThunk(
  'events/deleteEvent',
  async (args: { eventId }) => {
    const deleteResponse = await axiosWithAuth().delete(
      apiUrl + `api/event/${args.eventId}`
    );

    return await deleteResponse.data;
  }
);
