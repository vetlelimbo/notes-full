"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import * as z from "zod";

const userSignUp = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100).trim(),
});

const userSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8),
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

export async function signInAction(formData: FormData) {
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");

  const parsedData = userSignIn.safeParse({
    email: formEmail,
    password: formPassword,
  });

  if (!parsedData.success) {
    return { success: false, error: parsedData.error.format() };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: parsedData.data.email,
        password: parsedData.data.password,
      },
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
