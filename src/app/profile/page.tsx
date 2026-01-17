import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Star, LogOut, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/200" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">ENGENE</h1>
                    <p className="text-muted-foreground">engene@example.com</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
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
                           <span>Privacy & Security</span>
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
                    <Button variant="destructive" className="w-full justify-start h-auto p-2 text-base">
                        <LogOut className="mr-4 h-5 w-5" />
                        Log Out
                    </Button>
                </CardContent>
             </Card>

        </div>
    )
}
