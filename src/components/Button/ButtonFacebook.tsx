import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import clsx from 'clsx';

import { FACEBOOK_CLIENT_ID, ROUTES } from '~/constants';
import { useLoginFacebookMutation } from '~/types/generated';

interface ButtonFacebookProps {
  className?: string;
}

const ButtonFacebook = ({ className }: ButtonFacebookProps) => {
  const [loginFacebook] = useLoginFacebookMutation();

  const router = useRouter();

  const handleFacebookResponse = async (fbResponse: ReactFacebookLoginInfo) => {
    const response = await loginFacebook({
      variables: {
        accessToken: fbResponse.accessToken,
        userId: fbResponse.userID,
      },
    });

    const data = response.data?.loginFacebook;

    if (data && !data.errors) router.push(ROUTES.HOME);
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
          className={clsx(
            'btn text-sm w-full gap-x-2 h-auth-btn-h',
            'text-white bg-primary',
            className,
          )}
        >
          <FontAwesomeIcon icon={faFacebookSquare} className='text-white' size='lg' />
          <span>Log in with Facebook</span>
        </button>
      )}
    />
  );
};

export default ButtonFacebook;
1;
