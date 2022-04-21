import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import { getCurrUser } from "./api";
import { useDispatch,useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import AddVideo from "./components/AddVideo";
import ShowVideos from "./components/ShowVideos";
import VideoPlay from "./components/VideoPlay";
import {videoActions} from "./store/videoSlice";

const App = () => {
  const dispatch = useDispatch();
  const allVideos=useSelector(state=>state.video.allVideos);
  const user=useSelector(state=>state.user.user);
  const currUser = async () => {
    try {
      const {data}= await getCurrUser();
      dispatch(userActions.setUser(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    currUser();
  }, []);
  return (
    <BrowserRouter>
      <Container
        maxWidth="xl"
        style={{
          height: "100vh",
        }}
      >
        <Header />
        <Routes>
            <Route exact path='/' element={<ShowVideos/>}/>
            <Route exact path='/addvideo' element={<AddVideo/>}/>
            <Route exact path='/video/:id' element={<VideoPlay/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
