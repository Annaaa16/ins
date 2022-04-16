import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface FormFieldProps {
  register: UseFormRegisterReturn;
  placeholder: string;
  className?: string;
  errors: {
    [x: string]: any;
  };
}

const FormField = ({ register, errors, placeholder, className }: FormFieldProps) => {
  const errorMessage = errors[register.name]?.message;

  return (
    <div>
      <div className={clsx('border-1 border-line rounded-sm', 'bg-body', className)}>
        <input
          {...register}
          className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
          type='text'
          placeholder={placeholder}
        />
      </div>
      {errorMessage && (
        <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
