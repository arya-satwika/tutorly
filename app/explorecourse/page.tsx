"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Home, 
  BookOpen, 
  ShoppingCart, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart2,
  Bell,
  User
} from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  education: { degree: string; institution: string; year: string }[];
  stats: {
    students: number;
    courses: number;
    rating: number;
    hours: number;
  };
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  duration: string;
  category: string;
  postedDate: string;
}

interface Review {
  id: string;
  name: string;
  text: string;
  date: string;
  rating: number;
}

export default function InstructorProfile() {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('explore');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data for instructor
      const instructorData: Instructor = {
        id: '1',
        name: 'John Doe',
        title: 'Senior AI & Machine Learning Instructor',
        bio: 'Emily Carter is a distinguished AI and Machine Learning instructor with over 10 years of experience in the tech industry. She has worked with leading companies including Google, Microsoft, and Amazon, where she developed and implemented cutting-edge AI solutions. Emily is passionate about making complex technical concepts accessible to learners of all levels.',
        expertise: [
          'Machine Learning & Deep Learning',
          'Natural Language Processing',
          'Computer Vision',
          'Data Science & Analytics'
        ],
        education: [
          {
            degree: 'Ph.D. in Computer Science',
            institution: 'Stanford University',
            year: '2015'
          },
          {
            degree: 'M.S. in Artificial Intelligence',
            institution: 'MIT',
            year: '2012'
          }
        ],
        stats: {
          students: 45200,
          courses: 24,
          rating: 4.9,
          hours: 120
        }
      };

      // Mock data for courses
      const coursesData: Course[] = [
        {
          id: '101',
          title: 'Advanced Machine Learning with Python',
          instructor: 'John Doe',
          students: 1200,
          duration: '8h',
          category: 'AI',
          postedDate: '2 weeks ago'
        },
        {
          id: '102',
          title: 'Deep Learning for Computer Vision',
          instructor: 'John Doe',
          students: 850,
          duration: '6h',
          category: 'AI',
          postedDate: '3 weeks ago'
        },
        {
          id: '103',
          title: 'Natural Language Processing Fundamentals',
          instructor: 'John Doe',
          students: 950,
          duration: '7h',
          category: 'AI',
          postedDate: '1 month ago'
        }
      ];

      // Mock data for reviews
      const reviewsData: Review[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          text: "This course exceeded my expectations. The instructor breaks down complex AI concepts into digestible pieces and provides real-world examples that make learning engaging and practical. I've already started applying what I've learned to my own projects.",
          date: '2 weeks ago',
          rating: 5
        },
        {
          id: '2',
          name: 'Michael Chen',
          text: "The course content is comprehensive and up-to-date with the latest industry trends. The hands-on projects really helped me understand how to apply AI concepts in real-world scenarios. Liam is an excellent instructor who clearly knows his stuff.",
          date: '3 weeks ago',
          rating: 5
        },
        {
          id: '3',
          name: 'Alexandra Rodriguez',
          text: "As someone with no prior experience in AI, I was worried this course might be too advanced. However, the instructor does an amazing job of explaining complex concepts in a way that's easy to understand. The course is well-structured and the projects are engaging. Highly recommended!",
          date: '1 month ago',
          rating: 5
        }
      ];

      setInstructor(instructorData);
      setCourses(coursesData);
      setReviews(reviewsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Instructor not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              {sidebarOpen ? (
                <h1 className="text-2xl font-bold text-indigo-600">Tutorly</h1>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="ml-auto p-1 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveNav('home')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === 'home' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Home size={20} />
                  {sidebarOpen && <span>Home</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('explore')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === 'explore' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen size={20} />
                  {sidebarOpen && <span>Explore Courses</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('compare')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === 'compare' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart2 size={20} />
                  {sidebarOpen && <span>Compare Courses</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('cart')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === 'cart' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {sidebarOpen && <span>My Cart</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === 'settings' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={20} />
                  {sidebarOpen && <span>Settings</span>}
                </button>
              </li>
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                JD
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Home size={20} />
                <span>/</span>
                <span>Instructors</span>
                <span>/</span>
                <span className="text-indigo-600">{instructor.name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            {/* Instructor Header */}
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="w-48 h-48 relative rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
                  <p className="text-xl text-gray-600 mb-6">{instructor.title}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {instructor.stats.students.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-sm">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {instructor.stats.courses}
                      </div>
                      <div className="text-gray-500 text-sm">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {instructor.stats.rating}
                      </div>
                      <div className="text-gray-500 text-sm">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {instructor.stats.hours}
                      </div>
                      <div className="text-gray-500 text-sm">Hours of Content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Biography & Education */}
              <div className="md:col-span-2 space-y-8">
                {/* Biography */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Biography</h2>
                  <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
                </div>

                {/* Expertise */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Expertise</h2>
                  <div className="flex flex-wrap gap-3">
                    {instructor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Education</h2>
                  <div className="space-y-4">
                    {instructor.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-indigo-500 pl-4">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Courses Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">My Courses</h2>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Add Course
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Course 1 */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">
                        Craft a Winning Marketing Strategy for Your Small Business With ChatAI
                      </h3>
                      
                      <div className="flex flex-wrap gap-6 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-sm">500 Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-sm">1h 30m</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold">
                          AR
                        </div>
                        <div>
                          <h4 className="font-semibold">Alexandra Rodriguez</h4>
                          <p className="text-sm text-gray-500">Instructor</p>
                        </div>
                      </div>
                    </div>

                    {/* Divider with text */}
                    <div className="relative border-t pt-8">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="px-4 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-full">
                          CREATE A VISION BOARD THAT WORKS
                        </span>
                      </div>
                    </div>

                    {/* Course 2 */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">
                        Create a Goal Board in Canva - Your Vision Board / Action Board
                      </h3>
                      
                      <div className="flex flex-wrap gap-6 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-sm">1h 30m</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
                          SJ
                        </div>
                        <div>
                          <h4 className="font-semibold">Sarah Johnson</h4>
                          <p className="text-sm text-gray-500">Instructor</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Posted Dates */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>2 weeks ago</span>
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                </div>

                {/* Student Reviews Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-8">Student Reviews</h2>
                  
                  <div className="space-y-8">
                    {reviews.map((review) => (
                      <div key={review.id} className="pt-6 first:pt-0 first:border-0 border-t">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <div className="flex text-yellow-400">
                              {"★".repeat(review.rating)}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          {review.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Courses */}
              <div className="space-y-8">
                {/* Additional Courses */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">All Courses</h2>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div 
                        key={course.id}
                        className="p-6 border rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <h3 className="font-bold text-lg mb-3">
                          {course.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <span className="font-semibold">{course.students}</span>
                            <span>Students</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold">{course.duration}</span>
                            <span>Hours</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                              {instructor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium">{course.instructor}</p>
                              <p className="text-xs text-gray-500">Instructor</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                            {course.category}
                          </span>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                          Posted {course.postedDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">Teaching Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Students</span>
                      <span className="font-bold text-lg">{instructor.stats.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Course Completion Rate</span>
                      <span className="font-bold text-lg">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Student Satisfaction</span>
                      <span className="font-bold text-lg">98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Certificates Issued</span>
                      <span className="font-bold text-lg">12,450</span>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                  <h3 className="text-xl font-bold mb-4">Want to Learn More?</h3>
                  <p className="text-gray-600 mb-6">
                    Book a consultation session with {instructor.name}
                  </p>
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors">
                    Book a Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}