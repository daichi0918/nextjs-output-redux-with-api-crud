/**
 * TodoTop
 *
 * @packge hooks
 */
import { EventType } from '@/interfaces/Event';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TodoContext } from '@/contexts/TodoContext';
import axios from 'axios';
export const useTodo = () => {
  /* state定義 */
  const { originalTodoList, setOriginalTodoList } = useContext(TodoContext);
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');

  /* action定義 */
  /**
   * 検索キーワード更新処理
   * @param {*} e
   */
  const handleChangeSearchKeyword: EventType['onChangeInput'] = useCallback(
    (e) => setSearchKeyWord(e.target.value),
    []
  );

  /**
   * 表示用TodoList
   */
  const showTodoList = useMemo(() => {
    return originalTodoList.filter((todo) => {
      const regexp = new RegExp('^' + searchKeyWord, 'i');
      return todo.title.match(regexp);
    });
  }, [searchKeyWord, originalTodoList]);

  /**
   * todoの削除処理
   * @param { number } targetId
   * @param { string } taskName
   */
  const handleDeleteTodoTask = async (targetId: number, taskName: string) => {
    if (window.confirm(`「${taskName}」を削除していいですか？`)) {
      try {
        // APIリクエストの実行
        await axios.delete(
          `${process.env.NEXT_PUBLIC_END_POINT}/api/todo/${targetId}`
        );

        // 成功時のローカル状態更新
        const newTodoList = originalTodoList.filter(
          (todo) => todo.id !== targetId
        );
        setOriginalTodoList(newTodoList);

        console.log(`Todo ID ${targetId} を削除しました`);
      } catch (error) {
        // エラー処理
        console.error('Todoの削除に失敗しました:', error);
        alert('Todoの削除に失敗しました。');
      }
    }
  };

  return {
    showTodoList,
    searchKeyWord,
    handleDeleteTodoTask,
    handleChangeSearchKeyword,
  };
};
