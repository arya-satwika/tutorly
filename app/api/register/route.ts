import { insertUser, getUserByName } from "@/lib/db/queries";

export async function POST(request: Request) {
    const body = await request.json();
    const { success: userExists, message: userMessage } = await getUserByName( body.username, body.password );
    if (userExists) {
        return new Response(JSON.stringify({ success: false, message: "User already exists" }));
    } else{
        const { succes, message } = await insertUser(body);
        return new Response(JSON.stringify({ succes, message }));
    }
    // if (success && currentUser) {
    //     return new Response(JSON.stringify({ success: true, currentUser }));
    // } else {
    //     return new Response(JSON.stringify({ success: false, message: "Invalid credentials"}));
    // }
}   