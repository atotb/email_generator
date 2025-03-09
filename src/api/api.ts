import axios from "axios";

interface ApiResponse {
  response: any;
  id?: any;
  subject?: string;
  body?: string;
}
export async function createNotionPage(data: any): Promise<ApiResponse> {
  try {
    const response = await axios.post("/api/notion", data);
    console.log("Page Created:", response.data);
    // console.log("Page Created:", response.data.id);

    return { response: response.data, id: response.data.id };
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
export async function sendWebhook(data: any): Promise<MakeResponse> {
  try {
    const response = await axios.post("/api/make", data);

    console.log("webhook response:", response.data);

    console.log("Subject:", response.data.subject);
    console.log("Email Body:", response.data.email_body);

    return { response: response.data };
  } catch (error) {
    console.error("Error sending webhook:", error);
    return { response: null };
  }
}
