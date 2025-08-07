// components/shared/AuthProvider.tsx
"use client";

import { mockUsers, User } from "@/mock/mockUsers";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  register: (
    email: string,
    password: string,
    name: string,
    role: "admin" | "editor" | "user"
  ) => Promise<void>;
  login: (
    email: string,
    password: string,
    role: "admin" | "editor" | "user"
  ) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "admin" | "editor" | "user"
  ) => {
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error("Email đã tồn tại");
    }
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role,
    };
    mockUsers.push(newUser); // Lưu ý: Chỉ lưu trong bộ nhớ
    setUser(newUser);
  };

  const login = async (
    email: string,
    password: string,
    role: "admin" | "editor" | "user"
  ) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!foundUser) {
      throw new Error("Email, mật khẩu hoặc vai trò không đúng");
    }
    setUser(foundUser);
    return foundUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
}
