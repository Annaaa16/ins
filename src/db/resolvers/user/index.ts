import { Query, Resolver } from 'type-graphql';

import extender from '~/helpers/extender';
import searchUser from './searchUser';

@Resolver()
export default class UserResolver extends extender(searchUser) {
  @Query((_returns) => String)
  hello() {
    return 'Hello World';
  }
}
