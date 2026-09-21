import { User, Session } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  createdAt: string
  lastSignInAt?: string
}

export interface AuthResponse {
  user: User | null
  session: Session | null
  error?: string
}

export interface SecurityBadgeProps {
  label: string
  value: string
  status: 'secure' | 'warning' | 'info'
  description: string
}
