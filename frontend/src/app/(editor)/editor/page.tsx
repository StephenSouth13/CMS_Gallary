// app/editor/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { PostTable } from "@/app/components/editor/PostTable";
import { useAuth } from "@/app/components/shared/AuthProviderMock"; // Corrected import path
import { redirect } from "next/navigation";

export default function EditorDashboard() {
  const { user, logout } = useAuth(); // Removed loading, as it's not provided by AuthProvider
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!user || (user.role !== "editor" && user.role !== "admin")) {
      redirect("/login");
    }
  }, [user]);

  if (!user || (user.role !== "editor" && user.role !== "admin")) {
    return null; // Prevent rendering if unauthorized
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý bài viết</h1>
        <Button asChild>
          <Link href="/editor/create">
            <Plus className="mr-2 h-4 w-4" />
            Tạo bài viết mới
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bài viết của bạn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <PostTable searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
}
