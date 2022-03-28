import axios from 'axios';
import { Log } from '../typings/types';

const axiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`,
  headers: {
    token: process.env.SECRET_TOKEN || '',
  },
});

// Signal is optional, it allows RQ
// or fetch to cancel any ongoing requests which
// are not needed anymore
export const fetchLogs = async ({ signal, token }: any) => {
  console.log('function called : ', token);
  const res = await axiosInstance.get<Log[]>('/todos', {
    signal,
    headers: {
      token,
    },
  });

  return res.data;
};
