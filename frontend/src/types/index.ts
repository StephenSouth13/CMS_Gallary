export interface User {
  id: string
  email: string
  name: string
  role: 'guest' | 'user' | 'editor' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  status: 'draft' | 'pending' | 'published' | 'rejected'
  authorId: string
  author: User
  createdAt: string
  updatedAt: string
  publishedAt?: string
  comments: Comment[]
  tags: string[]
  image?: string // Thêm trường ảnh đại diện
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  author: User
  createdAt: string
  updatedAt: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role?: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
