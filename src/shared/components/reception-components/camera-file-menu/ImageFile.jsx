import {
  removeImageMultUrls,
  setImageUrl
} from "../../../redux/slices/CameraFileSlice";
import { setImageMultUrls } from "../../../redux/slices/CameraFileSlice";

import { useDispatch, useSelector } from "react-redux";

export function ImageFile(props) {
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);

  const removeImage = () => {
    if (dataImage.imageMultUrls[props.position] !== undefined) {
      dispatch(removeImageMultUrls(props.position));
    }
  };

  const insertImage = (imagedata) => {
    dispatch(setImageUrl(imagedata));
  };

  const insertMultImage = (imagedata) => {
    removeImage();
    dispatch(setImageMultUrls(imagedata));
  };

  return (
    <div style={{ display: "none" }}>
      <input
        type="file"
        onChange={(e) => {
          props.type === "mult"
            ? insertMultImage(URL.createObjectURL(e.target.files[0]))
            : insertImage(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </div>
  );
}
