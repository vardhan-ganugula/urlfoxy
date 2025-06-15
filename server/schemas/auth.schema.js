import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().nonempty({
    message: "Email is required",
  }),
  password: z.string().min(6).nonempty({
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .nonempty({ message: "Username is required" })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(10, {
      message: "Username must be at most 10 characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .nonempty({ message: "Email is required" })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .nonempty({ message: "Password is required" })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
});
