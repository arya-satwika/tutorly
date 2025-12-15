import { users } from '@/lib/db/schema';
import { db } from '@/lib/db/index';
import { eq } from 'drizzle-orm';

type insertUser = typeof users.$inferInsert;

export const insertUser = async ( thisUser: insertUser ) => {
    try {
        await db
            .insert(users)
            .values(thisUser);
        return { succes: true, message: "User inserted successfully" };
    }catch (error) {
        return { succes: false, message: "Error inserting user: " + error as string };
    }
}

export const getUserById = async (id: number) => {
    const user = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
    return user[0];
}

export const getUserByName = async (name: string, password: string) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.name, name))
            .limit(1);
        if (user[0].password === password) {
            return { success: true, message: "User found", currentUser: user[0] };
        }
    } catch (error) {
        console.error("Error fetching user by name:", error);
        return { success: false, message: "Error fetching user by name: " + error as string, currentUser: null };
    }
    return { success: false, message: "User not found or incorrect password", currentUser: null };

}

