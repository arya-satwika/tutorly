import { users } from '@/lib/db/schema';
import { db } from '@/lib/db/index';
import { eq } from 'drizzle-orm';

export type typeUserInsert = typeof users.$inferInsert;

export const insertUser = async ( thisUser: typeUserInsert ) => {
    try {
        let existed = await db
            .select()
            .from(users)
            .where(eq(users.name, thisUser.name))
            .limit(1);

        existed ? 
        async () => {
            await db
            .insert(users)
            .values(thisUser); 
        return 'success';
        } : 
        () => {
            return 'User with this name already exists';
        }
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

export const getUserbyPassword = async (password: string) => {
    try{
        const user = await db
            .select()
            .from(users)
            .where(eq(users.password, password))
            .limit(1);
        return user[0];
    } catch (error) {
        console.error("Error fetching user by password: ", error);
        return null;
    }
}

