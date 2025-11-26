import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-24 px-10 bg-white dark:bg-black sm:items-start">
        
        {/* Logo */}
        <div className="flex w-full flex-col items-center sm:items-start mb-12">
          <Image
            src="/logo.png"               // ganti jika punya logo Tutorly
            alt="Tutorly Logo"
            width={70}
            height={70}
            className="white:invert"
          />
          <h1 className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Selamat Datang di ookokokok Tutorly
          </h1>
          <p className="mt-2 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Masuk untuk mulai belajar bersama tutor terbaik.
          </p>
        </div>

        {/* Login Form */}
        <div className="flex w-full flex-col gap-6 max-w-md">
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              placeholder="contoh@mail.com"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-200"
            />
          </div>

          {/* Lupa Password */}
          <p className="text-sm text-right w-full text-zinc-600 dark:text-zinc-400 hover:underline cursor-pointer">
            Lupa password?
          </p>

          {/* Button Login */}
          <button className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200">
            Masuk
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">atau</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          {/* Login with Google */}
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-zinc-300 dark:border-zinc-700 px-5 hover:bg-black/[.04] dark:hover:bg-[#1a1a1a] transition">
            <Image
              src="/google.png"          // tambahkan ke folder public
              alt="Google Logo"
              width={20}
              height={20}
            />
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              Masuk dengan Google
            </span>
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center mt-10 text-sm text-zinc-600 dark:text-zinc-400">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="font-medium text-zinc-950 dark:text-zinc-50 hover:underline"
          >
            Daftar sekarang
          </a>
        </p>
      </main>
    </div>
  );
}
