import { fetchTodoListApi } from '@/apis/todoApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TodoType } from '@/interface/Todo';
import { TodoTopTemplate } from '@/components/templates/TodoTop';

export default function Home() {
  return <TodoTopTemplate />;
}
