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
};

export type Notification = {
    id: string;
    title: string;
    description: string;
    date: string;
};
