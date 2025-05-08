import { FC, ComponentProps } from 'react';
import styles from './styles.module.css';
import { TextAreaForm } from '../../atoms/TextAreaForm';

type TextAreaProps = ComponentProps<'textarea'> & {
  errorMessage?: string;
};

export const TextAreaSection: FC<TextAreaProps> = (props) => (
  <>
    <TextAreaForm placeholder={'Content'} {...props} />
    {props?.errorMessage && (
      <p className={styles.error}>{props.errorMessage}</p>
    )}
  </>
);
