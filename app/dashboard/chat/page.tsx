"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";

interface Message {
  from: "me" | "other";
  text: string;
  time: string;
}

export default function ChatDashboard() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "other", text: "Halo, apakah materi hari ini sudah bisa diakses?", time: "09:10" },
    { from: "me", text: "Sudah ya, silakan cek di dashboard kelas 🙌", time: "09:12" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        from: "me",
        text: input,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <Card className="col-span-4 h-[80vh]">
          <CardContent className="p-4">
            <h2 className="font-bold text-lg mb-4">Chat</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input className="pl-9" placeholder="Cari tutor / murid..." />
            </div>

            <div className="space-y-3 overflow-y-auto h-[65vh]">
              <ChatUser name="Budi Santoso" last="Terima kasih kak" />
              <ChatUser name="Kelas Matematika SMA" last="Link zoom sudah saya kirim" />
              <ChatUser name="Andi Pratama" last="Materinya sangat membantu" />
            </div>
          </CardContent>
        </Card>

        {/* Chat Room */}
        <Card className="col-span-8 h-[80vh] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <Avatar>
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Budi Santoso</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.from === "me"
                        ? "bg-indigo-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-[10px] opacity-70 text-right mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-indigo-500 hover:bg-indigo-600">
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChatUser({ name, last }: { name: string; last: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <Avatar>
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500 truncate">{last}</p>
      </div>
    </div>
  );
}
