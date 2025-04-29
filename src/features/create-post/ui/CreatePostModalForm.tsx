import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  Form,
  FormField,
} from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useForm } from 'react-hook-form';
import type { CreatePostFormSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostFormSchema } from '../model';
import { cn } from '@/shared/lib/style';

type Props = {
  onSubmit: (data: CreatePostFormSchema) => void;
};
const CreatePostModalForm = ({ onSubmit }: Props) => {
  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: '',
      body: '',
      userId: 101,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4')}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Input placeholder="내용" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">게시물 작성</Button>
      </form>
    </Form>
  );
};

export default CreatePostModalForm;
