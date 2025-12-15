import { insertUser, getUserByName } from "@/lib/db/queries";
import { type insertUserType } from "@/lib/db/queries";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body: insertUserType = await request.json();
    
    const { succes, message } = await insertUser(body);

    return Response.json({ success: succes, message });
}   