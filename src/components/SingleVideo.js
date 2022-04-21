import { Paper } from "@mui/material";
import moment from "moment";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { videoActions } from "../store/videoSlice";
import tImage from "../uploads/thumbnails/thumbnail-1650477661458_first.png";
const images = require.context("../", true);

const SingleVideo = ({ video }) => {
  const { id, name, thumbnail, createdat, duration, viewscount } = video;
  // console.log(thumbnail);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  let [dynamicImage, setdynamicImage] = useState("");
  async function abc() {
    setdynamicImage(await images(`./${thumbnail}`));
  }
  abc();
  return (
    <Paper
      style={paperStyle}
      className="video-paper"
      onClick={(e) => {
        dispatch(videoActions.setCurrentVideo(video));
        navigate(`/video/:${id}`);

      }}
    >
      <img
        // src={require("../" + thumbnail)}
        // src={`../${thumbnail}`}
        // src={tImage}
        src={dynamicImage ? dynamicImage : ""}
        style={{ height: "70%", width: "100%" }}
        className="poster"
      />
      <p style={{ display: "flex" }}>
        <strong>{name}</strong>
      </p>
      <p style={{ color: "gray", marign: "5px" }}>
        <small>{moment(createdat).fromNow()}</small>
        <small style={{ float: "right" }}>{duration} sec</small>
      </p>
      <small style={{ color: "gray" }}>{viewscount} views</small>
    </Paper>
  );
};

export default SingleVideo;

const paperStyle = {
  width: "300px",
  height: "300px",
  margin: "10px",
  padding: "10px",
  cursor: "pointer",
  fontFamily: "inherit",
};
