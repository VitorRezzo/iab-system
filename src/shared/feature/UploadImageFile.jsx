import ApiServer from "../../services/ApiServer.js";

class UploadImageFile {
  async createUrl(imageurl, cpf) {
    const resp = await fetch(imageurl);
    const blob = await resp.blob();
    const file = new File([blob], "photo", { type: "image/png" });
    const imageFile = new FormData();
    imageFile.append("image", file);
    const url = await ApiServer.post(`/upload-avatar/${cpf}`, imageFile).then(
      (response) => {
        return response.data;
      }
    );
    return url;
  }
}
export default new UploadImageFile();
