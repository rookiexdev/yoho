import { Request, Response } from "express";
import { prisma } from "../connections";
import axios from "axios";
import configs from "../configs";

const zohoConfigs = configs.zoho;

export const uploadDocument = async (req: Request, res: Response) => {
  const { userId, title, fileUrl, recipientEmail } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });
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
            recipient_name: user.name,
            recipient_email: recipientEmail,
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
        userId,
        status: "sent",
        zohoRequestId: uploadResponse.data.request_id,
      },
    });

    res.status(200).json(uploadResponse.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create signature request", error });
  }
};
