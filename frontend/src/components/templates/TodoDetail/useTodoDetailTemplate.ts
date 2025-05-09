import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncCreate,
  fetchAsyncGetById,
  selectEditedTodo,
} from '@/store/todoSlice';

export const useTodoDetailTemplate = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector(selectEditedTodo);

  // 初回マウント時にAPIでデータ取得
  useEffect(() => {
    dispatch(fetchAsyncGetById(id));
  }, [dispatch, id]);

  // // todo が更新されたらフォームに反映
  // useEffect(() => {
  //   if (todo.title) {
  //     reset({ title: todo.title, content: todo.content });
  //   }
  // }, [todo, reset]);

  return { todo };
};
