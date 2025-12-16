'use server';
import CourseCard from "@/components/course_card";
import { get10Courses } from "@/lib/db/queries";

export default async function Home() {
  const courses = await get10Courses();
  
  return (
      <div className="flex-1 p-4">
        <h1 className="text-5xl font-bold text-foreground-blue mb-7">Courses</h1>
        <div className="flex flex-row gap-6 flex-wrap">
          {courses.length !== 0 && (
            courses.map((course) => (
              <CourseCard 
              key={course.id}
              id={course.id}
              title={course.title}
              tags = {course.tags}
              description={course.description}
              imageUrl={course.imageUrl}
              studentCount={course.usersEnrolledId.length}
              teacherName={course.teacherData.name}
              harga={course.harga}
              />
            ))
          )
          }
    </div>
      </div>
  );
}
