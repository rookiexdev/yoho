import { Request, Response } from "express";
import { prisma } from "../connections";
import axios from "axios";
import configs from "../configs";
import { logger } from "../utils";

const zohoConfigs = configs.zoho;

export const uploadDocument = async (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded", success: false });
  }

  const { title, email, name } = req.body;
  const fileUrl = req.file.filename;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.zohoAccessToken)
    return res
      .status(404)
      .json({ message: "User not found or not authenticated" });

  try {
    const uploadResponse = await axios.post(
      `${zohoConfigs.signApiBase}/requests`,
      {
        request_name: title,
        action_type: "SIGN",
        signers: [
          {
            recipient_name: name,
            recipient_email: email,
            action: "SIGN",
          },
        ],
        file_urls: [fileUrl],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${user.zohoAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    await prisma.document.create({
      data: {
        title,
        originalUrl: fileUrl,
        userId: user.id,
        status: "sent",
        zohoRequestId: uploadResponse.data.request_id,
      },
    });

    res.status(200).json(uploadResponse.data);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ message: "Failed to create signature request", error });
  }
};
