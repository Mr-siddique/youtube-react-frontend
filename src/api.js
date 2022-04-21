import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const getCurrUser = () => Api.get(`/api/current_user`);
// const getCurrUser = () =>
//   fetch("http://localhost:5000/api/current_user", { credentials: "include" });

const fetchVideos = () => Api.get("/videos");
// const fetchVideos=fetch('http://localhost:5000/videos');

const uploadVideo = (data, config) => Api.post("/video/upload", data, config);

const addThumbnail = (data) => Api.post("/video/thumbnail", data);

const postVideo = (data) => Api.post("/video", data);

const getAllVideosOfAUser = (userId) => Api.get(`/video/${userId}`);

const getAUser= (userId)=>Api.get(`/user/${userId}`);

export { getCurrUser, fetchVideos, uploadVideo, addThumbnail, postVideo,getAUser,getAllVideosOfAUser };
// elevation={6}
