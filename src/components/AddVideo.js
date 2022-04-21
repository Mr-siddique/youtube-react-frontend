import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postVideo } from "../api";
import { videoActions } from "../store/videoSlice";
import SingleVideo from "./SingleVideo";
import Form from "./Form";
import { useEffect } from "react";
const AddVideo = () => {
  const newVideo = useSelector((state) => state.video.newVideo);
  const user = useSelector((state) => state.user.user);
  const userVideos = useSelector((state) => state.video.userVideos);
  const allVideos = useSelector((state) => state.video.allVideos);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postVideo({ ...newVideo, user_id: user.id });
      dispatch(videoActions.addUserVideo({ ...data, user_id: user.id }));
      dispatch(videoActions.addAllVideo({ ...data, user_id: user.id }));
      dispatch(videoActions.eraseNewVideo());
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormChange = (e) => {
    dispatch(
      videoActions.addVideo({ name: e.target.name, value: e.target.value })
    );
  };
  useEffect(() => {
    dispatch(
      videoActions.setUserVideos(
        allVideos.filter((video) => video.user_id === user.id)
      )
    );
  }, [user]);
  // console.log(user, userVideos, allVideos);

  return (
    <>
      <Form handleChange={handleFormChange} handleSubmit={handleFormSubmit} />
      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
        <h1 style={{width:'100%',margin:'20px'}}>
          {user.name} videos{" "}
          <small style={{ fontWeight: "100", fontSize: "15px", color: "gray" }}>
            {user.email}
          </small>
        </h1>
        {userVideos.map((video) => (
          <SingleVideo key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default AddVideo;

// description: "sjkalkassk"
// duration: 20.666
// filename: "1650434976781_sixth.mp4"
// filepath: "uploads/1650434976781_sixth.mp4"
// name: "Md Amir"
// thumbnail: "thumbnail-1650434976781_sixth.png"
// {
//   filename: '1650437594349_sixth.mp4',
//   filepath: 'uploads/1650437594349_sixth.mp4',
//   thumbnail: 'thumbnail-1650437594349_sixth.png',
//   duration: 20.666,
//   name: 'Aamir Siddique',
//   description: 'ssjsddndsdj'
// }

// user_id, name, description, thumbnail, filename, filepath }
