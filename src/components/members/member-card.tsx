import Link from 'next/link';
import Image from 'next/image';
import type { Member } from '@/lib/types';
import { Card } from '@/components/ui/card';

type MemberCardProps = {
  member: Member;
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.slug}`}>
      <Card className="overflow-hidden group relative block w-full bg-card border-0 aspect-[4/5]">
        <Image
          src={member.avatarUrl}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          data-ai-hint="kpop member portrait"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="font-bold text-white text-lg tracking-tight">
            {member.name}
          </h3>
          <p className="text-white/80 text-sm">{member.position}</p>
        </div>
      </Card>
    </Link>
  );
}
