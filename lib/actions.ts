'use server';
import { type insertUserType, type insertCourseType, insertCourse, insertUser, getUserByName, getUserById, updatePassword } from "./db/queries";
import { createSession, getUserId, getUserName, createChangeToken, deleteSession } from './session';
import { UploadClient } from '@uploadcare/upload-client'
import { ChangePasswordForm } from '../components/user_forms';
import { redirect } from "next/navigation";

interface ActionState {
  succes: boolean;
  message: string;
}

export async function registerUser(prevState:ActionState, formData: FormData){
    const name = formData.get('username') as string;
    const password = formData.get('password') as string;
    const asalSekolah = formData.get('asalSekolah') as string;
    const prodi = formData.get('programStudi') as string;
    const tahunAngkatan:number = Number(formData.get('tahunAngkatan'));
    
    if(name && password && asalSekolah && prodi && tahunAngkatan){
        const { succes, message, userId } = await insertUser({
            name,
            password,
            asalSekolah,
            prodi,
            tahunAngkatan
        } as insertUserType);
        succes && createSession(userId as number, name);
        return { succes, message };
    }
    return { succes: false, message: "" };
}
export async function loginUser(prevState: ActionState, formData: FormData) {
    const name = formData.get('username') as string;
    const password = formData.get('password') as string;
    // cek credential
    const response = await getUserByName(name, password);
    //bikin session kalo succes
    if (response.succes && response.currentUser){
      await createSession(response.currentUser.id, response.currentUser.name);
    }

    return { succes: response.succes, message: response.message };
}

export async function logOutUser() {
    await deleteSession();
    return {succes: true, message: "Logged out successfully"};
}

export async function changePassword(prevState: ActionState, formData: FormData){
  const userId = await getUserId();
  if (userId){
    const user = await getUserById(userId);
    if (user){
      const oldPassword = formData.get('oldPassword') as string;
      const newPassword = formData.get('newPassword') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (user.password === oldPassword){
        if (newPassword === confirmPassword){
          await updatePassword(userId, newPassword);
          const changeToken = await createChangeToken(user.name);
          if (changeToken){
            await deleteSession();
            return { succes: true, message: changeToken };
          }else {
            redirect('/change-password');
            return { succes: false, message: "Failed to create change token" };
          }
        } else {
          return { succes: false, message: "New password and confirmation do not match" };
        }
      }else {
        return { succes: false, message: "Old password is incorrect" };
      } 

    }else{
      return { succes: false, message: "User not found" };
    }
  }
  return { succes: false, message: "User not found" };


}

export  async function addCourse(prevState: ActionState , formData: FormData){
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const teacher = await getUserName();
  if (!teacher) {
    return { succes: false, message: "You must be logged in to add a course", imageUrl: "" };
  }
  const harga = Number(formData.get('harga'));
  const tagsString = formData.get('tags') as string;
  const image = formData.get('image') as File;
  const startAt = (formData.get('startAt')) as string;
  const endAt = (formData.get('endAt')) as string;
  const tags = tagsString.split(',').map(tag => tag.trim());

  // Check if image was provided
  if (!image || image.size === 0) {
    return { succes: false, message: "No image provided", imageUrl: "" };
  }

  try {
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);
    // Validate start is before end
    if (startDate >= endDate) {
      return { succes: false, message: 'End time must be after start time', imageUrl: "" };
    }

    // Validate not in the past (optional)
    const now = new Date();
    if (startDate < now) {
      return { succes: false, message: 'Start time cannot be in the past', imageUrl: "" };
    }
     // 1. Convert File to Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Convert Buffer to Node.js Readable Stream
    const uploadCareClient = new UploadClient({
      publicKey: process.env.UPLOADCARE_API_KEY!,
      store: 'auto',
    });
    const returnImage = await uploadCareClient.uploadFile(buffer);
    // Construct the CDN URL from the uploaded file UUID
    const imageUrl = `https://4zj2fsf4qc.ucarecd.net/${returnImage.uuid}/`;
    
    const newCourse: insertCourseType = {
      title,
      description,
      teacher,
      harga,
      imageUrl,
      startAt: startDate,
      endAt: endDate,
      tags: tags,
      // imageUrl
    };
    const { succes, message } = await insertCourse(newCourse);
    return { succes, message, imageUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { succes: false, message: "Failed to upload image", imageUrl: "" };
  }
}
