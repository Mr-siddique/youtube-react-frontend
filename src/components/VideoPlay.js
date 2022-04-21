import { Paper, IconButton, Avatar, Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { getAUser, getAllVideosOfAUser } from "../api";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { videoActions } from "../store/videoSlice";

const VideoPlay = () => {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video.currentVideo);
  const youtuber = useSelector((state) => state.video.youtuber);
  const allYoutuberVides = useSelector(
    (state) => state.video.currentYoutuberVideos
  );
  console.log(video);
  const getTheUser = async () => {
    try {
      const { data } = await getAUser(video.user_id);
      dispatch(videoActions.setYoutuber(data));
    } catch (err) {
      console.log(err);
    }
  };
  const getAllVideosOfTheUser = async () => {
    try {
      const { data } = await getAllVideosOfAUser(video.user_id);
      dispatch(videoActions.setCurrentYoutuberVideos(data));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTheUser();
  }, [video]);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Paper elevation={0} style={{ width: "70%", padding: "10px" }}>
        <video width="100%" height="500" controls>
          <source
            src={require("../uploads/" + video.filename)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <h3 style={{ margin: "15px 0px" }}>{video.name}</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "gray" }}>
            <small>
              {video.viewscount} views | {moment(video.created).fromNow()}
            </small>
          </p>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton>
              <ThumbUpAltIcon />
              {video.likescount}
            </IconButton>
            <IconButton>
              {video.likescount}
              <ThumbDownIcon />
            </IconButton>
          </div>
        </div>
        <p>{video.description}</p>
        <Paper
          // fullWidth
          elevation={0}
          style={{
            margin: "20px 0px",
            display:'flex',
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={youtuber.avatar} />
            <p style={{ color: "gray", margin: "5px" }}>
            <small>
              {youtuber.name} <br/>
              {youtuber.subscriberscount} Subscribers 
            </small>    
            </p>
          </div>
          <div>
            <Button style={{ color: "red" }}>Subscribers</Button>
          </div>
        </Paper>
      </Paper>
      <Paper style={{ width: "25%" }}>
        <h1>Hello</h1>
      </Paper>
    </div>
  );
};

export default VideoPlay;

{
  /* <iframe width="1448" height="787" src="https://www.youtube.com/embed/VPVzx1ZOVuw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
}
