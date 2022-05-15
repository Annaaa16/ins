import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import clsx from 'clsx';

import { GOOGLE_CLIENT_ID, ROUTES } from '~/constants';
import { useLoginGoogleMutation } from '~/types/generated';

interface ButtonGoogleProps {
  className?: string;
}

// TODO: Fix auto request when in incognito mode
const ButtonGoogle = ({ className }: ButtonGoogleProps) => {
  const [loginGoogle] = useLoginGoogleMutation();

  const router = useRouter();

  const handleGoogleResponse = async (
    ggResponse: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (ggResponse.code) return;

    const response = await loginGoogle({
      variables: {
        clientId: GOOGLE_CLIENT_ID as string,
        tokenId: (ggResponse as GoogleLoginResponse).tokenId,
      },
    });

    const data = response.data?.loginGoogle;

    if (data && !data.errors) router.push(ROUTES.HOME);
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID as string}
      buttonText='Login'
      onSuccess={handleGoogleResponse}
      onFailure={handleGoogleResponse}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className={clsx('btn text-sm w-full gap-x-2 py-2', 'text-white bg-base-red', className)}
        >
          <FontAwesomeIcon icon={faGoogle} className='text-white' size='1x' />
          <span>Log in with Google</span>
        </button>
      )}
    />
  );
};

export default ButtonGoogle;
1;
