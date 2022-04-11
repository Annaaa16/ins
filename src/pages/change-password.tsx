import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { PATHS } from '~/constants';
import { useChangePasswordMutation } from '~/types/generated';
import { changePasswordSchema } from '~/helpers/formSchemas';
import toErrorMap from '~/helpers/toErrorMap';

import Meta from '~/layouts/Meta';
import FormField from '~/components/FormField';

// images
import { logo } from '~/assets/images';

interface ChangePasswordInput {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValidating },
  } = useForm<ChangePasswordInput>({
    resolver: yupResolver(changePasswordSchema),
  });

  const router = useRouter();

  const [changePassword] = useChangePasswordMutation();

  const handleChangePasswordSubmit = async ({ confirmPassword }: ChangePasswordInput) => {
    const response = await changePassword({
      variables: {
        newPassword: confirmPassword,
        token: router.query.token as string,
        userId: router.query.userId as string,
      },
    });

    const data = response.data?.changePassword;

    if (data?.errors) {
      const { message } = toErrorMap(data.errors);

      setServerErrorMessage(message);
    }
  };

  useEffect(() => setFocus('password'), [setFocus]);

  useEffect(() => {
    if (isValidating) setServerErrorMessage('');
  }, [isValidating]);

  let body = null;

  if (!serverErrorMessage) {
    body = (
      <form
        className='flex flex-col gap-y-3 mt-10'
        onSubmit={handleSubmit(handleChangePasswordSubmit)}
      >
        <FormField register={register('password')} placeholder='New Password' errors={errors} />
        <FormField
          register={register('confirmPassword')}
          placeholder='Confirm Password'
          errors={errors}
        />

        <button
          type='submit'
          className={clsx('btn text-sm w-full py-2 mt-2', 'text-white bg-primary')}
        >
          Change Password
        </button>
      </form>
    );
  } else {
    body = (
      <>
        <div className={clsx('text-sm-1 text-center mt-4', 'text-red-500')}>
          {serverErrorMessage}
        </div>
        <button
          onClick={() => router.push(PATHS.FORGOT_PASSWORD)}
          className={clsx('btn text-sm w-full py-2 mt-5', 'text-white bg-primary')}
        >
          Back To Reset Password
        </button>
      </>
    );
  }

  return (
    <Meta title='Change Password'>
      <div className={clsx('w-form-w mx-auto py-9')}>
        <div className='wrapper-border px-10 py-12'>
          <img className='mx-auto' src={logo.src} alt='Logo' />

          {body}
        </div>

        <button
          onClick={() => router.push(PATHS.LOGIN)}
          className={clsx(
            'w-full font-medium py-3 text-sm border-1 border-line border-t-0',
            'bg-gray-50',
            'active:opacity-70',
          )}
        >
          Back To Login
        </button>
      </div>
    </Meta>
  );
};

export default ChangePassword;
