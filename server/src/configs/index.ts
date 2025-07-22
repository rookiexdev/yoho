import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8081,
  jwtSecret: process.env.JWT_SECRET,
  stateSecret: process.env.STATE_SECRET,
  zoho: {
    domain: process.env.ZOHO_DOMAIN,
    clientId: process.env.ZOHO_CLIENT_ID,
    clientSecret: process.env.ZOHO_CLIENT_SECRET,
    redirectUri: process.env.ZOHO_REDIRECT_URI,
    scope: process.env.ZOHO_SCOPE,
    signApiBase: 'https://sign.zoho.com/api/v1'
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
  }
};

export default config;
