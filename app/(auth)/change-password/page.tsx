export default function ChangePasswordPage() {
    return (
        <div>
            <h1>Change Password Page</h1>
            <form action="">
                <input type="password" name="oldPassword" placeholder="Current Password" />
                <br />
                <input type="password" name="newPassword" placeholder="New Password" />
                <br />
                <input type="password" name="confirmPassword" placeholder="Confirm New Password" />
                <br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}