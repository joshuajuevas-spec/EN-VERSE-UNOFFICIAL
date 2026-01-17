
import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-full py-12">
             <AuthCard
                title="Create an Account"
                description="Join EN-VERSE to get the latest updates"
                footerText="Already have an account?"
                footerLink="/login"
                footerLinkText="Log In"
            >
                <SignupForm />
            </AuthCard>
        </div>
    )
}
