import { toast } from "react-toastify";
import S3FileUpload from "react-s3";

const useContentLogic = () => {
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, 
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  const uploadImageToS3Bucket = async (file, successCallback, errorCallback) => {
    try {
      const result = await S3FileUpload.uploadFile(file, config);
      successCallback(result.location);
    } catch (error) {
      toast.error("unable to upload image. Please try again later");
      console.error(error);
      errorCallback && errorCallback(error);
    }
  };

  return {
    uploadImageToS3Bucket,
  };
};

export { useContentLogic };
