import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  dateOfBirth: z.string().refine((date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= today;
  }, {
    message: "Date of Birth must be in the past",
  }),

  firstName: z.string().min(2, {
      message: "At least 1 character",
    }).max(24).refine(value => /^[A-Za-z]+$/.test(value), {
      message: "Name can only contain letters",
    }),

  lastName: z.string().min(2, {
      message: "At least 1 character",
    }).max(30).refine(value => /^[A-Za-z]+$/.test(value), {
      message: "Last Name can only contain letters",
    }),


  password: z.string().min(6, {
      message: "Password must be at least 8 characters long",
    }).max(42).refine((value) => /^(?=.*[a-z]).+$/.test(value), {
      message: "Password must contain at least one lowercase letter",
    }).refine((value) => /^(?=.*[A-Z]).+$/.test(value), {
      message: "Password must contain at least one uppercase letter",
    }).refine((value) => /^(?=.*[0-9]).+$/.test(value), {
      message: "Password must contain at least one digit",
    }).refine((value) => /^(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).+$/.test(value), {
      message: "Password must contain at least one special character",
    }).refine((value) => /^\S*$/.test(value), {
      message: "Spaces are not allowed",
    }),
});

export const verfifyEmailSchema = z.object({
  code: z.string().min(6, {
      message: "Verification code must be 6 characters long",
    }).max(6),
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
});

export const resetPasswordSchema = z.object({
  password: authSchema.shape.password,
  confirmPassword: authSchema.shape.password,
  code: verfifyEmailSchema.shape.code,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});