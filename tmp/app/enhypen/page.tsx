
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { members } from "@/lib/members-data";
import { Users, Calendar, Heart, Building } from "lucide-react";
import Link from "next/link";
import { MemberCard } from "@/components/members/member-card";

export default function EnhypenProfilePage() {
    const enhypenInfo = {
        name: "ENHYPEN",
        koreanName: "엔하이픈",
        debutDate: "November 30, 2020",
        company: "BELIFT LAB",
        fandomName: "ENGENE",
        avatarUrl: "https://picsum.photos/seed/enhypen-group/200",
        bio: "Formed through the 2020 survival competition show I-LAND, ENHYPEN is a South Korean boy band that has quickly risen to global stardom. The group's name symbolizes connection, discovery, and growth, much like a hyphen connects different words to create new meaning.",
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex flex-col items-center space-y-4 pt-8">
                <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={enhypenInfo.avatarUrl} alt={enhypenInfo.name} data-ai-hint="kpop group logo"/>
                    <AvatarFallback>EN</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">{enhypenInfo.name}</h1>
                    <p className="text-lg text-muted-foreground">{enhypenInfo.koreanName}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>About ENHYPEN</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-foreground/90 leading-relaxed">
                        {enhypenInfo.bio}
                    </p>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground">Debut Date</p>
                                <p className="font-medium">{enhypenInfo.debutDate}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Building className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground">Company</p>
                                <p className="font-medium">{enhypenInfo.company}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground">Fandom Name</p>
                                <p className="font-medium">{enhypenInfo.fandomName}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground">Members</p>
                                <p className="font-medium">{members.length}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Members</CardTitle>
                    <CardDescription>Get to know the individuals who make up ENHYPEN.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6">
                        {members.map((member) => (
                        <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
