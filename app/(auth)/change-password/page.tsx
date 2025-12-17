'use server'
import UserForms from "@/components/user_forms";

export default async function ChangePasswordPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-sky-100">
            <UserForms formType="changePassword"/>
        </div>
    );

}