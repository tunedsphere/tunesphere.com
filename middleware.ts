import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

  publicRoutes: ["/", "/sign-in", "/sign-up", "/labels", "/genres", "/festivals", "/artsits", "/shop", "/albums", "/uipage"],

});


export const config = {

  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};