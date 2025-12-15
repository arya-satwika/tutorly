"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Video } from "lucide-react";
import { ReactNode, JSX } from "react";

// ======================
// Types
// ======================
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-wide">TUTORLY</h1>
        <div className="space-x-4">
          <Button variant="secondary">Masuk</Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Daftar</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Belajar & Mengajar
          <span className="text-yellow-300"> Tanpa Batas</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8">
          Tutorly adalah platform edukasi modern untuk generasi muda Indonesia.
          Mahasiswa, dosen, guru, dan pelajar SMA dapat belajar dan berbagi ilmu
          dalam satu ekosistem interaktif.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300">
            Mulai Belajar
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-indigo-600"
          >
            Jadi Pengajar
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-white text-gray-800 rounded-t-[3rem]">
        <h3 className="text-3xl font-bold text-center mb-12">
          Kenapa Memilih Tutorly?
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<GraduationCap size={32} />}
            title="Pengajar Berkualitas"
            desc="Dosen, mahasiswa berprestasi, dan tenaga pendidik terverifikasi."
          />
          <FeatureCard
            icon={<Users size={32} />}
            title="Komunitas Aktif"
            desc="Diskusi, forum, dan kolaborasi antar pelajar dan pengajar."
          />
          <FeatureCard
            icon={<Video size={32} />}
            title="Kelas Interaktif"
            desc="Live class, rekaman video, dan bimbingan privat online."
          />
          <FeatureCard
            icon={<BookOpen size={32} />}
            title="Materi Terstruktur"
            desc="Kurikulum jelas dari SMA hingga tingkat lanjutan."
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-8 py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Siap Menjadi Bagian dari Tutorly?
        </h3>
        <p className="mb-8 text-white/90">
          Tingkatkan potensi belajar atau bagikan ilmu Anda sekarang juga.
        </p>
        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300">
          Gabung Sekarang
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-black/30">
        <p className="text-sm">© 2025 Tutorly. Edukasi untuk Masa Depan Indonesia.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: FeatureCardProps): JSX.Element {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4 text-indigo-500">{icon}</div>
          <h4 className="font-semibold text-lg mb-2">{title}</h4>
          <p className="text-sm text-gray-600">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
