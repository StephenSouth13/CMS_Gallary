"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockPosts } from "@/mock/mockPosts";
import { mockUsers } from "@/mock/mockUsers";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập thêm vào mockPosts (thực tế sẽ gọi API)
    mockPosts.push({
      id: (mockPosts.length + 1).toString(),
      title,
      content,
      excerpt: content.slice(0, 100),
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      status: "pending",
      authorId: mockUsers[1].id.toString(),
      author: {
        id: mockUsers[1].id.toString(),
        name: mockUsers[1].name,
        email: mockUsers[1].email,
        role: mockUsers[1].role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      tags: [],
      image: "/img/sample1.jpg",
    });
    setTimeout(() => {
      setLoading(false);
      router.push("/editor");
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Tạo bài viết mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Tiêu đề bài viết"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full border rounded p-2 min-h-[120px]"
              placeholder="Nội dung bài viết"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo bài viết"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
