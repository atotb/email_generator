import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: any, res: any) {
  console.log("Received request body:", req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const notionApiKey = process.env.VITE_REACT_APP_NOTION_API_KEY; // Hide API key in Vercel
    const notionDatabaseId = process.env.VITE_REACT_APP_NOTION_DATABASE_ID;

    if (!notionApiKey || !notionDatabaseId) {
      // console.log("Notion API Key:", notionApiKey);
      // console.log("Notion Database ID:", notionDatabaseId);
      return res.status(500).json({ error: "Missing Notion API credentials" });
    }

    const notionResponse = await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: { database_id: notionDatabaseId },
        properties: req.body,
      },
      {
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    return res.status(200).json(notionResponse.data);
  } catch (error: any) {
    console.error("Error calling Notion API:", error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Internal Server Error",
    });
  }
}
