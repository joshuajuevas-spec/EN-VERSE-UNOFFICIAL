'use client';

import { useUser, useAuth, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { signOutUser } from '@/firebase/auth';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Star, LogOut, ChevronRight, Sparkles, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile } from '@/lib/types';


function ProfileSkeleton() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="text-center space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    )
}

function LoggedOutView() {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <UserIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">You are not logged in</h1>
            <p className="text-muted-foreground mb-6">Sign in to view your profile and manage your account.</p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
        </div>
    )
}


export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const auth = useAuth();
    
    const userRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userRef);

    const handleLogout = async () => {
        try {
            await signOutUser(auth);
            // Redirect or show a success message
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }

    if (isUserLoading || (user && isProfileLoading)) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return <LoggedOutView />;
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarImage src={userProfile?.photoURL ?? user.photoURL ?? undefined} alt={userProfile?.displayName ?? "User Avatar"} data-ai-hint="user avatar" />
                    <AvatarFallback>{userProfile?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{userProfile?.displayName ?? 'ENGENE'}</h1>
                    <p className="text-muted-foreground">{userProfile?.email ?? user.email}</p>
                </div>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>AI Tools</CardTitle>
                </CardHeader>
                <CardContent>
                     <Link href="/discover" className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-4">
                           <Sparkles className="w-5 h-5 text-muted-foreground"/>
                           <span>Automated Content Discovery</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </Link>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-4">
                           <Settings className="w-5 h-5 text-muted-foreground"/>
                           <span>Settings</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                     <Separator />
                    <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                         <div className="flex items-center gap-4">
                           <Shield className="w-5 h-5 text-muted-foreground"/>
                           <span>Privacy &amp; Security</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                     <Separator />
                    <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                         <div className="flex items-center gap-4">
                           <Star className="w-5 h-5 text-muted-foreground"/>
                           <span>My Subscriptions</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardContent className="p-2">
                    <Button variant="destructive" className="w-full justify-start h-auto p-2 text-base" onClick={handleLogout}>
                        <LogOut className="mr-4 h-5 w-5" />
                        Log Out
                    </Button>
                </CardContent>
             </Card>

        </div>
    )
}
