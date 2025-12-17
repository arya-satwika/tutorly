"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import {
  Users,
  BookOpen,
  Wallet,
  Calendar,
  MessageCircle,
  PlusCircle,
} from "lucide-react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

interface ClassItemProps {
  title: string;
  students: string;
  schedule: string;
}

export default function DashboardTutor() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">Dashboard Pengajar</h1>
          <p className="text-gray-600">
            Kelola kelas, murid, dan pendapatan Anda di Tutorly
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 flex gap-2">
          <PlusCircle size={18} /> Buat Kelas Baru
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          icon={<Wallet className="text-green-600" />}
          title="Saldo"
          value="Rp 1.250.000"
        />
        <SummaryCard
          icon={<BookOpen className="text-indigo-600" />}
          title="Kelas Aktif"
          value="4 Kelas"
        />
        <SummaryCard
          icon={<Users className="text-blue-500" />}
          title="Total Murid"
          value="86 Murid"
        />
        <SummaryCard
          icon={<MessageCircle className="text-pink-500" />}
          title="Chat Baru"
          value="5 Pesan"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Kelas yang Anda Ajar</h2>

              <div className="space-y-4">
                <ClassItem
                  title="Dasar Pemrograman C++"
                  students="32 Murid"
                  schedule="Senin & Rabu"
                />
                <ClassItem
                  title="Matematika SMA – UTBK"
                  students="28 Murid"
                  schedule="Selasa & Kamis"
                />
                <ClassItem
                  title="Logika Informatika"
                  students="26 Murid"
                  schedule="Jumat"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Income */}
        <div className="space-y-6">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar /> Jadwal Mengajar
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>Senin: C++ Dasar (19.00)</li>
                <li>Rabu: C++ Dasar (19.00)</li>
                <li>Kamis: Matematika UTBK (18.30)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pendapatan Bulan Ini</h2>
              <p className="text-2xl font-bold text-green-600">Rp 3.750.000</p>
              <Button variant="outline" className="mt-4 w-full">
                Lihat Detail Pendapatan
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

function ClassItem({ title, students, schedule }: ClassItemProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">
          {students} • {schedule}
        </p>
      </div>
      <Button size="sm">Kelola</Button>
    </div>
  );
}
