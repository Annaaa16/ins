import { Query, Resolver } from 'type-graphql';

import extender from '~/helpers/extender';

// sub resolvers
import followUser from './followUser';
import searchUser from './searchUser';

@Resolver()
export default class UserResolver extends extender(searchUser, followUser) {
  @Query((_returns) => String)
  hello() {
    return 'Hello World';
  }
}
