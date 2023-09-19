import { NextResponse } from "next/server";

export default async function middleware(req) {
  if (req.url !== "/") {
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: false,
  },
};