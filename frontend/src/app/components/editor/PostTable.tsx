"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { useAuth } from "@/app/components/shared/AuthProviderMock";
import { Post } from "@/types";

interface PostTableProps {
  searchTerm: string;
}

export function PostTable({ searchTerm }: PostTableProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "secondary",
      pending: "outline",
      published: "default",
      rejected: "destructive",
    } as const;

    const labels = {
      draft: "Bản nháp",
      pending: "Chờ duyệt",
      published: "Đã xuất bản",
      rejected: "Bị từ chối",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead>Ngày cập nhật</TableHead>
          <TableHead className="w-[100px]">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">
              <Link href={`/posts/${post.id}`} className="hover:text-primary">
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{getStatusBadge(post.status)}</TableCell>
            <TableCell>
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </TableCell>
            <TableCell>
              {new Date(post.updatedAt).toLocaleDateString("vi-VN")}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/posts/${post.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/editor/edit/${post.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Sửa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(post.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
