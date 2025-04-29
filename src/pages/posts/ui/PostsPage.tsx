import { cn } from '@/shared/lib/style';
import { usePosts } from '../../../entities/post/api';
import { PostCard } from './PostCard';
import { CreatePostModal } from '@/features/create-post/ui';

const PostPage = () => {
  const { data } = usePosts();
  return (
    <>
      <header
        className={cn('w-screen', 'px-12', 'mb-12', 'flex', 'justify-between')}
      >
        <h1 className={cn('text-2xl', 'font-bold')}>Posts</h1>
        <CreatePostModal />
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
