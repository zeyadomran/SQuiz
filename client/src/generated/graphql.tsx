import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type AddAnswerType = {
  title: Scalars['String'];
  isCorrect: Scalars['Boolean'];
};

export type AddQuestionType = {
  title: Scalars['String'];
  answers: Array<AddAnswerType>;
};

/** The Answer Model. */
export type Answer = {
  __typename?: 'Answer';
  /** The title of the answer. */
  title: Scalars['String'];
  /** True if the answer is correct. */
  isCorrect: Scalars['Boolean'];
};


/** Field Error Model */
export type FieldError = {
  __typename?: 'FieldError';
  /** The field the error occurred on. */
  field: Scalars['String'];
  /** The error message. */
  message: Scalars['String'];
};

export type LoginUserType = {
  /** The user's username or email. */
  usernameOrEmail: Scalars['String'];
  /** The user's password. */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a question. */
  addQuestion: Question;
  /** Adds the game's score to the user. */
  addScore?: Maybe<Score>;
  /** Logs in a user */
  login: UserResponse;
  /** Register a user */
  register: UserResponse;
  /** Logs out a user. */
  logout: Scalars['Boolean'];
  /** Generates a password reset token. */
  forgotPassword: Scalars['Boolean'];
  /** Resets a user's password */
  resetPassword: UserResponse;
  /** Toggle a user's public visibility */
  togglePrivate?: Maybe<User>;
};


export type MutationAddQuestionArgs = {
  data: AddQuestionType;
};


export type MutationAddScoreArgs = {
  score: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: LoginUserType;
};


export type MutationRegisterArgs = {
  data: RegisterUserType;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets 10 random questions. */
  questions: Array<Question>;
  /** Get the current logged in user. */
  me?: Maybe<User>;
  /** Get the highest 25 scores. */
  leaderBoard?: Maybe<Array<Score>>;
};

/** The Question Model. */
export type Question = {
  __typename?: 'Question';
  /** The question's ID. */
  id: Scalars['ID'];
  /** The title of the question. */
  title: Scalars['String'];
  /** The answers to the question. */
  answers: Array<Answer>;
};

export type RegisterUserType = {
  /** The user's email. */
  email: Scalars['String'];
  /** The user's username. */
  username: Scalars['String'];
  /** The user's password. */
  password: Scalars['String'];
};

/** The Score Model. */
export type Score = {
  __typename?: 'Score';
  /** The player's ID. */
  id: Scalars['ID'];
  /** The player's username. */
  username: Scalars['String'];
  /** The player's score. */
  score: Scalars['Int'];
  /** The timestamp the score was created. */
  createdAt: Scalars['DateTime'];
};

/** The User Model. */
export type User = {
  __typename?: 'User';
  /** The user's ID. */
  id: Scalars['ID'];
  /** The user's email. */
  email: Scalars['String'];
  /** The user's username. */
  username: Scalars['String'];
  /** The date the user was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Whether the user has a private profile or not. */
  private?: Maybe<Scalars['Boolean']>;
  /** The user's password reset token. */
  forgotPasswordToken?: Maybe<Scalars['String']>;
  /** The user's password reset token expiry date. */
  forgotPasswordTokenExpire?: Maybe<Scalars['DateTime']>;
  /** The user's scores. */
  scores: Array<Score>;
};

/** The response from the user resolver */
export type UserResponse = {
  __typename?: 'UserResponse';
  /** The errors caught. */
  errors?: Maybe<Array<FieldError>>;
  /** The user that was returned. */
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  data: LoginUserType;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type TogglePrivateMutationVariables = Exact<{ [key: string]: never; }>;


export type TogglePrivateMutation = (
  { __typename?: 'Mutation' }
  & { togglePrivate?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'private'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'private'>
    & { scores: Array<(
      { __typename?: 'Score' }
      & Pick<Score, 'score' | 'createdAt'>
    )> }
  )> }
);


export const LoginDocument = gql`
    mutation Login($data: LoginUserType!) {
  login(data: $data) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
    }
  }
}
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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const TogglePrivateDocument = gql`
    mutation TogglePrivate {
  togglePrivate {
    id
    private
  }
}
    `;
export type TogglePrivateMutationFn = Apollo.MutationFunction<TogglePrivateMutation, TogglePrivateMutationVariables>;

/**
 * __useTogglePrivateMutation__
 *
 * To run a mutation, you first call `useTogglePrivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePrivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePrivateMutation, { data, loading, error }] = useTogglePrivateMutation({
 *   variables: {
 *   },
 * });
 */
export function useTogglePrivateMutation(baseOptions?: Apollo.MutationHookOptions<TogglePrivateMutation, TogglePrivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePrivateMutation, TogglePrivateMutationVariables>(TogglePrivateDocument, options);
      }
export type TogglePrivateMutationHookResult = ReturnType<typeof useTogglePrivateMutation>;
export type TogglePrivateMutationResult = Apollo.MutationResult<TogglePrivateMutation>;
export type TogglePrivateMutationOptions = Apollo.BaseMutationOptions<TogglePrivateMutation, TogglePrivateMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    private
    scores {
      score
      createdAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;