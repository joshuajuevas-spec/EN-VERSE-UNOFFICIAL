import Link from 'next/link';
import type { Member } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MemberCardProps = {
  member: Member;
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.slug}`} className="flex flex-col items-center gap-3 text-center transition-transform duration-300 ease-in-out hover:-translate-y-1 group">
      <Avatar className="w-24 h-24 border-2 border-border/50 group-hover:border-primary transition-colors duration-300 shadow-lg">
        <AvatarImage 
            src={member.avatarUrl} 
            alt={member.name} 
            className="object-cover"
            data-ai-hint="kpop member portrait"
        />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.position}</p>
      </div>
    </Link>
  );
}
