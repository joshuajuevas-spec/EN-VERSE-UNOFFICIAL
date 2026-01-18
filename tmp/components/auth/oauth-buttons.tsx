'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase";
import { signInWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8C0 120.2 106.5 9.4 244 9.4c74.2 0 134.4 29.3 178.6 70.4l-69.8 68.2c-29.4-27.9-67.4-44.8-108.8-44.8-83 0-150.3 67.2-150.3 150.3s67.2 150.3 150.3 150.3c96.2 0 131.2-69.1 135-104.3H244V261.8h244z"></path>
    </svg>
)

interface OAuthButtonsProps {
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export function OAuthButtons({ setIsLoading, setError }: OAuthButtonsProps) {
    const auth = useAuth();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await signInWithGoogle(auth);
            router.push('/profile');
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
    };
    
    return (
        <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
                <GoogleIcon />
                Google
            </Button>
        </div>
    )
}
