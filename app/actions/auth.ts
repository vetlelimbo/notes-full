"use server";
import { auth } from "@/auth";
import * as z from "zod";

const userSignUp = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export async function signUpAction(formData: FormData) {
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");
  const formName = formData.get("name");

  const parsedData = userSignUp.safeParse({
    email: formEmail,
    password: formPassword,
    name: formName,
  });

  if (!parsedData.success) {
    return { success: false, error: parsedData.error.format() };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong creating user. Error: " + err,
    };
  }
}
