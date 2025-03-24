"use client";

import LoginForm from '@/components/(account)/auth/LoginForm';
import { useAuth } from '@/hooks/(account)/auth/useAuth';

export default function LoginPage() {
    const auth = useAuth();
    
    return <LoginForm {...auth} />;
}
  