import axios from 'axios';
import { messages } from '../../mockApi/mockData';

const domain = process.env.API_URL;

export const authApi = () =>{ 
  switch(process.env.BUILD) {
  case 'fe-api':
    return {
      post : feApiLoginPost 
    };
  case 'mock-api':
    return axios.create({
      baseURL: `${domain}/auth`,
    });
  default:
    return;
  }
};

export const messageApi = (token) => {
  switch(process.env.BUILD) {
  case 'fe-api':
    return {
      get: feApiGetMessages(token)
    };
  case 'mock-api':
    return axios.create({
      baseURL: `${domain}/api/messages`,
      headers: { Authorization: `Bearer ${token}`}
    });
  default:
    return;
  }
};

// Calls that are right in the front end so we can display them 
// on github pages.
const FE_TIMEOUT = 400;
const feApiLoginPost = async (url, { email, password}) => {
  await timeout(FE_TIMEOUT);
  if(email === 'test@test.com' && password)
  {
    return { data: { access_token: 'fe-made-up-token' } };
  }
  throw new Error('Invalid login');
};

const feApiGetMessages = token => async() => {
  await timeout(FE_TIMEOUT);
  if(token)
    return { data: messages };

  return new Error('No token');
};

const timeout = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));