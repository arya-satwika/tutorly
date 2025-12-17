'use server';
import { getCourseById } from '@/lib/db/queries';
import Image  from 'next/image';

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params
    const course = await getCourseById(Number(courseId));

    
    if(course){
        const numberOfStudents = course.usersEnrolledId ? course.usersEnrolledId.length : 0;
        const teacher = course.teacherData;
        return(
            <div className="flex-1 bg-gray-50 min-h-screen">

                {/* ============ MAIN CONTENT AREA ============ */}
                <div className="p-8 flex gap-8">
                    
                    {/* ============ LEFT COLUMN - COURSE INFO ============ */}
                    <div className="flex-1">
                        
                        {/* ---- Tags Section ---- */}
                        <div className="flex gap-2 mb-4">
                            {course.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="text-sm px-3 py-1 rounded-full bg-cyan-50 text-cyan-600"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* ---- Image + Title/Description Row ---- */}
                        <div className="flex gap-6 mb-6">
                            {/* ---- Course Image ---- */}
                            <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                                <Image 
                                    src={course.imageUrl} 
                                    alt={course.title} 
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ---- Title and Description ---- */}
                            <div className="flex-1">
                                {/* ---- Course Title ---- */}
                                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                                    {course.title}
                                </h1>

                                {/* ---- Course Description ---- */}
                                <p className="text-gray-600 leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                        </div>

                        {/* ---- Course Stats Row ---- */}
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {[1,2,3,4,5].map((star) => (
                                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-medium text-gray-700">4.9</span>
                                <span className="text-gray-400">(2.1K reviews)</span>
                            </div>
                            {/* Students Enrolled */}
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>{numberOfStudents} students enrolled</span>
                            </div>
                            {/* Last Updated */}
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Last updated April 2025</span>
                            </div>
                        </div>

                        {/* ---- Instructor Section ---- */}
                        <div className="flex items-center gap-3">
                            {/* Instructor Avatar */}
                            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            {/* Instructor Info */}
                            <div>
                                <p className="font-semibold text-gray-800">{teacher.name}</p>
                                <p className="text-sm text-gray-500">{teacher.prodi}r</p>
                            </div>
                        </div>
                    </div>

                    {/* ============ RIGHT COLUMN - PURCHASE CARD ============ */}
                    <div className="w-80">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            
                            {/* ---- Price Section ---- */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-cyan-500">
                                    {course.harga === 0 ? 'FREE' : `Rp ${course.harga.toLocaleString()}`}
                                </span>
                                <span className="text-gray-400 line-through">$199.99</span>
                            </div>

                            {/* ---- Enroll Button ---- */}
                            <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition-colors mb-3">
                                Enroll Now
                            </button>

                            {/* ---- Add to Cart Button ---- */}
                            <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors mb-6">
                                Add to Cart
                            </button>

                            {/* ---- Course Features List ---- */}
                            <div className="space-y-3">
                                {/* Meeting Link */}
                                {course.linkMeeting && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                        </svg>
                                        <a 
                                            href={course.linkMeeting} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-cyan-500 hover:text-cyan-600 font-medium underline break-all"
                                        >
                                            Join Meeting
                                        </a>
                                    </div>
                                )}
                                {/* Hours of Content */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>42 hours of content</span>
                                </div>
                                {/* Lessons */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                    <span>75 lessons</span>
                                </div>
                                {/* Downloadable Resources */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    <span>Downloadable resources</span>
                                </div>
                                {/* Certificate */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                    </svg>
                                    <span>Certificate of completion</span>
                                </div>
                                {/* Lifetime Access */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    <span>Lifetime access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return(
        <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Course not found</p>
        </div>
    )
}