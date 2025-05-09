'use client';
/**
 * TodoEdit
 *
 * @package templates
 */
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { PageContainer } from '@/components/layouts/PageContainer';
import style from './styles.module.css';
import { useTodoEditTemplate } from './useTodoEditTemplate';
import { Controller } from 'react-hook-form';
import { InputFormSection } from '@/components/molecules/InputFormSection';
import { TextAreaSection } from '@/components/molecules/TextAreaFormSection';
import { SubmitButton } from '@/components/atoms/SubmitButton';
import { useParams } from 'next/navigation';

export const TodoEditTemplate = () => {
  const params = useParams();
  const { control, errors, handleUpdateSubmit } = useTodoEditTemplate(
    Number(params.id)
  );
  return (
    <PageContainer>
      <BaseLayout title={'Todo Edit'}>
        <form className={style.container} onSubmit={handleUpdateSubmit}>
          <div className={style.content}>
            <Controller
              name="title"
              render={({ field }) => (
                <InputFormSection
                  placeholder={'Title'}
                  errorMessage={errors.title?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={style.content}>
            <Controller
              name="content"
              render={({ field }) => (
                <TextAreaSection
                  placeholder={'Content'}
                  errorMessage={errors.content?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={style.content}>
            <SubmitButton type={'submit'} buttonName={'Update Todo'} />
          </div>
        </form>
      </BaseLayout>
    </PageContainer>
  );
};
