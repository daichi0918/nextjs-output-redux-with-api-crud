'use client';

// import { INITIAL_TODO_LIST, INITIAL_TODO_LIST_LENGTH } from '@/constants/data';
import { TodoType } from '@/interfaces/Todo';
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

export const TodoProvider: FC<Props> = ({ children }) => {
  const [originalTodoList, setOriginalTodoList] = useState<Array<TodoType>>([]);
  const [todoListLength, setTodoListLength] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/todo`);
      const data = await response.json();
      console.log(data);
      setOriginalTodoList(data);
      setTodoListLength(data.length);
    };

    fetchData();
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
