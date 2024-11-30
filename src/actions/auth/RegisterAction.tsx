"use server";
import db from "@/db/db";
import bcrypt from "bcrypt";

const registerAction = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const isExists = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isExists) {
      return {
        success: false,
        message: "User with email already exists.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User Registered Successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somethings wen's wrong.",
    };
  }
};
export default registerAction;
