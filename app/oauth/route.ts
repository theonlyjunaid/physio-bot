import { createAdminClient, getUserData } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId") || "";
    const secret = request.nextUrl.searchParams.get("secret") || "";

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);
    cookies().set("my-custom-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    const user = await getUserData()
    if (!user?.is_onboarded) {
        const response = NextResponse.redirect(`${request.nextUrl.origin}/onboarding`);
        response.cookies.set("my-custom-session", session.secret);
        return response;
    }
    const response = NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
    response.cookies.set("my-custom-session", session.secret);
    return response;
}
