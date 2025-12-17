'server-only';
import Link from "next/link";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";

export default async function ChangePasswordSuccessPage({
  params,
}: {
  params: Promise<{ changeToken: string }>;
}) {
  const { changeToken: changeTokenSlug } = await params;

  const cookieStore = await cookies();
  const changeToken = cookieStore.get("changeToken")?.value;
  if (changeToken === changeTokenSlug || !changeTokenSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {/* Checkmark Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-cyan-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Password updated successfully
          </h1>
          <p className="text-gray-500 mb-6">
            Please log in again with your new password.
          </p>

          {/* Login Button */}
          <Link
            href="/login"
            className="block w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-full text-center transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {/* Checkmark Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-pink-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Something Went Wrong
          </h1>
          <p className="text-gray-500 mb-6">
            Please try changing your password again.
          </p>

          {/* Login Button */}
          <Link
            href="/change-password"
            className="block w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-full text-center transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }
}
