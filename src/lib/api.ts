import axios from "axios";
import { Log } from "./types";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Signal is optional, it allows RQ
// or fetch to cancel any ongoing requests which
// are not needed anymore
export const fetchLogs = async ({ signal }: { signal?: AbortSignal }) => {
  const res = await axiosInstance.get<Log[]>("/todos", {
    signal,
  });

  return res.data;
};
