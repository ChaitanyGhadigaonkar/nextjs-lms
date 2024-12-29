import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import configureCloudinary from "@/lib/cloudinaryConfig";

// https://stackoverflow.com/questions/75355695/how-to-upload-a-file-to-cloudinary-from-page-server
export async function upload(file: File) {
  const arrayBuffer = await file.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          return reject({ success: false, error });
        }
        return resolve({
          success: true,
          result: {
            url: result?.url,
          },
        });
      })
      .end(buffer);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 400 }
      );
    }

    configureCloudinary();
    const result = await upload(file);

    return NextResponse.json(
      {
        success: true,
        result: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 400 }
    );
  }
}
