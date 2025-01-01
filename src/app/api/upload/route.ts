import { NextRequest, NextResponse } from "next/server";

import configureCloudinary from "@/lib/cloudinaryConfig";
import { upload } from "@/lib/upload";

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
