import React, { useState } from "react";
import { ImageFile } from "./ImageFile";
import { WebCamPhoto } from "./WebCamPhoto";
import { IconButton, Avatar, Tooltip, Modal, Box } from "@mui/material";
import { FcIntegratedWebcam, FcFolder } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { setStateModal } from "../../../redux/slices/CameraFileSlice";

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
    borderRadius: 5
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "260px",
          height: "260px"
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
            "& .MuiAvatar-img": {
              padding: "25%"
            },
            width: "100%",
            height: "100%"
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "-30%",

            visibility: isVisible
          }}
        >
          <Tooltip title="Tirar Foto">
            <IconButton
              onClick={() => {
                dispatch(setStateModal(true));
              }}
            >
              <FcIntegratedWebcam size={40} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Localizar Imagem">
            <IconButton component="label">
              <FcFolder size={40} component="label" />
              <ImageFile type={props.type} position={props.position} />
            </IconButton>
          </Tooltip>
        </Box>
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
