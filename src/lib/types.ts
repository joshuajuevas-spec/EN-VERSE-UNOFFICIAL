export type ContentType = 'News' | 'Video' | 'Photo';

export type Era = 'Debut' | 'Border: Day One' | 'Border: Carnival' | 'Dimension: Dilemma' | 'Manifesto: Day 1' | 'Dark Blood' | 'Orange Blood';

export type ContentItem = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  date: string;
  era: Era;
  imageUrl: string;
  sourceUrl: string;
  memberIds?: string[];
};

export type Notification = {
    id: string;
    title: string;
    description: string;
    date: string;
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
    soloActivities: { title: string; date: string; url: string }[];
};
