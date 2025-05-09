'use client';
/**
 * TodoTop
 *
 * @package templates
 */
import styles from './styles.module.css';
import { EventType } from '@/interface/Event';
import InputForm from '@/components/atoms/InputForm';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import TodoList from '@/components/organisms/TodoList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchAsyncGetAll, selectTodo } from '@/store/todoSlice';
import { TodoType } from '@/interface/Todo';
import { PageContainer } from '@/components/layouts/PageContainer';
/**
 * TodoTemplate
 * @returns {JSX.Element}
 */
export const TodoTopTemplate = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const originTodoList = useSelector(selectTodo);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAsyncGetAll()); // Redux ストアを更新
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
  /* 表示用TodoList */
  const showTodoList = useMemo(() => {
    const regexp = new RegExp('^' + searchKeyWord, 'i');
    return originTodoList?.filter((todo: TodoType) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      return todo.title.match(regexp);
    });
  }, [originTodoList, searchKeyWord]);

  return (
    <PageContainer>
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
              showTodoList={showTodoList}
              handleDeleteTodoTask={() => console.log('aaa')}
            />
          </div>
        </div>
      </BaseLayout>
    </PageContainer>
  );
};
