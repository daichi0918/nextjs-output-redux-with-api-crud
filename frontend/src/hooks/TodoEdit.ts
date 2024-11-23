/**
 * TodoEdit
 *
 * @packge hooks
 */
import { useContext, useMemo, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/**
 * useTodoEdit
 */

export const useTodoEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  /**
   * state定義
   */
  const {
    originalTodoList,
    setOriginalTodoList,
    todoListLength,
    setTodoListLength,
  } = useContext(TodoContext);
  // 該当のtodoを取得
  const targetTodo = originalTodoList.filter((todo) => todo.id === Number(id));

  if (!targetTodo) {
    throw new Error(`Todo with id ${id} not found`);
  }

  // 初期値設定
  const [editInputTitleValue, setEditInputTitleValue] = useState<string>(
    targetTodo[0].title || ''
  );
  const [editTextareaContentValue, setEditTextareaContentValue] =
    useState<string>(targetTodo[0].content || '');

  /**
   * action定義
   */
  /**
   * titleの更新処理
   * @param { React.ChangeEvent<HTMLInputElement>} e
   */
  const handleEditInputTitlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditInputTitleValue(e.target.value);
  /**
   * contentの更新処理
   * @param { React.ChangeEvent<HTMLInputElement>} e
   */
  const handleEditTextareaContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditTextareaContentValue(e.target.value);
  /**
   * todoListの更新発火処理
   * @param {React.MouseEvent<HTMLButtonElement>} e
   * @param {string} targetId
   */
  const handleUpdateTodo = async (
    e: React.MouseEvent<HTMLButtonElement>,
    targetId: string
  ): Promise<void> => {
    e.preventDefault();

    if (editInputTitleValue !== '') {
      const updatedTodo = {
        title: editInputTitleValue,
        content: editTextareaContentValue,
      };

      try {
        // PATCHリクエストでTodoを更新
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/todo/${targetId}`,
          updatedTodo
        );

        // サーバーから返された更新後のTodoを使ってローカル状態を更新
        const updatedTodoData = response.data;
        const updatedTodoList = originalTodoList.map((todo) =>
          todo.id === Number(targetId)
            ? {
                ...todo,
                title: updatedTodoData.title,
                content: updatedTodoData.content,
              }
            : todo
        );
        setOriginalTodoList(updatedTodoList);

        // 更新後、トップページに遷移
        router.push('/');

        console.log('Todoが正常に更新されました', updatedTodoData);
      } catch (error) {
        console.error('Todoの更新に失敗しました:', error);
        alert('Todoの更新に失敗しました。');
      }
    }
  };
  return {
    editInputTitleValue,
    editTextareaContentValue,
    handleEditInputTitlChange,
    handleEditTextareaContentChange,
    handleUpdateTodo,
  };
};
