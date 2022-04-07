import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '~/constants';

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hashSync(password, salt);
};

export default hashPassword;
