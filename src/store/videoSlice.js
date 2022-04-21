import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    newVideo: {},
    allVideos: [],
    searchVideos: [],
    userVideos:[],
    currentVideo:{},
    youtuber:{},
    currentYoutuberVideos:[]
  },
  reducers: {
    addVideo(state, action) {
      state.newVideo = {
        ...state.newVideo,
        [action.payload.name]: action.payload.value,
      };
    },
    setUserVideos(state,action){
      state.userVideos=action.payload;
    },
    addUserVideo(state,action){
      state.userVideos=[...state.userVideos,action.payload];
    },
    addAllVideo(state,action){
      state.allVideos=[...state.allVideos,action.payload];
    },
    setFile(state, action) {
      state.newVideo = {
        ...state.newVideo,
        filename: action.payload.fileName,
        filepath: action.payload.filePath,
      };
    },
    setThumbnail(state, action) {
      state.newVideo = {
        ...state.newVideo,
        thumbnail: action.payload.thumbnail,
        duration: action.payload.duration,
      };
    },
    setAllVideo(state, action) {
      state.allVideos = action.payload;
    },
    setNewVideo(state,action){
      state.allVideos=[...state.allVideos,action.payload];
    },
    setSearchVideo(state, action) {
      state.searchVideos = action.payload;
    },
    eraseNewVideo(state){
      state.newVideo={};
    },
    setCurrentVideo(state,action){
      state.currentVideo=action.payload
    },
    setYoutuber(state,action){
      state.youtuber=action.payload;
    },
    setCurrentYoutuberVideos(state,action){
      state.currentYoutuberVideos=action.payload;
    }
  },
});
export const videoActions = videoSlice.actions;
export default videoSlice;
