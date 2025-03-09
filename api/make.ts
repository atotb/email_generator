import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const notionDatabaseId = process.env.VITE_REACT_APP_NOTION_DATABASE_ID;

    if (!notionDatabaseId) {
      return res.status(500).json({ error: "Missing Database ID" });
    }
    if (!req.body.id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    const notionResponse = await axios.post(
      "https://hook.us2.make.com/58vrk8csvbl56m6qj3imfl5kfbdie016",
      {
        data: {
          id: req.body.notionData.id,
          parent: {
            database_id: process.env.VITE_REACT_APP_NOTION_DATABASE_ID,
          },
          properties: req.body.formData,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json(notionResponse.data);
  } catch (error: any) {
    console.error(
      "Error creating Notion page:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to create Notion page" });
  }
}
