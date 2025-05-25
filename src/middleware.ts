import type { BunRequest } from "bun";

interface FileUpload {
  uniqueName: string;
  name: string;
  file: File;
}

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

  if (contentType?.includes("multipart/form-data")) {
    const filesFormData: FileUpload[] = [];
    const formData = await request.formData()
    const formDataValues = {};

    try {
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          const arrayBuffer = await value.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const uniqueName = `${Date.now()}-${value.name}`;
          await Bun.write(`./uploads/${uniqueName}`, buffer);
          filesFormData.push({
            name: key,
            uniqueName: uniqueName,
            file: value
          });
        } else {
          formDataValues[key] = value;
        }
      }

      return { files: filesFormData, formData: formDataValues };
    } catch (error) {
      console.error("Error parsing form data:", error);
      return {};
    }
  }

  return {};
}