/**
 * TextAreaForm
 *
 * @package atoms
 */
import { memo } from 'react';
import styles from './styles.module.css';

type Props = JSX.IntrinsicElements['textarea'];

/**
 * @param {TextAreaFormProps} props
 * @returns {JSX.Element}
 */
export const TextAreaForm = memo((props: Props) => {
  const { placeholder = '', value, onChange, readOnly = false } = props;
  return (
    <textarea
      placeholder={placeholder}
      className={styles.textarea}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
});
