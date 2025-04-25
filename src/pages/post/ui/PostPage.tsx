import { usePost } from '@/entities/post/api';
import { useParams } from 'react-router';
import PostUserInfo from './PostUserInfo';
import { cn } from '@/shared/lib';
import PostComments from './PostComments';

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data } = usePost({ id: Number(postId) });

  return (
    <>
      <header className={cn('w-full', 'px-12', 'mb-12')}>
        <h1 className={cn('text-2xl', 'font-bold')}>{postId}번째 게시글</h1>
      </header>
      <section className={cn('w-full', 'h-full', 'p-12')}>
        <h2 className={cn('text-3xl', 'font-bold', 'mb-5')}>{data.title}</h2>
        <PostUserInfo userId={data.userId} />

        <p className={cn('text-sm', 'text-gray-500', 'mt-10')}>{data.body}</p>
      </section>
      <section className={cn('w-full', 'h-full', 'p-12')}>
        <h3 className={cn('text-2xl', 'font-bold', 'mb-5')}>댓글</h3>
        <PostComments postId={Number(postId)} />
      </section>
    </>
  );
};

export default PostPage;
