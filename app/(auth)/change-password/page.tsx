'use server'
import UserForms from "@/components/user_forms";

export default async    function ChangePasswordPage() {
    return (
        <div>
            <UserForms formType="changePassword"/>
        </div>
    );
}