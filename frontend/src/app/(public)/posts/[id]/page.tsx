"use client";
import { useParams, notFound } from "next/navigation";
import { mockPosts } from "@/mock/mockPosts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import { CommentList } from "@/app/components/public/CommentList";

export default function PostDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const post = mockPosts.find((p) => p.id === id);

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="mb-2 text-2xl">{post.title}</CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.author.name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-8">{post.content}</div>
          <h3 className="font-semibold mb-2">Bình luận</h3>
          <CommentList comments={post.comments} />
        </CardContent>
      </Card>
    </div>
  );
}
