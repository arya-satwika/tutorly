import { getUserById } from "@/lib/db/queries"
import { dummyUser } from "@/lib/db/dummy-data";

export default async function Navbar({ children }: { children: React.ReactNode }) {

  const currentUser = dummyUser; // masukkinn id user ke parameter
  // const currentUser = await getUserById(1); // masukkinn id user ke parameter
  return (
    <div className="flex">
      <div className="flex flex-col min-h-screen py-3 max-w-40 px-5 items-top justify-between bg-gray-800 font-sans dark:bg-sidebar-background">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-zinc-200 dark:text-white">
              Tutorly
          </h1>
          <div className="text-white">
        <div>
            <h1 className="text-gray-800 text-xl font-bold">{currentUser.name}</h1>
            <h2 className="text-gray-500 text-sm">{currentUser.prodi}</h2>
          </div>
          <h1 className="text-xl ">
              Profile
          </h1>
          <h1 className="text-xl">
              Settings
          </h1>
          <h1 className="text-xl">
              My Courses
          </h1>
        </div>

          </div>
        </div>
      <div className="flex-1">
      { children }
      </div>
    </div>
  );
}   