import axios from "axios";

export const api = axios.create({
  baseURL: 'https://192.168.1.2:3333',
})