"use client";
import { useState } from "react";
import { mockPosts } from "@/mock/mockPosts";
import { mockUsers } from "@/mock/mockUsers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

export default function AdminApprovePage() {
  const [posts, setPosts] = useState([...mockPosts]);

  const handleApprove = (id: string) => {
    const updated = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            status: "published" as Post["status"],
            updatedAt: new Date().toISOString(),
          }
        : post
    );
    setPosts(updated);
    // Cập nhật vào mockPosts (giả lập)
    const idx = mockPosts.findIndex((p) => p.id === id);
    if (idx !== -1)
      mockPosts[idx] = {
        ...mockPosts[idx],
        status: "published" as Post["status"],
        updatedAt: new Date().toISOString(),
      };
  };

  const handleReject = (id: string) => {
    const updated = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            status: "rejected" as Post["status"],
            updatedAt: new Date().toISOString(),
          }
        : post
    );
    setPosts(updated);
    // Cập nhật vào mockPosts (giả lập)
    const idx = mockPosts.findIndex((p) => p.id === id);
    if (idx !== -1)
      mockPosts[idx] = {
        ...mockPosts[idx],
        status: "rejected" as Post["status"],
        updatedAt: new Date().toISOString(),
      };
  };

  const pendingPosts = posts.filter((post) => post.status === "pending");

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Phê duyệt bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingPosts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Không có bài viết chờ duyệt.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded p-4 flex flex-col gap-2"
                >
                  <div className="font-semibold">{post.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Tác giả: {post.author.name}
                  </div>
                  <div className="text-sm">{post.content}</div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => handleApprove(post.id)}>
                      Duyệt
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(post.id)}
                    >
                      Từ chối
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
