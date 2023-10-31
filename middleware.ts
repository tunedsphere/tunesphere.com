import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { type UserRole } from "@/types";
import { clerkClient } from "@clerk/nextjs";


export default authMiddleware({
   // Public routes are routes that don't require authentication
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
    "/api(.*)",
    "/shop(.*)",
    "/shop/tunedsphere-products(.*)",
    "/shop/c(.*)",
    "/shop/products(.*)",
    "/shop/product(.*)",
    "/shop/stores(.*)",
    "/festivals(.*)", 
    "/music(.*)",
    "/docs(.*)",
    "/email-preferences(.*)",
    "/blog(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/terms(.*)",
    "/privacy(.*)",
    "/legal-information(.*)",
    "/authors-rights(.*)",
    "/terms-conditions(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId)

    if (!user) {
      throw new Error("User not found.")
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: ["user", "store_plan_basic", "music_app_basic"],
        },
      })
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};