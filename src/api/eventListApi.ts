import axios from 'axios';

import axiosWithAuth from './axiosWithAuth';

import { IEvent } from '../app/redux/slices/eventListSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:4000/';

interface User {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export const userSignUp = async (user: User) => {
  const newUser: User = {
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin
  };

  const signUpResponse = await axios.post(url + 'api/user/signup', newUser);

  return await signUpResponse.data;
};

export const userLogin = async (user: User) => {
  const loginInfo: User = {
    username: user.username,
    password: user.password
  };

  const loginResponse = await axios.post(url + 'api/user/login', loginInfo);

  return await loginResponse.data;
};

export const getEventThunk = createAsyncThunk(
  'events/getEvents',
  async (args: { offset?: string; limit?: string }) => {
    const offsetParam = args.offset ? `?offset=${args.offset}` : '';
    const limitParam = args.limit ? `&limit=${args.limit}` : '';
    const getUrl = url + `api/event/${offsetParam}${limitParam}`;

    const getResponse = await axiosWithAuth().get(getUrl);

    return await getResponse.data;
  }
);

export const postEventThunk = createAsyncThunk(
  'events/postEvent',
  async (args: { eventObject: IEvent }) => {
    const postResponse = await axiosWithAuth().post(
      url + 'api/event/',
      args.eventObject
    );

    return await postResponse.data;
  }
);

export const putEventThunk = createAsyncThunk(
  'events/putEvent',
  async (args: { eventObject: IEvent }) => {
    const editId = args.eventObject._id
      ? args.eventObject._id
      : args.eventObject.id;
    const putResponse = await axiosWithAuth().put(
      url + `api/event/${editId}`,
      args.eventObject
    );

    return await putResponse.data;
  }
);
