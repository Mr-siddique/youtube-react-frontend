import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const getCurrUser = () => Api.get(`/api/current_user`);

export { getCurrUser };
