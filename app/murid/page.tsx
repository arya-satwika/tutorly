"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wallet, MessageCircle, Clock, GraduationCap } from "lucide-react";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

interface CourseItemProps {
  title: string;
  tutor: string;
}

export default function DashboardStudent() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">Dashboard Murid</h1>
        <p className="text-gray-600">Pantau aktivitas belajar kamu di Tutorly</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          icon={<Wallet className="text-green-600" />}
          title="Saldo"
          value="Rp 150.000"
        />
        <SummaryCard
          icon={<BookOpen className="text-indigo-600" />}
          title="Kelas Aktif"
          value="3 Kelas"
        />
        <SummaryCard
          icon={<Clock className="text-yellow-500" />}
          title="Riwayat Kelas"
          value="8 Kelas"
        />
        <SummaryCard
          icon={<MessageCircle className="text-pink-500" />}
          title="Pesan Baru"
          value="2 Chat"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap /> Kelas yang Sedang Diikuti
              </h2>

              <div className="space-y-4">
                <CourseItem
                  title="Matematika SMA – Persiapan UTBK"
                  tutor="Andi Pratama"
                />
                <CourseItem
                  title="Dasar Pemrograman C++"
                  tutor="Dosen Budi"
                />
                <CourseItem
                  title="Fisika – Mekanika"
                  tutor="Kak Sinta"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div>
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Riwayat Course</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>✔ Bahasa Inggris – Speaking</li>
                <li>✔ Matematika Dasar</li>
                <li>✔ Logika Informatika</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                Lihat Semua Riwayat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value }: SummaryCardProps) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CourseItem({ title, tutor }: CourseItemProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">Tutor: {tutor}</p>
      </div>
      <Button size="sm">Masuk</Button>
    </div>
  );
}
