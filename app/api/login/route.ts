import { getUserByName } from "@/lib/db/queries";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;
    const { success, currentUser } = await getUserByName(username, password);
    if (success && currentUser) {
        return new Response(JSON.stringify({ success: true, currentUser }));
    } else {
        return new Response(JSON.stringify({ success: false, message: "Invalid credentials"}));
    }
}   