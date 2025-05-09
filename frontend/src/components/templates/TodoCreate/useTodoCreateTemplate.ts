import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchAsyncCreate } from '@/store/todoSlice';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});
export const useTodoCreateTemplate = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', content: undefined },
  });

  const handleAddSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        await dispatch(
          fetchAsyncCreate({ title: values.title, content: values.content })
        );
        router.push('/');
      },
      [dispatch, router]
    )
  );

  return {
    control,
    errors,
    handleAddSubmit,
  };
};
