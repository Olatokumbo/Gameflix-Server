const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadFile = (files) => {
  const promises = [];
  const fileStream1 = fs.createReadStream(files.coverPhoto[0].path);
  const fileStream2 = fs.createReadStream(files.posterPhoto[0].path);
  const filenames = [
    files.coverPhoto[0].filename,
    files.posterPhoto[0].filename,
  ];
  const fileStream = [fileStream1, fileStream2];

  fileStream.map((item, index) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: item,
      Key: filenames[index],
    };

    promises.push(s3.upload(uploadParams).promise());
  });

  return Promise.all(promises);
};

// downloads a file from s3
const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {
      return new Error(err.message);
    });
};

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
