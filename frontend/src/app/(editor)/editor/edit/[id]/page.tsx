import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import { CommentForm } from "@/app/components/public/CommentForm";
import { CommentList } from "@/app/components/public/CommentList";

// Mock function - replace with actual API call
async function getPost(id: string) {
  // This would be replaced with actual API call
  return {
    id,
    title: "Bài viết mẫu",
    content:
      "Đây là nội dung của bài viết mẫu. Nội dung này sẽ được thay thế bằng dữ liệu thực từ API.",
    author: { name: "Tác giả mẫu", id: "1" },
    createdAt: "2024-01-15",
    tags: ["React", "Next.js", "TypeScript"],
    comments: [],
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Bình luận</h2>
        <CommentForm postId={id} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  );
}
