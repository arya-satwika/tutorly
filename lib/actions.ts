'use server';
import { type insertUserType, type insertCourseType, insertCourse, insertUser, getUserByName } from "./db/queries";
import { createSession } from './session';
import { UploadClient } from '@uploadcare/upload-client'

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

export  async function addCourse(prevState: ActionState , formData: FormData){
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const teacher = formData.get('teacher') as string;
  const harga = Number(formData.get('harga'));
  const tagsString = formData.get('tags') as string;
  const image = formData.get('image') as File;
  const tags = tagsString.split(',').map(tag => tag.trim());

  // Check if image was provided
  if (!image || image.size === 0) {
    return { succes: false, message: "No image provided", imageUrl: "" };
  }

  try {
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
