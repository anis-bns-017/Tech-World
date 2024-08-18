import process from 'process'
const url = `https://api.cloudinary.com/v1_1/dx8d44nwb/image/upload`
const uploadImage = async(image) => {
   const formData = new FormData();
   formData.append("file", image);
   formData.append("upload_preset", "mern_product");

   const dataReponse = await fetch(url, {
      method: 'post', 
      body: formData
   })

   return dataReponse.json();
}

export default uploadImage;