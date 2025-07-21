import { Request, Response } from "express";
import { generateState, verifyState } from "../utils";
import config from "../configs";
import axios from "axios";
import { prisma } from "../connections";

const zohoConfigs = config.zoho;

export const redirectToZoho = (req: Request, res: Response) => {
  const { email, name } = req.query;
  const state = generateState();
  const authUrl = `${zohoConfigs.domain}/oauth/v2/auth?response_type=code&client_id=${zohoConfigs.clientId}&scope=${zohoConfigs.scope}&redirect_uri=${zohoConfigs.redirectUri}&access_type=offline&prompt=consent&state=${state}&login_hint=${email}`;
  res.redirect(authUrl);
};

export const handleZohoCallback = async (req: Request, res: Response) => {
  const { code, state, email, name } = req.query;
  if (!verifyState(state as string))
    return res.status(403).json({ message: "Invalid state", success: false });

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

    res
      .status(200)
      .json({ message: "Zoho Auth successful. Tokens saved.", success: true });
  } catch (err) {
    res.status(500).json({ message: "OAuth failed", success: false });
  }
};
