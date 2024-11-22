'use client';
/**
 * TodoUpdate
 *
 * @package templates
 */

'use client';
import { TextAreaForm } from '../../atoms/TextAreaForm';
import InputForm from '@/components/atoms/InputForm';
import styles from './styles.module.css';
import { Button } from '@/components/atoms/Button';
import { useTodoEdit } from '@/hooks/TodoEdit';
import { BaseLayout } from '@/components/organisms/BaseLayout';

/**
 * @param {id: string } id
 * @return {JSX.Element}
 */
export const TodoUpdateTemplate = ({ id }: { id: string }) => {
  // hooksからstateとactionを取得
  const {
    editInputTitleValue,
    editTextareaContentValue,
    handleEditInputTitlChange,
    handleEditTextareaContentChange,
    handleUpdateTodo,
  } = useTodoEdit({ id });
  return (
    <>
      <BaseLayout title={'Todo Edit'}>
        <form className={styles.contents_container}>
          <div className={styles.area}>
            <InputForm
              placeholder={'Title'}
              value={editInputTitleValue}
              onChange={handleEditInputTitlChange}
            />
          </div>
          <div className={styles.area}>
            <TextAreaForm
              className={styles.textarea}
              placeholder={'Content'}
              value={editTextareaContentValue}
              onChange={handleEditTextareaContentChange}
            />
          </div>
          <div className={styles.area}>
            <Button
              buttonName={'Edit Todo'}
              onClick={(e) => {
                handleUpdateTodo(e, id);
              }}
            />
          </div>
        </form>
      </BaseLayout>
    </>
  );
};
