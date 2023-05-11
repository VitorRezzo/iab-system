class URLToFile {
  convertUrlToFile(image) {
    const dataUrlFile = (dataurl, filename) => {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    };

    const fileImg = dataUrlFile(image, "Photo");
    const ImgData = new FormData();

    ImgData.append("image", fileImg);

    return ImgData;
  }
}
export default new URLToFile();
