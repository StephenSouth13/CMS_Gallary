import { Card, CardContent } from "@/components/ui/card";
import { Comment } from "@/types";
import { User, CalendarDays } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Chưa có bình luận nào.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">{comment.author.name}</span>
              <span>•</span>
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
