'use client';
/**
 * TodoDetail
 *
 * @package templates
 */

import { useContext } from 'react';
import { TodoContext } from '../../../contexts/TodoContext';
import { TextAreaForm } from '../../atoms/TextAreaForm';
import InputForm from '@/components/atoms/InputForm';
import styles from './styles.module.css';
import { BaseLayout } from '@/components/organisms/BaseLayout';
/**
 * @param {id: string } id
 * @return {JSX.Element}
 */
export const TodoDetailTemplate = ({ id }: { id: string }) => {
  /**
   * state定義
   */
  const { originalTodoList } = useContext(TodoContext);

  // 該当のtodoを取得
  const targetTodo = originalTodoList.filter((todo) => todo.id === Number(id));

  return (
    <>
      <>
        <BaseLayout title={'ToDo Detail'}>
          <form className={styles.contents_container}>
            <div className={styles.area}>
              <InputForm value={targetTodo[0].title} readOnly={true} />
            </div>
            <div className={styles.area}>
              <TextAreaForm
                className={styles.textarea}
                value={targetTodo[0].content || ''}
                readOnly={true}
              />
            </div>
          </form>
        </BaseLayout>
      </>
    </>
  );
};
