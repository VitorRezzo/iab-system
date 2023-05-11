import FileBase64 from "react-file-base64";
import {
  removeImageMultUrls,
  setImageUrl
} from "../../../redux/slices/camera-file-slice/CameraFileSlice";
import { setImageMultUrls } from "../../../redux/slices/camera-file-slice/CameraFileSlice";

import { useDispatch, useSelector } from "react-redux";

export function ImageFile(props) {
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);

  const removeImage = () => {
    if (dataImage.imageMultUrls[props.position] !== undefined) {
      dispatch(removeImageMultUrls(props.position));
    }
  };

  const insertImage = (e) => {
    dispatch(setImageUrl(e.base64));
  };

  const insertMultImage = (e) => {
    removeImage();
    dispatch(setImageMultUrls([e.base64]));
  };

  return (
    <div style={{ display: "none" }}>
      <FileBase64
        type="file"
        multiple={false}
        onDone={(e) => {
          props.type === "mult" ? insertMultImage(e) : insertImage(e);
        }}
      />
    </div>
  );
}
