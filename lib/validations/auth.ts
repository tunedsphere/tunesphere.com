import * as z from "zod"

export const signUpSchema = z.object({
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

  name: z
    .string()
    .min(2, {
      message: "At least 1 character",
    })
    .max(24)
    .refine(value => /^[A-Za-z]+$/.test(value), {
      message: "Name can only contain letters",
    }),

  lastName: z
    .string()
    .min(2, {
      message: "At least 1 character",
    })
    .max(30)
    .refine(value => /^[A-Za-z]+$/.test(value), {
      message: "Last Name can only contain letters",
    }),


  password: z
    .string()
    .min(6, {
      message: "Password must be at least 8 characters long",
    })
    .max(42)
    .refine((password) => {
      const requirements = [
        /^(?=.*[a-z]).+$/,
        /^(?=.*[A-Z]).+$/,
        /^(?=.*[0-9]).+$/,
        /^(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).+$/,
      ];

      const messages = [
        "Password must contain at least one lowercase letter",
        "Password must contain at least one uppercase letter",
        "Password must contain at least one digit",
        "Password must contain at least one special character",
      ];

      for (let i = 0; i < requirements.length; i++) {
        if (!requirements[i].test(password)) {
          throw new Error(messages[i]);
        }
      }

      return true;
    }),
});

export const logInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 8 characters long",
    })
    .max(42)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).{8,}$/,
      {
        message: "Invalid password",
      }),
})

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const checkEmailSchema = z.object({
  email: logInSchema.shape.email,
});

export const resetPasswordSchema = z.object({
  password: logInSchema.shape.password,
  confirmPassword: logInSchema.shape.password,
  code: verfifyEmailSchema.shape.code,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});