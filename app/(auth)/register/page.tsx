'use client';
import { registerUser } from "@/lib/actions";
import { useActionState } from "react";


export default function Register() {

  const [{succes, message}, handleRegister, isPending ] = useActionState(registerUser, {
    succes: true,
    message: ""
  });
  let userExists = false;
  if(message === "username already exists" && !succes){
    userExists = true;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-10">Tutorly</h1>
        <div className="w-100 bg-card-background py-10 flex flex-col items-center justify-center space-y-6 rounded-4xl">
        <h1 className="text-3xl font-bold text-foreground-blue">Create a New Account</h1>
          <form action={handleRegister} className="flex flex-col gap-5 w-3/4">
            <div className="w-full">
            <h1 className="text-xl text-foreground-blue">Username</h1>
            <p className="text-alert-yellow font-bold">{userExists && "Username already exists"}</p>
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
