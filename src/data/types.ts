export interface ArchiveImage {
  src: string;
  alt: string;
  caption: string;
  date: string;
  source: string;
  sourceUrl?: string;
  illustrative?: boolean;
}
export interface Foundation {
  id: string;
  title: string;
  summary: string;
  note: string;
  image: ArchiveImage;
}
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  location: string;
  description: string;
  image?: ArchiveImage;
  source: string;
}
export interface Chapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  image?: ArchiveImage;
  referenceIds: string[];
}
export interface Quote {
  lines?: string[];
  id: string;
  quote: string;
  context: string;
  year: string;
  source: string;
  attribution: string;
  placeholder: boolean;
}
export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  type: string;
  image: ArchiveImage;
  caption: string;
  source: string;
}
export interface Concept {
  id: string;
  title: string;
  definition: string;
  relationship: string;
  chapterId: string;
  quote?: string;
}
export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
}
export interface Reference {
  id: string;
  author: string;
  title: string;
  publisher: string;
  year: string;
  url?: string;
  type: string;
}
export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  email: string;
  role: string;
  contribution: string;
  avatar?: string;
}
