import { useCallback, useContext, useState } from 'react';
import { EventType } from '@/interfaces/Event';
import { TodoContext } from '@/contexts/TodoContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createTodoApi } from '@/apis/todoApi';

export const useTodoCreate = () => {
  const router = useRouter();
  /* state定義 */
  const {
    originalTodoList,
    setOriginalTodoList,
    todoListLength,
    setTodoListLength,
  } = useContext(TodoContext);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [textareaContent, setTextareaContent] = useState<string>('');

  /* action定義 */
  /**
   * titleのvalue更新処理
   * @param { React.ChangeEvent<HTMLInputElement>} e
   */
  const handleInputTitleChange: EventType['onChangeInput'] = useCallback(
    (e) => setInputTitle(e.target.value),
    []
  );
  /**
   * contentのvalue更新処理
   * @param { React.ChangeEvent<HTMLTextAreaElement>} e
   */
  const handleTextareaContentChange: EventType['onChangeTextArea'] =
    useCallback((e) => setTextareaContent(e.target.value), []);
  /**
   * todoListの追加発火処理
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  const handleAddTodo = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    // 入力チェック
    if (inputTitle !== '') {
      try {
        // POSTリクエストで新しいTodoを送信
        const todo = await createTodoApi(inputTitle, textareaContent);
        if (typeof todo !== 'object') return;
        setOriginalTodoList([
          ...originalTodoList,
          { id: todo.id, title: todo.title, content: todo.content },
        ]);
        setTodoListLength((prevLength) => prevLength + 1);

        // 入力フォームをリセット
        setInputTitle('');
        setTextareaContent('');

        // ルーティング
        router.push('/');
      } catch (error) {
        console.error('Todoの追加に失敗しました:', error);
        alert('Todoの追加に失敗しました。');
      }
    }
  };

  return {
    inputTitle,
    textareaContent,
    handleInputTitleChange,
    handleTextareaContentChange,
    handleAddTodo,
  };
};
