import { users } from '@/lib/db/schema';
import { db } from '@/lib/db/index';
import { eq } from 'drizzle-orm';
import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';

export type insertUserType = typeof users.$inferInsert;

export const insertUser = async ( thisUser: insertUserType ) => {
    try {
        const [userId] = await db
            .insert(users)
            .values(thisUser)
            .returning({id: users.id});
        return { succes: true, message: "User inserted successfully", userId: userId.id };

    }catch (error) {
         if (error instanceof DrizzleQueryError) {
            const dbError = error.cause as DatabaseError;
            console.log('PostgreSQL Error Code:', dbError.code);
            console.log('Error Message:', dbError.message);
            if (dbError.code === '23505') { // unique_violation
                return { succes: false, message: "username already exists", userId: null };
            }
         }
        return { succes: false, message: "Error inserting user: " + error as string, userId: null};
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
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.name, name))    
            .limit(1);
        if(user) {
            if (user.password === password) {
                return { succes: true, message: "User found", currentUser: user };
            } else {
                return { succes: false, message: "Incorrect password", currentUser: null };
            }
        }   
    } catch (error) {
        console.error("Error fetching user by name:", error);
        return { succes: false, message: "Error fetching user by name: " + error as string, currentUser: null };
    }
    return { succes: false, message: "User not found or incorrect password", currentUser: null };

}

