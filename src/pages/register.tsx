import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { PATHS } from '~/constants';
import { registerSchema } from '~/helpers/formSchemas';
import { useRegisterMutation, RegisterInput } from '~/types/generated';
import toErrorMap from '~/helpers/toErrorMap';

import Meta from '~/layouts/Meta';
import FormField from '~/components/FormField';
import ButtonFacebook from '~/components/ButtonFacebook';
import ButtonGoogle from '~/components/ButtonGoogle';

// images
import { logo } from '~/assets/images';

const Register = () => {
  const [registerUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter();

  const handleRegisterSubmit = async ({ email, password, username }: RegisterInput) => {
    const response = await registerUser({
      variables: {
        registerInput: {
          email,
          username,
          password,
        },
      },
    });

    if (response.data?.register.errors) {
      const { field, message } = toErrorMap(response.data.register.errors);

      setError(field, {
        message,
      });
    } else {
      router.push(PATHS.LOGIN);
    }
  };

  useEffect(() => setFocus('email'), [setFocus]);

  return (
    <Meta title='Register'>
      <div className={clsx('w-form-w mx-auto py-9')}>
        <div className='wrapper-border px-10 py-12'>
          <img className='mx-auto' src={logo.src} alt='Logo' />
          <h1 className={clsx('font-medium mt-4 text-center', 'text-base-gray')}>
            Sign up to see photos and videos from your friends.
          </h1>

          <ButtonFacebook className='mt-3' />
          <ButtonGoogle className='mt-3' />

          <div className='flex-between my-3'>
            <div className={clsx('h-0.5 w-full', 'bg-line')} />
            <div className={clsx('font-medium mx-4 text-sm', 'text-base-gray')}>OR</div>
            <div className={clsx('h-0.5 w-full', 'bg-line')} />
          </div>

          <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(handleRegisterSubmit)}>
            <FormField register={register('email')} placeholder='Email' errors={errors} />
            <FormField register={register('username')} placeholder='Username' errors={errors} />
            <FormField register={register('password')} placeholder='Password' errors={errors} />

            <button
              className={clsx('btn text-sm w-full gap-x-2 py-2 mt-2', 'text-white bg-primary')}
            >
              <span>Sign up</span>
            </button>

            <p className={clsx('text-xs text-center mt-2', 'text-base-gray')}>
              By signing up, you agree to our <span className='font-medium'>Terms</span>,{' '}
              <span className='font-medium'>Data Policy</span> and{' '}
              <span className='font-medium'>Cookies Policy</span>.
            </p>
          </form>
        </div>

        <div className='wrapper-border flex-center text-sm py-6 mt-3'>
          Have an account?<span className={clsx('ml-1', 'text-primary')}>Log in</span>
        </div>
      </div>
    </Meta>
  );
};

export default Register;
