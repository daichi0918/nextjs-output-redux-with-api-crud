import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  editTodo,
  fetchAsyncCreate,
  fetchAsyncGetById,
  fetchAsyncUpdate,
  selectEditedTodo,
  selectedTodo,
} from '@/store/todoSlice';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});
export const useTodoEditTemplate = (id: number) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector(selectEditedTodo);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', content: '' },
  });

  const handleUpdateSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        await dispatch(
          fetchAsyncUpdate({
            id: id,
            title: values.title,
            content: values.content,
          })
        );
        router.push('/');
      },
      [dispatch, router, id]
    )
  );

  // 初回マウント時にAPIでデータ取得
  useEffect(() => {
    dispatch(fetchAsyncGetById(id));
  }, [dispatch, id]);

  // todo が更新されたらフォームに反映
  useEffect(() => {
    if (todo.title) {
      reset({ title: todo.title, content: todo.content });
    }
  }, [todo, reset]);

  return {
    control,
    errors,
    handleUpdateSubmit,
  };
};
