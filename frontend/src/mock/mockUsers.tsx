// mockUsers.ts
export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Lưu ý: Trong ứng dụng thực tế, nên hash mật khẩu
  role: "admin" | "editor" | "user";
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Editor User",
    email: "editor@example.com",
    password: "editor123",
    role: "editor",
  },
  {
    id: 3,
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];
