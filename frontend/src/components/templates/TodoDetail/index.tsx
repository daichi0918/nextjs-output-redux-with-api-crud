'use client';
/**
 * TodoDetail
 *
 * @package templates
 */
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { PageContainer } from '@/components/layouts/PageContainer';
import style from './styles.module.css';
// import { useTodoCreateTemplate } from './useTodoCreateTemplate';
import { Controller } from 'react-hook-form';
import { InputFormSection } from '@/components/molecules/InputFormSection';
import { TextAreaSection } from '@/components/molecules/TextAreaFormSection';
import { SubmitButton } from '@/components/atoms/SubmitButton';
import InputForm from '@/components/atoms/InputForm';
import TextAreaForm from '@/components/atoms/TextAreaForm';
import { useParams } from 'next/navigation';
import { useTodoDetailTemplate } from './useTodoDetailTemplate';

export const TodoDetailTemplate = () => {
  const params = useParams();
  const { todo } = useTodoDetailTemplate(Number(params.id));
  return (
    <PageContainer>
      <BaseLayout title={'Todo Detail'}>
        <form className={style.container}>
          <div className={style.content}>
            <InputForm disabled={true} value={todo.title} />
          </div>
          <div className={style.content}>
            <TextAreaForm disabled={true} value={todo.content} />
          </div>
        </form>
      </BaseLayout>
    </PageContainer>
  );
};
