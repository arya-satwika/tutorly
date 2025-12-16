"use client";

import Image from "next/image";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-10 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-indigo-600">Tutorly</h1>

        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <Link href="#" className="hover:text-indigo-600">Explore</Link>
          <Link href="#" className="hover:text-indigo-600">Categories</Link>
          <Link href="#" className="hover:text-indigo-600">Teach</Link>
          <Link href="#" className="hover:text-indigo-600">For Business</Link>
        </nav>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search for courses..."
            className="hidden md:block px-4 py-2 text-sm border rounded-full bg-slate-50"
          />
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-4 text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
            ⭐ Trusted by Indonesian learners
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Learn without <br /> limits
          </h2>

          <p className="text-gray-600 mb-8 max-w-lg">
            Mulai, tingkatkan, atau ubah kariermu bersama ribuan kursus dari
            mahasiswa, dosen, dan tenaga pendidik terbaik di Indonesia.
          </p>

          <div className="flex gap-4">
            <Link
              href="/auth/register"
              className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Join for Free
            </Link>
            <Link
              href="/dashboard/explore"
              className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 text-sm font-medium hover:bg-indigo-50"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/hero-students.jpg"
            alt="Students learning together"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-10 py-16 bg-white">
        <h3 className="text-2xl font-bold mb-2 text-center">Explore Top Categories</h3>
        <p className="text-gray-500 mb-10 text-center">
          Discover courses in the most popular fields
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-2xl bg-slate-50 hover:shadow-md transition"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${cat.color}`}>
                {cat.icon}
              </div>
              <h4 className="font-semibold">{cat.title}</h4>
              <p className="text-xs text-gray-500 mb-1">{cat.count}</p>
              <p className="text-xs text-gray-400">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="px-10 py-16 bg-slate-50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold">Popular Courses</h3>
            <p className="text-gray-500 text-sm">Most enrolled courses this month</p>
          </div>
          <a
            href="/dashboard/explore"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            View All Courses →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-600">
                  {course.category}
                </span>
                <h4 className="font-semibold mt-2 text-sm">{course.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{course.author}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{course.price}</span>
                  <span className="text-yellow-500">⭐ {course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Journey */}
      <section className="px-10 py-16 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">Your Learning Journey</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {learningJourney.map((item) => (
            <div key={item.title} className="bg-slate-50 rounded-2xl p-6">
              <div className="flex justify-between mb-3">
                <h4 className="font-semibold">{item.title}</h4>
                <span className="text-xs text-gray-500">{item.status}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{item.progress}% • {item.hours}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="px-10 py-16 bg-slate-50">
        <h3 className="text-2xl font-bold text-center mb-10">Learn from the Best</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {instructors.map((ins) => (
            <div key={ins.name} className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 mb-4" />
              <h4 className="font-semibold">{ins.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{ins.role}</p>
              <p className="text-xs text-gray-500">⭐ {ins.rating} • {ins.students} students</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-10 py-16 bg-white">
        <h3 className="text-2xl font-bold text-center mb-10">What Our Students Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-slate-50 rounded-2xl p-6">
              <p className="text-sm text-gray-600 mb-4">“{t.text}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


const categories = [
  { title: "Development", count: "12,500+ courses", desc: "Python, JavaScript, Web", color: "bg-blue-100", icon: "💻" },
  { title: "Business", count: "8,300+ courses", desc: "Finance, Marketing", color: "bg-purple-100", icon: "💼" },
  { title: "Data Science", count: "5,200+ courses", desc: "AI, Analytics", color: "bg-green-100", icon: "📊" },
  { title: "Design", count: "6,800+ courses", desc: "UI/UX, Graphic", color: "bg-orange-100", icon: "🎨" },
  { title: "Marketing", count: "4,500+ courses", desc: "SEO, Social Media", color: "bg-red-100", icon: "📣" },
  { title: "Health", count: "3,200+ courses", desc: "Fitness, Mental Health", color: "bg-emerald-100", icon: "💚" },
  { title: "Music", count: "2,100+ courses", desc: "Production, Theory", color: "bg-indigo-100", icon: "🎵" },
  { title: "Photography", count: "1,800+ courses", desc: "Portrait, Landscape", color: "bg-pink-100", icon: "📷" },
];

const learningJourney = [
  { title: "Python for Data Science", progress: 65, status: "In Progress", hours: "12 hours left", color: "bg-blue-500" },
  { title: "Graphic Design Basics", progress: 42, status: "In Progress", hours: "18 hours left", color: "bg-purple-500" },
  { title: "Business Analytics", progress: 0, status: "Not Started", hours: "24 hours total", color: "bg-green-500" },
];

const instructors = [
  { name: "Dr. John Mitchell", role: "Full-Stack Developer", rating: "4.8", students: "125k" },
  { name: "Dr. Sarah Chen", role: "Data Scientist", rating: "4.9", students: "98k" },
  { name: "Michael Rodriguez", role: "UI/UX Designer", rating: "4.7", students: "76k" },
  { name: "Emily Thompson", role: "Marketing Expert", rating: "4.6", students: "112k" },
];

const testimonials = [
  { name: "James Wilson", role: "Software Engineer at Google", text: "This platform completely changed my career trajectory." },
  { name: "Maria Garcia", role: "UX Designer at Adobe", text: "The quality of education here is unmatched." },
  { name: "David Park", role: "Data Analyst at Microsoft", text: "LearnHub delivered exactly what I needed." },
];

const courses = [
  { title: "Complete Web Development Bootcamp", author: "Dr. John Mitchell", price: "FREE", rating: "4.8", category: "Development" },
  { title: "Machine Learning A–Z: Python & R", author: "Dr. Sarah Chen", price: "$59.99", rating: "4.9", category: "Data Science" },
  { title: "Complete UI/UX Design Masterclass", author: "Michael Rodriguez", price: "FREE", rating: "4.7", category: "Design" },
  { title: "Digital Marketing Masterclass", author: "Emily Thompson", price: "$39.99", rating: "4.6", category: "Marketing" },
];

