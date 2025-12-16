'use client';
import UserForms  from "@/components/user_forms";

export default function Login() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <UserForms formType="login" />
    </div>
  );

}
