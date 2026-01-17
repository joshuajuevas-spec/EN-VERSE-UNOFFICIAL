
export type Era = 'Debut' | 'Border: Day One' | 'Border: Carnival' | 'Dimension: Dilemma' | 'Manifesto: Day 1' | 'Dark Blood' | 'Orange Blood';

export type FeedItem = {
  id: string;
  type: 'Video' | 'News' | 'Photo';
  title: string;
  description: string;
  date: string; // ISO 8601 format
  era: Era;
  imageUrl: string;
  sourceUrl: string;
  memberIds?: string[];
};

export type UserProfile = {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: any; // Firestore ServerTimestamp
};


export type Member = {
    id: string;
    slug: string;
    name: string;
    koreanName: string;
    birthDate: string;
    position: string;
    emoji: string;
    bio: string;
    avatarUrl: string;
    soloActivities: { title: string; date: string; url:string }[];
};
