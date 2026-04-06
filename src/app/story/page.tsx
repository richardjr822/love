// app/story/page.tsx - Cinematic story experience route
import { storyChapters, storyEndMessage } from '@/lib/content';
import StoryViewer from '@/components/story/StoryViewer';

export const metadata = {
  title: 'Our Story',
  description: 'A cinematic journey through our love story',
};

export default function StoryPage() {
  return <StoryViewer chapters={storyChapters} endMessage={storyEndMessage} />;
}
