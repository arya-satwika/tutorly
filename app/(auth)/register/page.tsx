'use server';
import UserForms  from "@/components/user_forms";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


export default async function Register() {
  const sessionToken = (await cookies()).get('session')?.value;
  if (sessionToken) {
    redirect('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <UserForms formType="register" />
    </div>
  );

}
