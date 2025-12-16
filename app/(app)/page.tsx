import Image from "next/image";
import Navbar from "@/components/navbar";
import CourseCard from "@/components/course_card";

export default function Home() {

  
  return (
      <div className="flex-1 p-4">
        <h1 className="text-5xl font-bold text-foreground-blue mb-7">Courses</h1>
        {/* <CourseCard /> */}
      </div>
  );
}
