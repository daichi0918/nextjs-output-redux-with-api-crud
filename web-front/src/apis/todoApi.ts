import { AxiosResponse } from 'axios';
import { globalAxios, isAxiosError } from '@/apis/config';
import { TodoType } from '@/interfaces/Todo';

/**
 * fetchTodoListApi
 * @returns
 */
export const fetchTodoListApi = async () => {
  try {
    const { data }: AxiosResponse<Array<TodoType>> = await globalAxios.get('todo');
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * fetchTodoDetailApi
 * @param id
 * @returns
 */
export const fetchTodoDetailApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.get(`todo/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};
