'use client'
import Image from "next/image";
import { insertUser } from "@/lib/db/queries";
import { useActionState } from "react";
import { addCourse } from "@/lib/actions";

export default function createCourse(){
    const [ {succes, message, imageUrl}, handleSubmit, isPending ] = useActionState(addCourse,{
        succes: false,
        message: "",
        imageUrl: ""
    })
    // async function submitUser(formData: FormData) {
    //     'use server'
    //     const name = formData.get('name');
    //     const password = formData.get('password');
    //     const asalSekolah = formData.get('asalSekolah');
    //     const saldo = formData.get('saldo');
    //     const prodi = formData.get('prodi');
    //     const newUser = {
    //         name: name as string,
    //         password: password as string,
    //         asalSekolah: asalSekolah as string,
    //         saldo: parseInt(saldo as string),
    //         prodi: prodi as string,
    //     }
    //     const result = await insertUser(newUser);
    //     console.log(result);
    // }

  return (
      <div className="flex-1 bg-gray-500 p-4">
        <h1 className="text-white text-5xl font-bold">SANDBOX!</h1>
        <form action={handleSubmit}>
            <input type="text" placeholder="nama" name="title" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="teacher" name="teacher" className="bg-red-700"/>
            <br />
            <textarea name="description" placeholder="deskripsi" className="text-white bg-card-background" id="description"/>
            <br />
            <input type="text" placeholder="harga" name="harga" className="bg-red-700"/>
            <br />
            <input type="text" placeholder="tags" name="tags" className="bg-red-700"/>
            <button type="submit">Submit</button>
        </form>
      </div>
  );
}
