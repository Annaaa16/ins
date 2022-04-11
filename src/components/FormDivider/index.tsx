import clsx from 'clsx';

const FormDivider = () => {
  return (
    <div className='flex-between my-3'>
      <div className={clsx('h-0.5 w-full', 'bg-line')} />
      <div className={clsx('font-medium mx-4 text-sm', 'text-base-gray')}>OR</div>
      <div className={clsx('h-0.5 w-full', 'bg-line')} />
    </div>
  );
};

export default FormDivider;
