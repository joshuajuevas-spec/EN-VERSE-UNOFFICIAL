
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-full py-12">
            <AuthCard
                title="Welcome Back"
                description="Sign in to your EN-VERSE account"
                footerText="Don't have an account?"
                footerLink="/signup"
                footerLinkText="Sign Up"
            >
                <LoginForm />
            </AuthCard>
        </div>
    )
}
