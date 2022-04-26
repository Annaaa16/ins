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

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  caption: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postId: Scalars['String'];
  reactions: Array<User>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentMutationResponse = {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
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
  createComment: CommentMutationResponse;
  createPost: PostMutationResponse;
  deleteComment: BaseResponse;
  deletePost: BaseResponse;
  forgotPassword: ForgotPasswordResponse;
  login: UserMutationResponse;
  loginFacebook: UserMutationResponse;
  loginGoogle: UserMutationResponse;
  logout: Scalars['Boolean'];
  reactComment: BaseResponse;
  reactPost: BaseResponse;
  register: UserMutationResponse;
  searchUser: SearchUserResponse;
  updatePost: PostMutationResponse;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationCreateCommentArgs = {
  caption: Scalars['String'];
  postId: Scalars['String'];
};

export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
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

export type MutationReactCommentArgs = {
  commentId: Scalars['String'];
  reaction: ReactionType;
};

export type MutationReactPostArgs = {
  postId: Scalars['String'];
  reaction: ReactionType;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationSearchUserArgs = {
  limit: Scalars['Int'];
  query: Scalars['String'];
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type PaginatedCommentsResponse = {
  __typename?: 'PaginatedCommentsResponse';
  code: Scalars['Float'];
  comments?: Maybe<Array<Comment>>;
  cursor?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  code: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  success: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  commentCounts: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  photo?: Maybe<Scalars['String']>;
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
  getComments: PaginatedCommentsResponse;
  getPosts: PaginatedPostsResponse;
  getSession: GetSessionResponse;
  hello: Scalars['String'];
};

export type QueryGetCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  postId: Scalars['ID'];
};

export type QueryGetPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export enum ReactionType {
  Like = 'LIKE',
  Unlike = 'UNLIKE',
}

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SearchUserResponse = {
  __typename?: 'SearchUserResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type UpdatePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  newBase64Photo?: InputMaybe<Scalars['String']>;
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

export type CommentInfoFragment = {
  __typename?: 'Comment';
  _id: string;
  caption: string;
  postId: string;
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

export type CommentMutationResponseFragment = {
  __typename?: 'CommentMutationResponse';
  code: number;
  success: boolean;
  message?: string | null;
  comment?: {
    __typename?: 'Comment';
    _id: string;
    caption: string;
    postId: string;
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

export type FieldErrorFragment = { __typename?: 'FieldError'; field: string; message: string };

export type PostInfoFragment = {
  __typename?: 'Post';
  _id: string;
  caption?: string | null;
  photo?: string | null;
  commentCounts: number;
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
    commentCounts: number;
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

export type CreateCommentMutationVariables = Exact<{
  caption: Scalars['String'];
  postId: Scalars['String'];
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: {
    __typename?: 'CommentMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    comment?: {
      __typename?: 'Comment';
      _id: string;
      caption: string;
      postId: string;
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

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;

export type DeleteCommentMutation = {
  __typename?: 'Mutation';
  deleteComment: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
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
      commentCounts: number;
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

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type ReactPostMutationVariables = Exact<{
  reaction: ReactionType;
  postId: Scalars['String'];
}>;

export type ReactPostMutation = {
  __typename?: 'Mutation';
  reactPost: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  updatePost: {
    __typename?: 'PostMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    post?: {
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      commentCounts: number;
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

export type SearchUserMutationVariables = Exact<{
  query: Scalars['String'];
  limit: Scalars['Int'];
}>;

export type SearchUserMutation = {
  __typename?: 'Mutation';
  searchUser: {
    __typename?: 'SearchUserResponse';
    code: number;
    success: boolean;
    users?: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }> | null;
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

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetCommentsQuery = {
  __typename?: 'Query';
  getComments: {
    __typename?: 'PaginatedCommentsResponse';
    code: number;
    success: boolean;
    message?: string | null;
    cursor?: string | null;
    hasMore?: boolean | null;
    comments?: Array<{
      __typename?: 'Comment';
      _id: string;
      caption: string;
      postId: string;
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
    }> | null;
  };
};

export type ReactCommentMutationVariables = Exact<{
  reaction: ReactionType;
  commentId: Scalars['String'];
}>;

export type ReactCommentMutation = {
  __typename?: 'Mutation';
  reactComment: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type GetPostsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;

export type GetPostsQuery = {
  __typename?: 'Query';
  getPosts: {
    __typename?: 'PaginatedPostsResponse';
    code: number;
    message?: string | null;
    success: boolean;
    cursor?: string | null;
    hasMore?: boolean | null;
    posts?: Array<{
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      commentCounts: number;
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
    }> | null;
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
export const CommentInfoFragmentDoc = gql`
  fragment commentInfo on Comment {
    _id
    caption
    postId
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
export const CommentMutationResponseFragmentDoc = gql`
  fragment commentMutationResponse on CommentMutationResponse {
    code
    success
    message
    comment {
      ...commentInfo
    }
  }
  ${CommentInfoFragmentDoc}
`;
export const PostInfoFragmentDoc = gql`
  fragment postInfo on Post {
    _id
    caption
    photo
    commentCounts
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
export const CreateCommentDocument = gql`
  mutation CreateComment($caption: String!, $postId: String!) {
    createComment(caption: $caption, postId: $postId) {
      ...commentMutationResponse
    }
  }
  ${CommentMutationResponseFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      caption: // value for 'caption'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  );
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options,
  );
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
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
export const DeletePostDocument = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      code
      success
      message
    }
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export const ReactPostDocument = gql`
  mutation ReactPost($reaction: ReactionType!, $postId: String!) {
    reactPost(reaction: $reaction, postId: $postId) {
      code
      success
      message
    }
  }
`;
export type ReactPostMutationFn = Apollo.MutationFunction<
  ReactPostMutation,
  ReactPostMutationVariables
>;

/**
 * __useReactPostMutation__
 *
 * To run a mutation, you first call `useReactPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactPostMutation, { data, loading, error }] = useReactPostMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useReactPostMutation(
  baseOptions?: Apollo.MutationHookOptions<ReactPostMutation, ReactPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReactPostMutation, ReactPostMutationVariables>(
    ReactPostDocument,
    options,
  );
}
export type ReactPostMutationHookResult = ReturnType<typeof useReactPostMutation>;
export type ReactPostMutationResult = Apollo.MutationResult<ReactPostMutation>;
export type ReactPostMutationOptions = Apollo.BaseMutationOptions<
  ReactPostMutation,
  ReactPostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      ...postMutationResponse
    }
  }
  ${PostMutationResponseFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const SearchUserDocument = gql`
  mutation SearchUser($query: String!, $limit: Int!) {
    searchUser(query: $query, limit: $limit) {
      code
      success
      users {
        ...userInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;
export type SearchUserMutationFn = Apollo.MutationFunction<
  SearchUserMutation,
  SearchUserMutationVariables
>;

/**
 * __useSearchUserMutation__
 *
 * To run a mutation, you first call `useSearchUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchUserMutation, { data, loading, error }] = useSearchUserMutation({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SearchUserMutation, SearchUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SearchUserMutation, SearchUserMutationVariables>(
    SearchUserDocument,
    options,
  );
}
export type SearchUserMutationHookResult = ReturnType<typeof useSearchUserMutation>;
export type SearchUserMutationResult = Apollo.MutationResult<SearchUserMutation>;
export type SearchUserMutationOptions = Apollo.BaseMutationOptions<
  SearchUserMutation,
  SearchUserMutationVariables
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
export const GetCommentsDocument = gql`
  query GetComments($postId: ID!, $limit: Int!, $cursor: String) {
    getComments(postId: $postId, limit: $limit, cursor: $cursor) {
      code
      success
      message
      comments {
        ...commentInfo
      }
      cursor
      hasMore
    }
  }
  ${CommentInfoFragmentDoc}
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options,
  );
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>;
export const ReactCommentDocument = gql`
  mutation ReactComment($reaction: ReactionType!, $commentId: String!) {
    reactComment(reaction: $reaction, commentId: $commentId) {
      code
      success
      message
    }
  }
`;
export type ReactCommentMutationFn = Apollo.MutationFunction<
  ReactCommentMutation,
  ReactCommentMutationVariables
>;

/**
 * __useReactCommentMutation__
 *
 * To run a mutation, you first call `useReactCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactCommentMutation, { data, loading, error }] = useReactCommentMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useReactCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<ReactCommentMutation, ReactCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReactCommentMutation, ReactCommentMutationVariables>(
    ReactCommentDocument,
    options,
  );
}
export type ReactCommentMutationHookResult = ReturnType<typeof useReactCommentMutation>;
export type ReactCommentMutationResult = Apollo.MutationResult<ReactCommentMutation>;
export type ReactCommentMutationOptions = Apollo.BaseMutationOptions<
  ReactCommentMutation,
  ReactCommentMutationVariables
>;
export const GetPostsDocument = gql`
  query GetPosts($cursor: String, $limit: Int!) {
    getPosts(cursor: $cursor, limit: $limit) {
      code
      message
      success
      posts {
        ...postInfo
      }
      cursor
      hasMore
    }
  }
  ${PostInfoFragmentDoc}
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
