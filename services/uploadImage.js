const uploadImage = async (photo) => {
  const data = new FormData();
  data.append("file", photo);
  data.append("upload_preset", "fsq2vcd4");
  data.append("cloud_name", "ddcppphbi");

  try {
    const fData = await fetch(
      "https://api.cloudinary.com/v1_1/ddcppphbi/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const fDataJson = await fData.json();

    // console.log(fData);
    // console.log(fDataJson.secure_url);

    return fDataJson.secure_url;
  } catch (error) {
    console.log("this is error -> ", error);
  }
};

export default uploadImage;
