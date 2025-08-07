// "use client";

// import { AuthContextType, User } from "@/types";
// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in from localStorage or cookie
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           // Verify token with backend
//           const response = await fetch("/api/auth/verify", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (response.ok) {
//             const userData = await response.json();
//             setUser(userData.user);
//           } else {
//             localStorage.removeItem("token");
//           }
//         }
//       } catch (error) {
//         console.error("Auth check failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//         localStorage.setItem("token", data.token);
//       } else {
//         throw new Error("Login failed");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const register = async (
//     email: string,
//     password: string,
//     name: string,
//     role: string = "user"
//   ) => {
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, name, role }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//         localStorage.setItem("token", data.token);
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
