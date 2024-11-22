'use client';
/**
 * TodoCreateTemplate
 *
 * @package templates
 */
import InputForm from '@/components/atoms/InputForm';
import styles from './styles.module.css';
import { useTodoCreate } from '@/hooks/TodoCreate';
import { TextAreaForm } from '@/components/atoms/TextAreaForm';
import { Button } from '@/components/atoms/Button';
import { BaseLayout } from '@/components/organisms/BaseLayout';

/**
 * @param {TodoListProps} props
 * @returns {JSX.Element}
 */
const TodoCreateTemplate = () => {
  const {
    inputTitle,
    textareaContent,
    handleInputTitleChange,
    handleTextareaContentChange,
    handleAddTodo,
  } = useTodoCreate();

  return (
    <>
      <BaseLayout title={'Create Todo'}>
        <form className={styles.container}>
          <div className={styles.area}>
            <InputForm
              placeholder={'Title'}
              value={inputTitle}
              onChange={handleInputTitleChange}
            />
          </div>
          <div className={styles.area}>
            <TextAreaForm
              placeholder={'Content'}
              className={styles.textarea}
              value={textareaContent}
              onChange={handleTextareaContentChange}
            />
          </div>
          <div className={styles.area}>
            <Button buttonName={'Create Todo'} onClick={handleAddTodo} />
          </div>
        </form>
      </BaseLayout>
    </>
  );
};

export default TodoCreateTemplate;
