import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";
import configs from "../configs";

const awsConfig = configs.aws;

// const s3 = new S3Client({
//   region: awsConfig.region,
//   credentials: {
//     accessKeyId: awsConfig.accessKeyId!,
//     secretAccessKey: awsConfig.secretAccessKey!,
//   },
// });

const getFileName = (originalname: string) => {
  const ext = path.extname(originalname);
  const name = path.basename(originalname, ext).replace(/\s+/g, "_");
  return `${name}_${Date.now()}${ext}`;
};

let upload: multer.Multer;

// if (process.env.NODE_ENV === "production") {
//   upload = multer({
//     storage: multerS3({
//       s3,
//       bucket: awsConfig.bucketName!,
//       acl: "private",
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       key: (_req, file, cb) => {
//         const fileName = `documents/${getFileName(file.originalname)}`;
//         cb(null, fileName);
//       },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   });
// } else {
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, getFileName(file.originalname)),
  });

  upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
// }

export { upload };
