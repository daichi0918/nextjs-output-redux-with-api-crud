'use client';

import { fetchTodoListApi } from '@/apis/todoApi';
import { setTodoList } from '@/store/todoSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TodoType } from '@/interface/Todo';

export default function Home() {
  const dispatch = useDispatch();
  const originTodoList = useSelector((state: RootState) => state.todos.lists);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodoListApi();
      dispatch(setTodoList(typeof data === 'object' ? data : [])); // Redux ストアを更新
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div>Home</div>
      <ul>
        {originTodoList.map((todo: TodoType) => (
          <li key={todo?.id}>{todo?.title}</li>
        ))}
      </ul>
    </>
  );
}
