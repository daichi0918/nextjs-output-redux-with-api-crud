/**
 * useTodo
 *
 * @package hooks
 */
import { useState, useCallback, useEffect } from 'react';
import { fetchTodoListApi } from '@/apis/todoApi';
import { INIT_UNIQUE_ID } from '@/constants/data';
import { TodoType } from '@/interfaces/Todo';

/**
 * useTodo
 */
export const useTodo = () => {
  /* todolist */
  const [originTodoList, setOriginTodoList] = useState<Array<TodoType>>([]);
  /* todo採番ID */
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);

  /* actions */

  const fetchTodoList = useCallback(async (): Promise<void> => {
    const data = await fetchTodoListApi();
    setOriginTodoList(typeof data === 'object' ? data : []);
  }, []);

  /**
   * Todo新規登録処理
   * @param {string} title
   * @param {string} content
   */
  const addTodo = useCallback(
    (title: string, content: string) => {
      const nextUniqueId = uniqueId + 1;
      const newTodo = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: title,
          content: content,
        },
      ];
      // todolistを更新
      setOriginTodoList(newTodo);
      // 採番IDを更新
      setUniqueId(nextUniqueId);
    },
    [originTodoList, uniqueId]
  );

  /**
   * Todo更新処理
   * @param {number} id
   * @param {string} title
   * @param {string} content
   * @type {(function(*, *, *): void)|*}
   */
  const updateTodo = useCallback(
    (id: number, title: string, content: string) => {
      const updatedTodoList = originTodoList.map((todo) => {
        if (id === todo.id) {
          return {
            id: todo.id,
            title: title,
            content: content,
          };
        }

        return todo;
      });
      setOriginTodoList(updatedTodoList);
    },
    [originTodoList]
  );

  /**
   * Todo削除処理
   * @param { number } targetId
   * @param { string }targetTitle
   */
  const deleteTodo = useCallback(
    (targetId: number, targetTitle: string) => {
      if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
        // 削除するid以外のtodoリストを再編集
        // filterを用いた方法
        const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);

        // 削除するTodoの配列番号を取り出してspliceで削除する方法もある
        // const newTodoList = [...todoList];
        // const deleteIndex = newTodoList.findIndex((todo) => todo.id === targetId);
        // newTodoList.splice(deleteIndex, 1);

        // todoを削除したtodo listで更新
        setOriginTodoList(newTodoList);
      }
    },
    [originTodoList]
  );

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  return {
    originTodoList,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
