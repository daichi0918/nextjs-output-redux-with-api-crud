'use client';

// import { INITIAL_TODO_LIST, INITIAL_TODO_LIST_LENGTH } from '@/constants/data';
import { TodoType } from '@/interfaces/Todo';
import axios from 'axios';
import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
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

export const fetchData = async (
  setOriginalTodoList: Function,
  setTodoListLength: Function
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_END_POINT}/api/todo`
    );
    const data = response.data;
    setOriginalTodoList(data);
    setTodoListLength(data.length);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const TodoProvider: FC<Props> = ({ children }) => {
  const [originalTodoList, setOriginalTodoList] = useState<Array<TodoType>>([]);
  const [todoListLength, setTodoListLength] = useState<number>(0);

  useEffect(() => {
    fetchData(setOriginalTodoList, setTodoListLength);
  }, []);
  return (
    <TodoContext.Provider
      value={{
        originalTodoList,
        setOriginalTodoList,
        todoListLength,
        setTodoListLength,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
