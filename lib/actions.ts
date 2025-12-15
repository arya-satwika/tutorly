'use server';
import { type insertUserType, insertUser, getUserByName } from "./db/queries";
import { register } from 'module';

interface registerState {
  succes: boolean;
  message: string;
}
interface loginState {
  succes: boolean;
  message: string;
  currentUser: {
    id: number;
    name: string;
    password: string;
    asalSekolah: string;
    prodi: string;
    tahunAngkatan: number | null;
    saldo: number | null;
    kampus: string | null;
  } | null;
}

export async function registerUser(prevState:registerState, formData: FormData){
    const name = formData.get('username') as string;
    const password = formData.get('password') as string;
    const asalSekolah = formData.get('asalSekolah') as string;
    const prodi = formData.get('programStudi') as string;
    const tahunAngkatan:number = Number(formData.get('tahunAngkatan'));
    
    if(name && password && asalSekolah && prodi && tahunAngkatan){
        const { succes, message } = await insertUser({
            name,
            password,
            asalSekolah,
            prodi,
            tahunAngkatan
        } as insertUserType);
        return { succes, message };
    }
    return { succes: false, message: "" };
}
export async function loginUser(prevState: loginState, formData: FormData) {
    const name = formData.get('username') as string;
    const password = formData.get('password') as string;
    const response = await getUserByName(name, password);
    return response;
}
