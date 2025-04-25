import { cn } from '@/shared/lib';
import { usePosts } from '../../../entities/post/api';
import { PostCard } from './PostCard';

const PostPage = () => {
  const { data } = usePosts();
  return (
    <>
      <header className={cn('w-screen', 'px-12', 'mb-12')}>
        <h1 className={cn('text-2xl', 'font-bold')}>Posts</h1>
      </header>
      <section className={cn('w-screen', 'px-12', 'mb-12')}>
        <div className={cn('w-screen', 'grid', 'grid-cols-4', 'gap-12')}>
          {data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PostPage;
