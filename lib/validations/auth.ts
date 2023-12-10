import * as z from "zod"

export const authSignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(42)
    .refine((value) => /^(?=.*[A-Z]).+$/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /^(?=.*[0-9]).+$/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).+$/.test(value),
      {
        message: "Password must contain at least one special character",
      }
    )
    .refine((value) => /^\S*$/.test(value), {
      message: "Spaces are not allowed",
    }),
})

export const authSignUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address or email already taken",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(42)
    .refine((value) => /^(?=.*[A-Z]).+$/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /^(?=.*[0-9]).+$/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).+$/.test(value),
      {
        message: "Password must contain at least one special character",
      }
    )
    .refine((value) => /^\S*$/.test(value), {
      message: "Spaces are not allowed",
    }),    
      
})

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authSignUpSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authSignUpSchema.shape.password,
    confirmPassword: authSignUpSchema.shape.password,
    code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  export const userPrivateMetadataSchema = z.object({
    role: z.enum([
      "user",
      "admin",
      "store_plan_basic",
      "store_plan_standard",
      "store_plan_pro",
      "music_app_basic",
      "music_app_standard",
      "music_app_pro",
    ]),
    stripePriceId: z.string().optional().nullable(),
    stripeSubscriptionId: z.string().optional().nullable(),
    stripeCustomerId: z.string().optional().nullable(),
    stripeCurrentPeriodEnd: z.string().optional().nullable(),
  })