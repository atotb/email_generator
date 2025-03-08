import axios from "axios";

interface ApiResponse {
  response: any;
  id?: any;
  subject?: string;
  body?: string;
}
export async function createNotionPage(data: any): Promise<ApiResponse> {
  try {
    // https://atotb.org/personalized-emails/notion-proxy.php
    const response = await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: {
          database_id: import.meta.env.VITE_REACT_APP_NOTION_DATABASE_ID,
        },
        properties: data,
      },
      {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_APP_NOTION_API_KEY
          }`, // API Key
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    console.log("Page Created:", response.data);
    return { response: response, id: response.data.id };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error creating page:",
        error.response?.data || error.message
      );
      return { response: error.response };
    } else {
      console.error("Error creating page:", error);
      return { response: null };
    }
  }
}

interface MakeResponse {
  response: any;
  formData?: any;
}
export async function sendWebhook(
  data: any,
  formData: any
): Promise<MakeResponse> {
  try {
    const response = await axios.post(
      "https://hook.us2.make.com/58vrk8csvbl56m6qj3imfl5kfbdie016",
      {
        data: {
          id: data.id,
          parent: {
            database_id: import.meta.env.VITE_REACT_APP_NOTION_DATABASE_ID,
          },
          properties: formData,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("webhook response:", response.data);

    console.log("Subject:", response.data.subject);
    console.log("Email Body:", response.data.email_body);

    return { response: response.data };
  } catch (error) {
    console.error("Error sending webhook:", error);
    return { response: null };
  }
}
