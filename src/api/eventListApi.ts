import axios from 'axios';

const url = 'http://localhost:4000/';

interface User {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export const userSignUp = (user: User) => {
  const newUser: User = {
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin
  };

  return axios
    .post(url + 'api/user/signup', newUser)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const userLogin = (user: User) => {
  const loginInfo: User = {
    username: user.username,
    password: user.password
  };

  return axios
    .post(url + 'api/user/login', loginInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getEvent = (offset: string, limit: string, token: string) => {
  const offsetParam = offset ? `?offset=${offset}` : '';
  const limitParam = limit ? `&limit=${limit}` : '';
  const getUrl = url + `api/event/${offsetParam}${limitParam}`;

  return axios
    .get(getUrl, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};
