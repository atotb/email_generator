import axios from "axios";

interface ApiResponse {
  response: any;
  id?: any;
  subject?: string;
  body?: string;
}
export async function createNotionPage(data: any): Promise<ApiResponse> {
  try {
    const response = await axios.post(
      "/api/v1/pages",
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

// {
//             Name: {
//               title: [{ text: { content: name } }],
//             },
//             Email: {
//               email: data.email,
//             },

//             "Active Trail Closure in Plain Text": {
//               multi_select: data.closuresSelection.map((closure: any) => ({
//                 name: closure, // Assuming closuresSelection is an array of strings.
//               })),
//             },
//             "How do you use the trail?": {
//               multi_select: data.trailUsagesSelection.map((usage: any) => ({
//                 name: usage, // Assuming trailUsagesSelection is an array of strings.
//               })),
//             },
//             "Which neighborhood do you live in?": {
//               // Fixing the neighborhood field to match the multi_select format
//               multi_select: [
//                 { name: data.neighborhood }, // neighborhood should be wrapped in an object with `name` key
//               ],
//             },
//             "Anything else you want to mention?": {
//               rich_text: [{ text: { content: data.otherComments } }],
//             },
