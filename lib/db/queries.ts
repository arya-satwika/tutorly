import { courses, users } from '@/lib/db/schema';
import { db } from '@/lib/db/index';
import { eq } from 'drizzle-orm';
import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';
import { get } from 'http';

export type insertUserType = typeof users.$inferInsert;
export type insertCourseType = typeof courses.$inferInsert;

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

export async function updatePassword(userId: number, newPassword: string){
    try{
        await db
            .update(users)
            .set({ password: newPassword })
            .where(eq(users.id, userId))
            .returning({id: users.id});
    } catch (error) {
        console.error("Error updating password:", error);
        return { succes: false, message: "Error updating password: " + error as string };
    }
}

export async function insertCourse(newCourse: insertCourseType){
    const [course] = await db
        .insert(courses)
        .values(newCourse)
        .returning({id: courses.id, title: courses.title});
    if(course){
        return { succes: true, message: "Course added successfully" };
    }
    return { succes: false, message: "Failed to add course" };
}   

export async function getCourseById(courseId: number){
    const course = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with:{
            teacherData: true
        }
    })
    return course;
}

export async function get10Courses(){
    const courseList = await db.query.courses.findMany({
        limit: 10,
        with:{
            teacherData: true
        }
    });
    return courseList;
}
