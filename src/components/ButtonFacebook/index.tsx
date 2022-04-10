import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import clsx from 'clsx';

import { FACEBOOK_CLIENT_ID } from '~/constants';

interface ButtonFacebookProps {
  className?: string;
}

const ButtonFacebook = ({ className }: ButtonFacebookProps) => {
  const handleFacebookResponse = (response: ReactFacebookLoginInfo) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_CLIENT_ID}
      autoLoad={false}
      fields='name,email,picture'
      callback={handleFacebookResponse}
      render={(renderProps: any) => (
        <button
          onClick={renderProps.onClick}
          className={clsx('btn text-sm w-full gap-x-2 py-2', 'text-white bg-primary', className)}
        >
          <FontAwesomeIcon icon={faFacebookSquare} className='text-white' size='lg' />
          <span>Log in with Facebook</span>
        </button>
      )}
    />
  );
};

export default ButtonFacebook;
