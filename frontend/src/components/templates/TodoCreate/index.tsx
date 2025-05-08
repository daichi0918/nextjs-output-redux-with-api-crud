'use client';
/**
 * TodoCreate
 *
 * @package templates
 */
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { PageContainer } from '@/components/layouts/PageContainer';
import style from './styles.module.css';
import { useTodoCreateTemplate } from './useTodoCreateTemplate';
import { Controller } from 'react-hook-form';
import { InputFormSection } from '@/components/molecules/InputFormSection';
import { TextAreaSection } from '@/components/molecules/TextAreaFormSection';
import { SubmitButton } from '@/components/atoms/SubmitButton';

export const TodoCreateTemplate = () => {
  const { control, errors, handleAddSubmit } = useTodoCreateTemplate();
  return (
    <PageContainer>
      <BaseLayout title={'Create Todo'}>
        <form className={style.container} onSubmit={handleAddSubmit}>
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
            <SubmitButton type={'submit'} buttonName={'Create Todo'} />
          </div>
        </form>
      </BaseLayout>
    </PageContainer>
  );
};
