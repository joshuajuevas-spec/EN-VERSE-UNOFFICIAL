import { members } from '@/lib/members-data';
import { MemberCard } from '@/components/members/member-card';
import { Users } from 'lucide-react';

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Meet the Members
          </h1>
          <p className="text-muted-foreground">
            Get to know the individuals who make up ENHYPEN.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
