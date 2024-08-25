import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (payload) => api.post("authenticate/sendOtp", payload);

export const verifyOtp = (payload) =>
  api.post("authenticate/verifyOtp", payload);

export const getUSer = (userId) =>
  api.get(`authenticate/getUser?userId=${userId}`);

export const activate = (data) => api.post("authenticate/activate", data);

export const autoReLogin = () => api.get("authenticate/autoReLogin");

export const loginUser = (data) => api.post("authenticate/login", data);

export const logout = () => api.get("authenticate/logout");

export const getRooms = () => api.get("rooms/getRooms");

export const createRoom = (data) => api.post("rooms/createRoom", data);

export const getSingleRoom = (roomId) =>
  api.get(`rooms/getSingleRoom?roomId=${roomId}`);

export const searchUser = (searchText) =>
  api.get(`authenticate/searchUser?searchText=${searchText}`);

export const getUserRoom = (roomType, userName) =>
  api.get(`rooms/getUserRoom?userName=${userName}&roomType=${roomType}`);

export const getSpeakers = (userName) =>
  api.get(`rooms/getSpeakers?userName=${userName}`);

export const requestToJoinRoom = (payload) =>
  api.put(`rooms/requestToJoin`, payload);

export const addMemberToRoom = (payload) =>
  api.put(`rooms/addMemberToRoom`, payload);

export const removeMemberFromRoom = (payload) =>
  api.put(`rooms/removeMemberFromRoom`, payload);

export const getRoomsByTopic = (topicName) =>
  api.get(`rooms/roomsBytTopic?topic=${topicName}`);
export default api;
