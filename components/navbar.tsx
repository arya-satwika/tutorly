import { getUserById } from "@/lib/db/queries"

export default async function Navbar() {

  const currentUser = await getUserById(1); // masukkinn id user ke parameter
  return (
    <div className="flex flex-col min-h-screen py-3 max-w-40 items-top justify-between bg-gray-800 font-sans dark:bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-200 dark:text-gray-800">
            Tutorly
        </h1>
        <div>
          <h1 className="text-gray-800">{currentUser.name}</h1>
          <h2 className="text-gray-600">{currentUser.prodi}</h2>
        </div>
        <h1 className="text-xl text-zinc-200 dark:text-gray-800">
            Profile
        </h1>
        <h1 className="text-xl text-zinc-200 dark:text-gray-800">
            Settings
        </h1>
        <h1 className="text-xl text-zinc-200 dark:text-gray-800">
            My Courses
        </h1>
      </div>
      <div>
        <h1 className="text-black">hello</h1>
      </div>
    </div>
  );
}   