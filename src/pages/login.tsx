import { useEffect } from 'react';
import NextLink from 'next/link';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { PATHS } from '~/constants';
import { loginSchema } from '~/helpers/formSchemas';
import { LoginInput, useLoginMutation } from '~/types/generated';
import toErrorMap from '~/helpers/toErrorMap';

import Meta from '~/layouts/Meta';
import FormField from '~/components/FormField';
import ButtonFacebook from '~/components/ButtonFacebook';
import ButtonGoogle from '~/components/ButtonGoogle';
import FormDivider from '~/components/FormDivider';
import LoginScreenshot from '~/features/login/LoginScreenshot';

// images
import { logo } from '~/assets/images';

const Login = () => {
  const [loginUser] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
    setFocus,
    setError,
    clearErrors,
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const handleLoginSubmit = async ({ password, username }: LoginInput) => {
    const response = await loginUser({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
    });

    if (response.data?.login.errors) {
      const { message } = toErrorMap(response.data.login.errors);

      setError(
        'username',
        {
          message,
        },
        { shouldFocus: true },
      );
      setError('password', {
        message,
      });
    } else {
      // router.push(PATHS.LOGIN);
    }
  };

  useEffect(() => setFocus('username'), [setFocus]);

  useEffect(() => {
    if (isValidating) clearErrors();
  }, [isValidating, clearErrors]);

  return (
    <Meta title='Login'>
      <div className={clsx('flex justify-center lg:w-container-w mx-auto')}>
        <LoginScreenshot />
        <div className={clsx('w-form-w py-9')}>
          <div className='wrapper-border px-10 py-12'>
            <img className='mx-auto' src={logo.src} alt='Logo' />

            <form
              className='flex flex-col gap-y-3 mt-10'
              onSubmit={handleSubmit(handleLoginSubmit)}
            >
              <FormField register={register('username')} placeholder='Username' errors={errors} />
              <FormField register={register('password')} placeholder='Password' errors={errors} />

              <button
                type='submit'
                className={clsx('btn text-sm w-full gap-x-2 py-2 mt-2', 'text-white bg-primary')}
              >
                Log in
              </button>
            </form>

            <FormDivider className='my-3' />

            <ButtonFacebook className='mt-6' />
            <ButtonGoogle className='mt-3' />

            <NextLink href={PATHS.FORGOT_PASSWORD}>
              <a className={clsx('block text-sm-1 w-full text-center mt-7', 'text-primary')}>
                Forgot password?
              </a>
            </NextLink>
          </div>

          <div className='wrapper-border flex-center text-sm py-6 mt-3'>
            Don&apos;t have an account?
            <NextLink href={PATHS.REGISTER}>
              <a className={clsx('ml-1', 'text-primary')}>Sign up</a>
            </NextLink>
          </div>
        </div>
      </div>
    </Meta>
  );
};

export default Login;
