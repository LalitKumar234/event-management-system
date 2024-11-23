import { useState } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const useFileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(false);
    const [uploading, setUploading] = useState({
        percentCompleted: 0,
    });


    const uploadFile = async (file: File, creativeId: String, fileName: String, folder: String) => {
        setUploadProgress(true)
        try {
            const s3Client = new S3Client({
                region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1",
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_AWS_ID || "",
                    secretAccessKey: process.env.NEXT_PUBLIC_AWS_KEY || "",
                },
            });
            const key = `${folder}/${creativeId}${fileName}`
            const params = {
                Bucket: "resturant-images-dev",
                Key: key,
                Body: file,
                ContentType: file.type,
            };

            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);
            // console.log(data, "datadatadata")
            const previewLink = `https://resturant-images-dev.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
            // console.log('File uploaded successfully.', previewLink);
            return previewLink;
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploadProgress(false)
        }
    };

    return { uploadFile, uploadProgress, uploading };
};

export default useFileUpload;
