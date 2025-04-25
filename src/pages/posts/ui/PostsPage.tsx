import { cn } from '@/shared/lib';
import { usePosts } from '../api';
import { PostCard } from './PostCard';

const PostPage = () => {
  const { data } = usePosts();
  return (
    <section className={cn('w-screen', 'grid', 'grid-cols-4', 'gap-12')}>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostPage;
