'use server';
import { type insertUserType, type insertCourseType, insertCourse, insertUser, getUserByName } from "./db/queries";
import { createSession } from './session';

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
  const tags = tagsString.split(',').map(tag => tag.trim());
  const newCourse: insertCourseType = {
    title,
    description,
    teacher,
    harga,
    tags: { jsonb: tags }
  };
  const { succes, message } = await insertCourse(newCourse);
  return { succes, message
  }
  // const { succes, message } = await insertCourse
}
