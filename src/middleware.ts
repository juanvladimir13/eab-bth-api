import type { BunRequest } from "bun";

export const loadData = async (request: BunRequest) => {
  const contentType = request.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      const dataJson = await request.json()
      return dataJson;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }

  if (contentType?.includes("application/x-www-form-urlencoded")) {
    try {
      const dataForm = await request.formData()
      return Object.fromEntries(dataForm.entries());
    }
    catch (error) {
      console.error("Error parsing form data:", error);
      return {};
    }
  }

  return {};
}