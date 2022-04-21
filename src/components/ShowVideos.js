import { useDispatch, useSelector } from "react-redux";
import SingleVideo from "./SingleVideo";
import { fetchVideos } from "../api";
import { videoActions } from "../store/videoSlice";
import { useEffect } from "react";

const ShowVideos = () => {
  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state.video.allVideos);
  console.log(allVideos);
  const getVideos = async () => {
    try {
      const { data } = await fetchVideos();
      dispatch(videoActions.setAllVideo(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
      {allVideos.map((video) => (
        <SingleVideo video={video} key={video.id}/>
      ))}
    </div>
  );
};

export default ShowVideos;
