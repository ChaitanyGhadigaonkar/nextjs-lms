import { v2 as cloudinary } from "cloudinary";

// https://stackoverflow.com/questions/75355695/how-to-upload-a-file-to-cloudinary-from-page-server
export async function upload(file: File) {
  const arrayBuffer = await file.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          return reject({ success: false, error });
        }
        return resolve({
          success: true,
          result: {
            url: result?.url,
          },
        });
      })
      .end(buffer);
  });
}
