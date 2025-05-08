/**
 * InputForm
 *
 * @package atoms
 */
import { memo, ComponentProps, forwardRef } from 'react';
import style from './styles.module.css';
// type Props = JSX.IntrinsicElements['input'];
type Props = ComponentProps<'input'>;

/**
 * @param {InputFormProps} props
 * @returns {JSX.Element}
 */
export const InputForm = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, readOnly = false, ...rest }, ref) => {
    return (
      <input
        type="text"
        className={style.input}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref}
        {...rest}
      />
    );
  }
);

InputForm.displayName = 'InputForm';

export default InputForm;
