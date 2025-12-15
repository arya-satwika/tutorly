'use client';
import Image from "next/image";
import { useState } from "react";


export default function Register() {
  let [isSucces, setSucces] = useState(true);

  async function handleRegister(formData : FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const asalSekolah = formData.get('asalSekolah') as string;
    const programStudi = formData.get('programStudi') as string;
    const tahunAngkatan = formData.get('tahunAngkatan') as string;
    
    const response = await fetch('/api/register',{
      method: 'POST',
      body: JSON.stringify({ username, password, asalSekolah, programStudi, tahunAngkatan }),
    })
    const { success, currentUser } =  await response.json();
    if (!success || !currentUser) {
      setSucces(false);
    } else{
      console.log(currentUser);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-10">Tutorly</h1>
        <div className="w-100 bg-card-background py-10 flex flex-col items-center justify-center space-y-6 rounded-4xl">
        <h1 className="text-3xl font-bold text-foreground-blue">Create a New Account</h1>
          <form action={handleRegister} className="flex flex-col gap-5 w-3/4">
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Username</h1>
            <p>{!isSucces && "Invalid credentials"}</p>
            <input 
              className="bg-card-background-light text-foreground-blue w-full rounded-xl px-2 h-10 ring-1  ring-foreground-blue focus:outline-none focus:ring-clickable-focus focus:ring-2"  
              type="text"
              name="username"
            />
            </div>
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Password</h1>
            <input 
              className="bg-card-background-light text-foreground-blue w-full rounded-xl px-2 h-10 ring-1 ring-foreground-blue focus:outline-none focus:ring-clickable-focus focus:ring-2"  
              type="text"
              name="password"
            />
              
            </div>
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Asal Sekolah</h1>
            <input 
              className="bg-card-background-light text-foreground-blue w-full rounded-xl px-2 h-10 ring-1 ring-foreground-blue focus:outline-none focus:ring-clickable-focus focus:ring-2"  
              type="text"
              name="asalSekolah"
              placeholder="Universitas Negeri Surabaya"
            />
            </div>
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Program Studi</h1>
            <input 
              className="bg-card-background-light text-foreground-blue w-full rounded-xl px-2 h-10 ring-1 ring-foreground-blue focus:outline-none focus:ring-clickable-focus focus:ring-2"  
              type="text"
              name="programStudi"
              placeholder="Teknik Informatika"
            />
              
            </div>
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Tahun Angkatan</h1>
            <input 
              className="bg-card-background-light text-foreground-blue w-full rounded-xl px-2 h-10 ring-1 ring-foreground-blue focus:outline-none focus:ring-clickable-focus focus:ring-2"  
              type="text"
              name="tahunAngkatan"
              placeholder="2023"
            />
              
            </div>
            <button>
              <h1 className="text-xl font-bold text-card-background bg-clickable-focus px-3 py-1 rounded-4xl mt-4">
                Create Account
              </h1>
            </button>
          </form>
        </div>

    </div>
  );

}
