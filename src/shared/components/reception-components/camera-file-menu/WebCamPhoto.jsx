import { IconButton } from "@mui/material";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import { Box } from "@mui/system";
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "../../../redux/slices/CameraFileSlice";
import { setStateModal } from "../../../redux/slices/CameraFileSlice";
import { setImageMultUrls } from "../../../redux/slices/CameraFileSlice";
import { removeImageMultUrls } from "../../../redux/slices/CameraFileSlice";
export const WebCamPhoto = (props) => {
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const videoConstraints = {
    width: 450,
    height: 450,
    facingMode: "user"
  };
  const webcamRef = useRef(null);

  const removeImage = () => {
    if (dataImage.imageMultUrls[props.position] !== undefined) {
      dispatch(removeImageMultUrls(props.position));
    }
  };

  const captureOnePhoto = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      dispatch(setImageUrl(image));
      dispatch(setStateModal(false));
    }
  }, [webcamRef]);

  const captureMultPhoto = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      removeImage();
      dispatch(setImageMultUrls([image]));
      dispatch(setStateModal(false));
    }
  }, [webcamRef]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        flexDirection: "column",
        borderRadius: "100%",
        overflow: "hidden",
        height: "100%",
        width: "100%",
        background: "black"
      }}
    >
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        width={450}
        height={450}
        videoConstraints={videoConstraints}
      />

      <IconButton
        sx={{ position: "absolute", marginTop: "85%", marginLeft: "44%" }}
        onClick={() =>
          props.type === "mult" ? captureMultPhoto() : captureOnePhoto()
        }
      >
        <LocalSeeIcon sx={{ width: "50px", height: "50px", color: "#FFFF" }} />
      </IconButton>
    </Box>
  );
};
