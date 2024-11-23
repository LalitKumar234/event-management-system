import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// export const BASE_URL = "http://localhost:4500";
export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
