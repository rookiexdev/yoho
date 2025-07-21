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
};

export default config;
