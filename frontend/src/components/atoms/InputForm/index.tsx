/**
 * InputForm
 *
 * @package atoms
 */
import { memo, ComponentProps } from 'react';
import styles from './styles.module.css';
// type Props = JSX.IntrinsicElements['input'];
type Props = ComponentProps<'input'>;

/**
 * @param {InputFormProps} props
 * @returns {JSX.Element}
 */
const InputForm = memo((props: Props) => {
  const { placeholder = '', value, onChange, readOnly = false } = props;
  return (
    <input
      type={'text'}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
});

InputForm.displayName = 'InputForm';

export default InputForm;
