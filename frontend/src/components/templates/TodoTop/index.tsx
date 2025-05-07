'use client';
/**
 * TodoTop
 *
 * @package templates
 */
import styles from './styles.module.css';
import { EventType } from '@/interface/Event';
import InputForm from '@/components/atoms/InputForm';
import { BaseLayout } from '@/components/organisms/BaseLayout';
import TodoList from '@/components/organisms/TodoList';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTodoListApi } from '@/apis/todoApi';
/**
 * TodoTemplate
 * @returns {JSX.Element}
 */
export const TodoTopTemplate = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const dispatch = useDispatch();
  const originTodoList = useSelector((state: RootState) => state.todos.lists);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodoListApi();
      dispatch(setTodoList(typeof data === 'object' ? data : [])); // Redux ストアを更新
    };
    fetchData();
  }, [dispatch]);

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
   *
   */
  return (
    <BaseLayout title={'Todo List'}>
      <div className={styles.common}>
        <div className={styles.area}>
          <InputForm
            placeholder={'Search Keyword'}
            value={searchKeyWord}
            onChange={handleChangeSearchKeyword}
          />
        </div>
        <div className={styles.area}>
          <TodoList
            showTodoList={originTodoList}
            handleDeleteTodoTask={() => console.log('aaa')}
          />
        </div>
      </div>
    </BaseLayout>
  );
};
