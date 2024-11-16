"use server";
import { headers } from "next/headers";

const uploadFileMutation = async (formData: FormData) => {
  try {
    const headersList = headers();
    const BASE_URL = headersList.get("host");
    console.log(`http://${BASE_URL}/api/upload`);
    const response = await fetch(`http://${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { uploadFileMutation };
