import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Spinner,
} from '@/shared/ui';

import { useCreatePostMutation } from '../api';
import { CreatePostFormSchema } from '../model';
import CreatePostModalForm from './CreatePostModalForm';
import { useEffect, useState } from 'react';

const CreatePostModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutateAsync: createPost,
    isPending,
    isSuccess,
  } = useCreatePostMutation();

  const handlePostSubmit = async (data: CreatePostFormSchema) => {
    const result = await createPost(data);
    console.log(result);
  };

  useEffect(() => {
    if (isSuccess) {
      alert('게시물이 성공적으로 작성되었습니다.');
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>게시물 작성</Button>
      </DialogTrigger>
      <DialogContent>
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>게시물 작성</DialogTitle>
            </DialogHeader>
            <CreatePostModalForm onSubmit={handlePostSubmit} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
