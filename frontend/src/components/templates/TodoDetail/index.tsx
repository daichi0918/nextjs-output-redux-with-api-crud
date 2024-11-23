'use client';
/**
 * TodoDetail
 *
 * @package templates
 */

import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../../contexts/TodoContext';
import { TextAreaForm } from '../../atoms/TextAreaForm';
import InputForm from '@/components/atoms/InputForm';
import styles from './styles.module.css';
import { BaseLayout } from '@/components/organisms/BaseLayout';
import { fetchTodoDetailApi } from '@/apis/todoApi';
import { TodoType } from '@/interfaces/Todo';
/**
 * @param {id: string } id
 * @return {JSX.Element}
 */
export const TodoDetailTemplate = ({ id }: { id: string }) => {
  /**
   * state定義
   */
  const { originalTodoList } = useContext(TodoContext);

  const [targetTodo, setTargetTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await fetchTodoDetailApi(Number(id));
      if (todo && typeof todo !== 'string') {
        setTargetTodo(todo);
      }
    };

    fetchTodo();
  }, [id]);

  return (
    <>
      <>
        <BaseLayout title={'ToDo Detail'}>
          <form className={styles.contents_container}>
            <div className={styles.area}>
              <InputForm value={targetTodo?.title} readOnly={true} />
            </div>
            <div className={styles.area}>
              <TextAreaForm
                className={styles.textarea}
                value={targetTodo?.content || ''}
                readOnly={true}
              />
            </div>
          </form>
        </BaseLayout>
      </>
    </>
  );
};
