import React, { useState } from "react";
import { ImageFile } from "./ImageFile";
import { WebCamPhoto } from "./WebCamPhoto";
import { IconButton, Avatar, Tooltip, Modal, Box } from "@mui/material";
import { FcIntegratedWebcam, FcFolder } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { setStateModal } from "../../../redux/slices/camera-file-slice/CameraFileSlice";

export function CameraFileMenu(props) {
  const data = useSelector((state) => state.cameraFileMenu);
  const [isVisible, setIsVisible] = useState("hidden");
  const dispatch = useDispatch();

  const styledModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    borderRadius: "100%"
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "250px",
          height: "250px"
        }}
        onMouseEnter={() => setIsVisible("visible")}
        onMouseLeave={() => setIsVisible("hidden")}
      >
        <Avatar
          src={
            props.type === "mult"
              ? data.imageMultUrls[props.position]
              : data.imageUrl
          }
          sx={{
            width: "250px",
            height: "250px"
          }}
        />
        <Tooltip title="Tirar Foto">
          <IconButton
            sx={{
              marginTop: "-40%",
              marginLeft: "18%",
              visibility: isVisible
            }}
            onClick={() => {
              dispatch(setStateModal(true));
            }}
          >
            <FcIntegratedWebcam size={40} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Localizar Imagem">
          <IconButton
            sx={{
              marginTop: "-40%",
              marginLeft: "16%",
              visibility: isVisible
            }}
            component="label"
          >
            <FcFolder size={40} component="label" />
            <ImageFile type={props.type} position={props.position} />
          </IconButton>
        </Tooltip>
      </Box>
      <Modal
        open={data.stateModal}
        onClose={() => dispatch(setStateModal(false))}
        describedby="modal-Camera"
      >
        <Box sx={styledModal}>
          <WebCamPhoto type={props.type} position={props.position} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}
