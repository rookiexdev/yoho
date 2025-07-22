import { Request, Response } from "express";
import { generateState, verifyState } from "../utils";
import config from "../configs";
import axios from "axios";
import { prisma } from "../connections";
import { logger } from "../utils";

const zohoConfigs = config.zoho;

export const redirectToZoho = (req: Request, res: Response) => {
  const { name, email } = req.query as { name: string; email: string };
  const state = generateState(name, email);
  const authUrl = `${zohoConfigs.domain}/oauth/v2/auth?response_type=code&client_id=${zohoConfigs.clientId}&scope=${zohoConfigs.scope}&redirect_uri=${zohoConfigs.redirectUri}&access_type=offline&prompt=consent&state=${state}`;
  res.redirect(authUrl);
};

export const handleZohoCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  try {
    const tokenRes = await axios.post(
      `${zohoConfigs.domain}/oauth/v2/token`,
      null,
      {
        params: {
          code,
          client_id: zohoConfigs.clientId,
          client_secret: zohoConfigs.clientSecret,
          redirect_uri: zohoConfigs.redirectUri,
          grant_type: "authorization_code",
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token } = tokenRes.data;
    const userInfo = JSON.parse(state as string);
    const { name, email } = userInfo;

    await prisma.user.upsert({
      where: { email: email as string },
      update: {
        name: name as string,
        zohoAccessToken: access_token,
        zohoRefreshToken: refresh_token,
      },
      create: {
        email: email as string,
        name: name as string,
        zohoAccessToken: access_token,
        zohoRefreshToken: refresh_token,
      },
    });

    res.status(200).send(`
  <html>
    <head>
      <title>Zoho Auth Successful</title>
      <style>
        body {
          font-family: sans-serif;
          background-color: #f9fafb;
          text-align: center;
          padding: 50px;
        }
        .box {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: inline-block;
        }
        h1 {
          color: #16a34a;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>✅ Authentication Successful!</h1>
        <p>You have been successfully logged in with Zoho.</p>
        <p>You can now close this window or return to the app.</p>
      </div>
    </body>
  </html>
`);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "OAuth failed", success: false });
  }
};
