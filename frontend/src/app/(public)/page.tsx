import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostList } from "@/app/components/public/PostList";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Chào mừng đến với BlogCMS
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Nền tảng quản lý và chia sẻ bài viết với hệ thống phân quyền người
          dùng hoàn chỉnh
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/posts">Khám phá bài viết</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/register">Tham gia ngay</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tính năng nổi bật
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Đọc bài viết</CardTitle>
              <CardDescription>
                Khám phá hàng ngàn bài viết chất lượng từ cộng đồng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dành cho tất cả người dùng, kể cả khách truy cập
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tương tác & Bình luận</CardTitle>
              <CardDescription>
                Tham gia thảo luận và chia sẻ ý kiến của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dành cho thành viên đã đăng ký
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Viết & Quản lý</CardTitle>
              <CardDescription>
                Tạo và quản lý bài viết của riêng bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dành cho Editor và Admin
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bài viết mới nhất</h2>
          <Button variant="outline" asChild>
            <Link href="/posts">Xem tất cả</Link>
          </Button>
        </div>
        <PostList limit={6} />
      </section>
    </div>
  );
}
