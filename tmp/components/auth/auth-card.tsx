
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
    title: string;
    description: string;
    footerText: string;
    footerLink: string;
    footerLinkText: string;
}

export function AuthCard({ children, title, description, footerText, footerLink, footerLinkText }: AuthCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {children}
            </CardContent>
            <CardFooter>
                <div className="text-sm w-full text-center">
                    {footerText}{" "}
                    <Link href={footerLink} className="underline">
                        {footerLinkText}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
