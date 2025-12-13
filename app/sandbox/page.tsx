import Image from "next/image";
import { insertUser } from "@/lib/db/queries";
import type { typeUserInsert } from "@/lib/db/queries";

export default function Home(){
    async function submitUser(formData: FormData) {
        'use server'
        const name = formData.get('name');
        const password = formData.get('password');
        const asalSekolah = formData.get('asalSekolah');
        const saldo = formData.get('saldo');
        const prodi = formData.get('prodi');
        const newUser = {
            name: name as string,
            password: password as string,
            asalSekolah: asalSekolah as string,
            saldo: parseInt(saldo as string),
            prodi: prodi as string,
        }
        const result = await insertUser(newUser);
        console.log(result);
    }

  return (
      <div className="flex-1 bg-gray-500 p-4">
        <h1 className="text-white">SANDBOX!</h1>
        <form action={submitUser}>
            <input type="text" placeholder="nama" name="name" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="password" name="password" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="asal sekolah" name="asalSekolah" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="saldo" name="saldo" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="program studi" name="prodi" className="bg-red-700"/>
            <button type="submit">Submit</button>
        </form>
      </div>
  );
}
