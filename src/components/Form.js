import { Button, Input, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addThumbnail, uploadVideo } from "../api";
import { videoActions } from "../store/videoSlice";
import { useState } from "react";

const Form = ({ handleSubmit, handleChange }) => {
  const dispatch = useDispatch();
  const newVideo = useSelector((state) => state.video.newVideo);
  const [flag,setFlag]=useState(false);

  const handleVideoChange = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const config = {
        header: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("file", e.target.files[0]);
      const { data } = await uploadVideo(formData, config);
      const file = {
        filePath: data.filePath,
        fileName: data.fileName,
      };
      dispatch(videoActions.setFile(file));

      //generate thumbnail
      const response = await addThumbnail(file);
      dispatch(
        videoActions.setThumbnail({
          thumbnail: response.data.thumbFilePath,
          duration: response.data.fileDuration,
        })
      );
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Input
          type="file"
          name={"video"}
          style={inputStyles}
          label="Upload Video"
          varient="outlined"
          onChange={(e) => handleVideoChange(e)}
        />
        <Input
          type="text"
          name={"name"}
          style={inputStyles}
          label="Name of Video"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Additional contents/Description"
          multiline
          // rows={2}
          // maxRows={4}
          name="description"
          style={inputStyles}
          varient="outlined"
          onChange={(e) => handleChange(e)}
        />
        <Button style={inputStyles} variant="contained" type="Submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default Form;

const formStyle = {
  width: "100%",
  // height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  padding: "10px",
  margin: "20px",
};
const inputStyles = {
  maxWidth: "500px",
  width: "50%",
  margin: "10px",
};
