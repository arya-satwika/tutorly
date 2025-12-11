import Image from "next/image";
import Navbar from "@/components/navbar";
import CourseCard from "@/components/course_card";

export default function Home() {
  return (
      <div className="flex-1 bg-black p-4">
        <h1 className="text-white">Welcome to Tutorly!</h1>
        <CourseCard />
      </div>
  );
}
