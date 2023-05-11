import axios from "axios";

const ApiServer = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND
});

export default ApiServer;
