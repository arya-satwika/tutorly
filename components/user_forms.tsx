import { loginUser, registerUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useActionState } from "react";

type formType = 'login' | 'register' | 'changePassword';


export function LoginForm(){
    const [{succes, message}, handleLogin, isPending ] = useActionState(loginUser, {
        succes: false,
        message: "",
      });
      const [showPassword, setShowPassword] = useState(false);
      
      let incorrectPassword = false;
      if(message === "Incorrect password"){
        incorrectPassword = true;
      }
      if (succes){
        redirect('/dashboard');
      }

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back! 👋</h1>
        
        <form action={handleLogin} className="flex flex-col gap-4">
          {/* Email/Username Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            {!succes && message && (
              <p className="text-red-500 text-xs mb-1">Username not found</p>
            )}
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"  
              type="text"
              name="username"
              placeholder="Johnson doe"
            />
          </div>
          
          {/* Password Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            {incorrectPassword && (
              <p className="text-red-500 text-xs mb-1">Incorrect Password</p>
            )}
            <div className="relative">
              <input 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent pr-10"  
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-400" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-cyan-500 hover:text-cyan-600">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
}

export function RegisterForm(){

    const [{succes, message}, handleRegister, isPending ] = useActionState(registerUser, {
        succes: true,
        message: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    
    let userExists = false;
    if(message === "username already exists" && !succes){
    userExists = true;
    } else if (message === "User inserted successfully" && succes){
    redirect('/');
    }

    return(
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Account!</h1>
        
        <form action={handleRegister} className="flex flex-col gap-4">
          {/* Username Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
            {userExists && (
              <p className="text-red-500 text-xs mb-1">Username already exists</p>
            )}
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"  
              type="text"
              name="username"
              placeholder="Johnson doe"
            />
          </div>
          
          {/* Password Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <input 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent pr-10"  
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Asal Sekolah Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Asal Sekolah</label>
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"  
              type="text"
              name="asalSekolah"
              placeholder="Universitas Negeri Surabaya"
            />
          </div>

          {/* Tahun Angkatan Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tahun Angkatan</label>
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"  
              type="text"
              name="tahunAngkatan"
              placeholder="2023"
            />
          </div>

          {/* Program Studi Field */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Program Studi</label>
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"  
              type="text"
              name="programStudi"
              placeholder="Teknik Informatika"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    );
}
export default function UserForms({formType}: {formType: formType}){
    if (formType === 'login'){
        return <LoginForm />;
    } else {
        return <RegisterForm />;
    }
}