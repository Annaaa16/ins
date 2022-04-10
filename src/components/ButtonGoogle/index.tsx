import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import clsx from 'clsx';

import { GOOGLE_CLIENT_ID } from '~/constants';

interface ButtonGoogleProps {
  className?: string;
}

const ButtonGoogle = ({ className }: ButtonGoogleProps) => {
  const handleGoogleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
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
