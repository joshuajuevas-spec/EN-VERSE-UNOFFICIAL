'use client';

import { useUser, useAuth, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { signOutUser } from '@/firebase/auth';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Sparkles, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile } from '@/lib/types';


function ProfileSkeleton() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
            <Skeleton className="h-28 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
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
            // Redirect or show a success message can be handled globally or here
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

    const userHandle = userProfile?.email?.split('@')[0] ?? user.email?.split('@')[0] ?? 'engene';

    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
                    <AvatarImage src={userProfile?.photoURL ?? user.photoURL ?? undefined} alt={userProfile?.displayName ?? "User Avatar"} data-ai-hint="user avatar" />
                    <AvatarFallback>{userProfile?.displayName?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{userProfile?.displayName ?? 'ENGENE'}</h1>
                    <p className="text-muted-foreground">@{userHandle}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log Out">
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                 <CardHeader className="flex-row items-center justify-between space-y-0 p-4 sm:p-6">
                    <div className="space-y-1">
                        <CardTitle className="text-xl">AI Content Discovery</CardTitle>
                        <CardDescription>Find the latest Enhypen content automatically.</CardDescription>
                    </div>
                     <Button asChild>
                        <Link href="/discover">
                            Start <Sparkles className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
            </Card>

            <Tabs defaultValue="feed" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="feed">My Feed</TabsTrigger>
                    <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                </TabsList>
                <TabsContent value="feed" className="mt-6">
                    <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border">
                        <p className="font-semibold">Your feed is empty.</p>
                        <p className="text-sm">Posts you create will appear here.</p>
                    </div>
                </TabsContent>
                <TabsContent value="bookmarks" className="mt-6">
                     <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border">
                        <p className="font-semibold">You have no bookmarked items.</p>
                         <p className="text-sm">Save content to find it easily later.</p>
                    </div>
                </TabsContent>
                <TabsContent value="collections" className="mt-6">
                     <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border">
                        <p className="font-semibold">You have no collections.</p>
                        <p className="text-sm">Group your favorite content into collections.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
