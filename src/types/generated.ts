import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreatePostInput = {
  base64Photo: Scalars['String'];
  caption: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  linkReset?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GetSessionResponse = {
  __typename?: 'GetSessionResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  createPost: PostMutationResponse;
  deletePost: BaseResponse;
  forgotPassword: ForgotPasswordResponse;
  login: UserMutationResponse;
  loginFacebook: UserMutationResponse;
  loginGoogle: UserMutationResponse;
  logout: Scalars['Boolean'];
  reactPost: BaseResponse;
  register: UserMutationResponse;
  updatePost: PostMutationResponse;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};

export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  usernameOrEmail: Scalars['String'];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationLoginGoogleArgs = {
  clientId: Scalars['String'];
  tokenId: Scalars['String'];
};

export type MutationReactPostArgs = {
  postId: Scalars['String'];
  reaction: Reaction;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  code: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  success: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  photo?: Maybe<Scalars['String']>;
  photoId?: Maybe<Scalars['String']>;
  reactions: Array<User>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getPosts: PaginatedPostsResponse;
  getSession: GetSessionResponse;
  hello: Scalars['String'];
};

export type QueryGetPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};

export enum Reaction {
  Like = 'LIKE',
  Unlike = 'UNLIKE',
}

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  newPhoto?: InputMaybe<Scalars['String']>;
  oldPhotoUrl?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  account: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type FieldErrorFragment = { __typename?: 'FieldError'; field: string; message: string };

export type PostInfoFragment = {
  __typename?: 'Post';
  _id: string;
  caption?: string | null;
  photo?: string | null;
  createdAt: any;
  updatedAt: any;
  reactions: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  user: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  };
};

export type PostMutationResponseFragment = {
  __typename?: 'PostMutationResponse';
  code: number;
  success: boolean;
  message?: string | null;
  post?: {
    __typename?: 'Post';
    _id: string;
    caption?: string | null;
    photo?: string | null;
    createdAt: any;
    updatedAt: any;
    reactions: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
    user: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    };
  } | null;
};

export type UserInfoFragment = {
  __typename?: 'User';
  _id: string;
  email: string;
  username: string;
  account: string;
  avatar?: string | null;
};

export type UserMutationResponseFragment = {
  __typename?: 'UserMutationResponse';
  code: number;
  success: boolean;
  message?: string | null;
  user?: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  } | null;
  errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  userId: Scalars['String'];
  token: Scalars['String'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'PostMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    post?: {
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      };
    } | null;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: {
    __typename?: 'ForgotPasswordResponse';
    code: number;
    success: boolean;
    message?: string | null;
    linkReset?: string | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginFacebookMutationVariables = Exact<{
  userId: Scalars['String'];
  accessToken: Scalars['String'];
}>;

export type LoginFacebookMutation = {
  __typename?: 'Mutation';
  loginFacebook: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginGoogleMutationVariables = Exact<{
  clientId: Scalars['String'];
  tokenId: Scalars['String'];
}>;

export type LoginGoogleMutation = {
  __typename?: 'Mutation';
  loginGoogle: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  __typename?: 'Query';
  getSession: {
    __typename?: 'GetSessionResponse';
    code: number;
    success: boolean;
    accessToken?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    } | null;
  };
};

export const UserInfoFragmentDoc = gql`
  fragment userInfo on User {
    _id
    email
    username
    account
    avatar
  }
`;
export const PostInfoFragmentDoc = gql`
  fragment postInfo on Post {
    _id
    caption
    photo
    reactions {
      _id
      email
      username
      account
      avatar
    }
    user {
      ...userInfo
    }
    createdAt
    updatedAt
  }
  ${UserInfoFragmentDoc}
`;
export const PostMutationResponseFragmentDoc = gql`
  fragment postMutationResponse on PostMutationResponse {
    code
    success
    message
    post {
      ...postInfo
    }
  }
  ${PostInfoFragmentDoc}
`;
export const FieldErrorFragmentDoc = gql`
  fragment fieldError on FieldError {
    field
    message
  }
`;
export const UserMutationResponseFragmentDoc = gql`
  fragment userMutationResponse on UserMutationResponse {
    code
    success
    message
    user {
      ...userInfo
    }
    errors {
      ...fieldError
    }
  }
  ${UserInfoFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($newPassword: String!, $userId: String!, $token: String!) {
    changePassword(newPassword: $newPassword, userId: $userId, token: $token) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument,
    options,
  );
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      ...postMutationResponse
    }
  }
  ${PostMutationResponseFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($usernameOrEmail: String!) {
    forgotPassword(usernameOrEmail: $usernameOrEmail) {
      code
      success
      message
      errors {
        ...fieldError
      }
      linkReset
    }
  }
  ${FieldErrorFragmentDoc}
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    options,
  );
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LoginFacebookDocument = gql`
  mutation LoginFacebook($userId: String!, $accessToken: String!) {
    loginFacebook(userId: $userId, accessToken: $accessToken) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginFacebookMutationFn = Apollo.MutationFunction<
  LoginFacebookMutation,
  LoginFacebookMutationVariables
>;

/**
 * __useLoginFacebookMutation__
 *
 * To run a mutation, you first call `useLoginFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFacebookMutation, { data, loading, error }] = useLoginFacebookMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useLoginFacebookMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginFacebookMutation, LoginFacebookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginFacebookMutation, LoginFacebookMutationVariables>(
    LoginFacebookDocument,
    options,
  );
}
export type LoginFacebookMutationHookResult = ReturnType<typeof useLoginFacebookMutation>;
export type LoginFacebookMutationResult = Apollo.MutationResult<LoginFacebookMutation>;
export type LoginFacebookMutationOptions = Apollo.BaseMutationOptions<
  LoginFacebookMutation,
  LoginFacebookMutationVariables
>;
export const LoginGoogleDocument = gql`
  mutation LoginGoogle($clientId: String!, $tokenId: String!) {
    loginGoogle(clientId: $clientId, tokenId: $tokenId) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginGoogleMutationFn = Apollo.MutationFunction<
  LoginGoogleMutation,
  LoginGoogleMutationVariables
>;

/**
 * __useLoginGoogleMutation__
 *
 * To run a mutation, you first call `useLoginGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGoogleMutation, { data, loading, error }] = useLoginGoogleMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useLoginGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginGoogleMutation, LoginGoogleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginGoogleMutation, LoginGoogleMutationVariables>(
    LoginGoogleDocument,
    options,
  );
}
export type LoginGoogleMutationHookResult = ReturnType<typeof useLoginGoogleMutation>;
export type LoginGoogleMutationResult = Apollo.MutationResult<LoginGoogleMutation>;
export type LoginGoogleMutationOptions = Apollo.BaseMutationOptions<
  LoginGoogleMutation,
  LoginGoogleMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const GetSessionDocument = gql`
  query GetSession {
    getSession {
      code
      success
      accessToken
      user {
        ...userInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
}
export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
