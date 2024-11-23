'use client';

import { fetchTodoListApi } from '@/apis/todoApi';
// import { INITIAL_TODO_LIST, INITIAL_TODO_LIST_LENGTH } from '@/constants/data';
import { TodoType } from '@/interfaces/Todo';
import axios from 'axios';
import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface TodoContextInterface {
  originalTodoList: Array<TodoType>;
  setOriginalTodoList: React.Dispatch<React.SetStateAction<Array<TodoType>>>;
  todoListLength: number;
  setTodoListLength: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoContext = createContext({} as TodoContextInterface);

export const TodoProvider: FC<Props> = ({ children }) => {
  const [originalTodoList, setOriginalTodoList] = useState<Array<TodoType>>([]);
  const [todoListLength, setTodoListLength] = useState<number>(0);

  const contextValue = useMemo(
    () => ({
      originalTodoList,
      setOriginalTodoList,
      todoListLength,
      setTodoListLength,
    }),
    [originalTodoList, todoListLength] // `originalTodoList`が変わった場合のみ再生成
  );

  const fetchData = useCallback(async () => {
    const data = await fetchTodoListApi();
    setOriginalTodoList(typeof data === 'object' ? data : []);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
